'use server';

import { neon } from '@neondatabase/serverless';

export type SaveFeedbackInput = {
  userId: number;
  sectionId: number;
  feedback: string;
};

export async function saveFeedback(input: SaveFeedbackInput) {
  const sql = neon(process.env.DATABASE_URL!);

  if (!input?.userId || !input?.sectionId || !input?.feedback?.trim()) {
    throw new Error('User ID, section ID, and feedback are required');
  }

  console.log(input.userId, input.sectionId, input.feedback.trim())
  try {
    const rows = await sql`
      INSERT INTO feedback (user_id, section_id, feedback, created_at)
      VALUES (${input.userId}, ${input.sectionId}, ${input.feedback.trim()}, NOW())
      RETURNING id, user_id, section_id, feedback, created_at
    `;

    return rows[0];
  } catch (error) {
    console.error('Error saving feedback:', error);
    throw new Error('Failed to save feedback');
  }
}