'use server';

import {neon} from '@neondatabase/serverless';

export type SaveUserInput = {
    sessionId: string;
    firstName: string;
    lastName: string;
    age: number;
    school: string;
    schoolYear: string;
    email: string;
    phoneNumber: string;
};

export async function saveUser(input: SaveUserInput) {
    const sql = neon(process.env.DATABASE_URL!);

    if (!input?.sessionId) {
        throw new Error('Session ID is required');
    }

    try {
        const rows = await sql`
      INSERT INTO users (session_id, first_name, last_name, age, school, school_year, email, phone_number)
      VALUES (${input.sessionId}, ${input.firstName}, ${input.lastName}, ${input.age}, ${input.school}, ${input.schoolYear},${input.email},${input.phoneNumber})
      ON CONFLICT (session_id) 
      DO UPDATE SET 
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        age = EXCLUDED.age,
        school = EXCLUDED.school,
        school_year = EXCLUDED.school_year,
        email = EXCLUDED.email,
        phone_number = EXCLUDED.phone_number,
        updated_at = NOW()
      RETURNING id, session_id, created_at, updated_at
    `;

        return rows[0];
    } catch (error) {
        console.error('Error saving user data:', error);
        throw new Error('Failed to save user data');
    }
}