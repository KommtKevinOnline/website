import type { H3Event } from 'h3';

export interface EditorUser {
  id: string;
  login: string;
  displayName: string;
  avatar: string;
  isOwner: boolean;
}

function ownerIds(): string[] {
  // env values are destr-parsed: a single numeric id arrives as a number
  return String(useRuntimeConfig().adminTwitchIds ?? '')
    .split(',')
    .map((id: string) => id.trim())
    .filter(Boolean);
}

interface SessionUser {
  id: string;
  login: string;
  displayName: string;
  avatar: string;
}

/**
 * Resolves a Twitch user's role: site owners come from the
 * NUXT_ADMIN_TWITCH_IDS runtime config, editors (channel mods) from the
 * editors table. Returns null when the user has neither role.
 */
export async function resolveEditor(
  user: SessionUser
): Promise<EditorUser | null> {
  console.info(
    '[admin] login check: user.id=%s owners=%s',
    user.id,
    JSON.stringify(ownerIds())
  );

  if (ownerIds().includes(String(user.id))) {
    return { ...user, isOwner: true };
  }

  // Missing table (worker migration not applied yet) must not 500 the check
  try {
    const editor = await useDrizzle().query.editors.findFirst({
      where: eq(tables.editors.twitchUserId, user.id),
    });

    if (editor) {
      return { ...user, isOwner: false };
    }
  } catch (error) {
    console.error('[admin] editors lookup failed', error);
  }

  return null;
}

export async function getEditor(event: H3Event): Promise<EditorUser | null> {
  const session = await getUserSession(event);
  const user = session.user as SessionUser | undefined;

  if (!user) {
    return null;
  }

  return await resolveEditor(user);
}

export async function requireEditor(event: H3Event): Promise<EditorUser> {
  const editor = await getEditor(event);

  if (!editor) {
    throw createError({ statusCode: 403, statusMessage: 'Not an editor' });
  }

  return editor;
}

export async function requireOwner(event: H3Event): Promise<EditorUser> {
  const editor = await requireEditor(event);

  if (!editor.isOwner) {
    throw createError({ statusCode: 403, statusMessage: 'Owner only' });
  }

  return editor;
}
