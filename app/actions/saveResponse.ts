'use server';

import { neon } from '@neondatabase/serverless';

type SaveResponseInput = {
  surveySlug?: string;
  surveyVersion?: number;
  sessionId?: string;
  answers: unknown;
  meta?: unknown;
};

export async function saveResponse(input: SaveResponseInput) {
  const sql = neon(process.env.DATABASE_URL!);

  if (!input?.answers || typeof input.answers !== 'object') {
    throw new Error('Invalid answers payload');
  }

  const surveySlug = input.surveySlug ?? 'bravito';
  const surveyVersion = Number.isFinite(input.surveyVersion) ? input.surveyVersion! : 1;
  const sessionId = input.sessionId ?? null;

  const answersJson = JSON.stringify(input.answers);
  const metaJson = input.meta ? JSON.stringify(input.meta) : null;

  const rows = await sql`
    INSERT INTO survey_responses (survey_slug, survey_version, session_id, answers, meta)
    VALUES (${surveySlug}, ${surveyVersion}, ${sessionId}, ${answersJson}::jsonb, ${metaJson}::jsonb)
    RETURNING id, created_at
  `;

  return rows[0];
}
