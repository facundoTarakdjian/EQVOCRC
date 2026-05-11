'use server';

import { neon } from '@neondatabase/serverless';

type SaveQuestionnaireResponseInput = {
  userId: number;
  sectionId: number;
  responses: Array<{
    questionNumber: number;
    question?: string;
    responseBoolean?: boolean;
    responseInteger?: number;
    responseText?: string;
    responseArray?: string[];
  }>;
  scoreData: object;
  meta?: object;
};

export async function saveQuestionnaireResponse(input: SaveQuestionnaireResponseInput) {
  const sql = neon(process.env.DATABASE_URL!);

  if (!input?.userId || !input?.sectionId) {
    throw new Error('User ID and Section ID are required');
  }

  try {
    await sql`BEGIN`;

    // Save individual responses
    for (const response of input.responses) {
      await sql`
        INSERT INTO responses (user_id, section_id, question_number, question, response_boolean, response_integer, response_text, response_array)
        VALUES (${input.userId}, ${input.sectionId}, ${response.questionNumber}, ${response.question ?? null}, ${response.responseBoolean ?? null}, ${response.responseInteger ?? null}, ${response.responseText ?? null}, ${response.responseArray ?? null})
        ON CONFLICT (user_id, section_id, question_number)
        DO UPDATE SET
          question = EXCLUDED.question,
          response_boolean = EXCLUDED.response_boolean,
          response_integer = EXCLUDED.response_integer,
          response_text = EXCLUDED.response_text,
          response_array = EXCLUDED.response_array,
          answered_at = NOW()
      `;
    }

    // Save section result
    const sectionResults = await sql`
      INSERT INTO section_results (user_id, section_id, score_data, meta)
      VALUES (${input.userId}, ${input.sectionId}, ${JSON.stringify(input.scoreData)}::jsonb, ${input.meta ? JSON.stringify(input.meta) : null}::jsonb)
      ON CONFLICT (user_id, section_id)
      DO UPDATE SET
        score_data = EXCLUDED.score_data,
        meta = EXCLUDED.meta,
        completed_at = NOW()
      RETURNING id, completed_at
    `;

    await sql`COMMIT`;

    return {
      success: true,
      sectionResult: sectionResults[0],
      responsesCount: input.responses.length
    };
  } catch (error) {
    await sql`ROLLBACK`;
    console.error('Error saving questionnaire response:', error);
    throw new Error('Failed to save questionnaire response');
  }
}