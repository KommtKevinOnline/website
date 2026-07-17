import { DateTime } from 'luxon';

/**
 * Drizzle's string mode returns Postgres' own text format
 * ("2026-07-17 15:00:00+00"), which fromISO rejects — try both.
 */
export function parseDbDate(value: string): DateTime {
  const iso = DateTime.fromISO(value, { setZone: true });

  if (iso.isValid) {
    return iso;
  }

  return DateTime.fromSQL(value, { setZone: true });
}
