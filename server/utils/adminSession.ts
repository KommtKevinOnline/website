import type { H3Event } from 'h3';

export interface EditorUser {
  id: string;
  login: string;
  displayName: string;
  avatar: string;
  isOwner: boolean;
}

function ownerIds(): string[] {
  return useRuntimeConfig()
    .adminTwitchIds.split(',')
    .map((id: string) => id.trim())
    .filter(Boolean);
}

/**
 * Resolves the session user's role: site owners come from the
 * NUXT_ADMIN_TWITCH_IDS runtime config, editors (channel mods) from the
 * editors table. Returns null when the user has neither role.
 */
export async function getEditor(event: H3Event): Promise<EditorUser | null> {
  const session = await getUserSession(event);
  const user = session.user as
    | { id: string; login: string; displayName: string; avatar: string }
    | undefined;

  if (!user) {
    return null;
  }

  if (ownerIds().includes(user.id)) {
    return { ...user, isOwner: true };
  }

  const editor = await useDrizzle().query.editors.findFirst({
    where: eq(tables.editors.twitchUserId, user.id),
  });

  if (!editor) {
    return null;
  }

  return { ...user, isOwner: false };
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
