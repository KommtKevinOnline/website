-- Cleans Whisper hallucination artifacts from vods.transcript.
-- Backup exists: vods_transcript_backup_20260717 (712 rows, created beforehand).
-- Restore if needed:
--   UPDATE vods v SET transcript = b.transcript
--   FROM vods_transcript_backup_20260717 b WHERE v.vodid = b.vodid;

BEGIN;

-- JSON transcripts: drop credit-hallucination segments, collapse word loops,
-- rebuild the full text from the remaining segments
WITH cleaned AS (
  SELECT v.vodid,
         jsonb_agg(
           jsonb_set(seg, '{text}',
             to_jsonb(regexp_replace(seg->>'text', '(\S{1,20})(([,.]?\s+)\1){4,}', '\1', 'g'))
           ) ORDER BY (seg->>'id')::int
         ) AS segments
  FROM vods v, jsonb_array_elements(v.transcript::jsonb->'segments') seg
  WHERE v.transcript LIKE '{%'
    AND (seg->>'text') !~* '(untertitel im auftrag|untertitelung des zdf|amara\.org|copyright wdr)'
  GROUP BY v.vodid
),
rebuilt AS (
  SELECT c.vodid,
         jsonb_set(
           jsonb_set(v.transcript::jsonb, '{segments}', c.segments),
           '{text}',
           to_jsonb((SELECT string_agg(trim(s->>'text'), ' ') FROM jsonb_array_elements(c.segments) s))
         ) AS new_transcript
  FROM cleaned c JOIN vods v ON v.vodid = c.vodid
)
UPDATE vods v
SET transcript = r.new_transcript::text
FROM rebuilt r
WHERE v.vodid = r.vodid
  AND v.transcript::jsonb IS DISTINCT FROM r.new_transcript;

-- plain-text transcripts (2023 era): strip artifact phrases + collapse loops
UPDATE vods
SET transcript = regexp_replace(
      regexp_replace(transcript, '\s*(Untertitel im Auftrag des ZDF[^\n]*|Untertitelung des ZDF[^\n]*|[^\n]*Amara\.org[^\n]*|Copyright WDR [0-9]{4})\s*', ' ', 'gi'),
      '(\S{1,20})(([,.]?\s+)\1){4,}', '\1', 'g')
WHERE transcript NOT LIKE '{%' AND transcript IS NOT NULL AND transcript != ''
  AND (transcript ~* '(untertitel|amara\.org|copyright wdr)' OR transcript ~ '(\S+ )\1\1\1\1\1\1');

-- verification: all four counts should be 0 (or near 0)
SELECT count(*) FILTER (WHERE transcript ILIKE '%Untertitel im Auftrag%') AS zdf,
       count(*) FILTER (WHERE transcript ILIKE '%Amara.org%') AS amara,
       count(*) FILTER (WHERE transcript ILIKE '%Copyright WDR%') AS wdr,
       count(*) FILTER (WHERE transcript ~ '(\S+ )\1\1\1\1\1\1\1') AS loops
FROM vods;

COMMIT;
