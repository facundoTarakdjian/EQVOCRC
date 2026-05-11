// Calculators for each questionnaire type

export interface QuestionnaireCalculator {
  calculateScore: (responses: any) => any;
}

// Section ID mapping based on your database data
export const SECTION_IDS = {
  BRAVITO: 1,      // Datos Personales
  MILLON: 2,       // Personalidad (Millon/MIPS)
  RIASEC: 3,       // Intereses Vocacionales
  HERRMANN: 4,     // Dominancia Cerebral
  GARDNER: 5,      // Inteligencias Múltiples
  PROYECTIVA: 6,   // Preguntas Proyectivas
  AUTODESC: 7,     // Auto-descubrimiento de Talentos
  APRENDIZAJE: 8,  // Estilo de Aprendizaje (VAK)
  LIFESTYLE: 9,    // Estilo de Vida y Valores
  FUTURO: 10,      // Proyección de Futuro
  FAMILIA: 11,     // Contexto Familiar
  UNIVERSIDAD: 12, // Scan Universitario
  IPPR: 13,        // Intereses y Preferencias Profesionales
} as const;

// MIPS Calculator
export const mipsCalculator: QuestionnaireCalculator = {
  calculateScore: (responses: Record<number, boolean>) => {
    // Basic MIPS scoring logic - customize as needed
    const trueCount = Object.values(responses).filter(Boolean).length;
    const falseCount = Object.values(responses).filter(r => r === false).length;
    const totalResponses = Object.keys(responses).length;
    
    return {
      trueResponses: trueCount,
      falseResponses: falseCount,
      totalResponses,
      completionRate: (totalResponses / 187) * 100, // MIPS has 187 questions
      personalityProfile: {
        // Add specific MIPS scales here
        extroversion: trueCount > falseCount ? 'high' : 'low',
        // Add more personality dimensions as needed
      }
    };
  }
};


// RIASEC Calculator
export const riasecCalculator: QuestionnaireCalculator = {
  calculateScore: (responses: Record<number, number>) => {
    // RIASEC scoring - typically 1-5 scale responses
    const scores : {
        realistic: number;
        investigative: number;
        artistic: number;
        social: number;
        enterprising: number;
        conventional: number;
    } = {
      realistic: 0,
      investigative: 0,
      artistic: 0,
      social: 0,
      enterprising: 0,
      conventional: 0
    };
    
    // Basic calculation - customize based on your RIASEC question mapping
    Object.entries(responses).forEach(([questionNum, score]) => {
      const qNum = parseInt(questionNum);
      // Map questions to RIASEC categories
      if (qNum <= 10) scores.realistic += score;
      else if (qNum <= 20) scores.investigative += score;
      else if (qNum <= 30) scores.artistic += score;
      else if (qNum <= 40) scores.social += score;
      else if (qNum <= 50) scores.enterprising += score;
      else scores.conventional += score;
    });

    return {
      scores,
      primaryType: Object.entries(scores).reduce((a, b) => scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b)[0],
      totalResponses: Object.keys(responses).length
    };
  }
};

// Herrmann Calculator
export const herrmannCalculator: QuestionnaireCalculator = {
  calculateScore: (responses: Record<number, number>) => {
    const quadrants = {
      analytical: 0,    // Blue - A quadrant
      practical: 0,     // Green - B quadrant
      relational: 0,    // Red - C quadrant
      experimental: 0   // Yellow - D quadrant
    };

    // Map responses to quadrants
    Object.entries(responses).forEach(([questionNum, score]) => {
      const qNum = parseInt(questionNum);
      // Basic mapping - customize based on your Herrmann questions
      if (qNum % 4 === 1) quadrants.analytical += score;
      else if (qNum % 4 === 2) quadrants.practical += score;
      else if (qNum % 4 === 3) quadrants.relational += score;
      else quadrants.experimental += score;
    });

    return {
      quadrants,
      dominantQuadrant: Object.entries(quadrants).reduce((a, b) => quadrants[a[0] as keyof typeof quadrants] > quadrants[b[0] as keyof typeof quadrants] ? a : b)[0],
      totalResponses: Object.keys(responses).length
    };
  }
};

// Gardner Multiple Intelligences Calculator
export const gardnerCalculator: QuestionnaireCalculator = {
  calculateScore: (responses: Record<number, number>) => {
    const intelligences = {
      linguistic: 0,
      logicalMathematical: 0,
      spatial: 0,
      musical: 0,
      bodilyKinesthetic: 0,
      interpersonal: 0,
      intrapersonal: 0,
      naturalistic: 0
    };

    // Map responses to intelligence types
    Object.entries(responses).forEach(([questionNum, score]) => {
      const qNum = parseInt(questionNum);
      const intelligenceIndex = qNum % 8;
      const keys = Object.keys(intelligences) as (keyof typeof intelligences)[];
      intelligences[keys[intelligenceIndex]] += score;
    });

    return {
      intelligences,
      strongestIntelligence: Object.entries(intelligences).reduce((a, b) => intelligences[a[0] as keyof typeof intelligences] > intelligences[b[0] as keyof typeof intelligences] ? a : b)[0],
      totalResponses: Object.keys(responses).length
    };
  }
};

// VAK Learning Style Calculator
export const vakCalculator: QuestionnaireCalculator = {
  calculateScore: (responses: Record<number, string | number>) => {
    const styles = {
      visual: 0,
      auditory: 0,
      kinesthetic: 0
    };

    Object.entries(responses).forEach(([questionNum, response]) => {
      const qNum = parseInt(questionNum);
      // Map based on response type or question grouping
      if (qNum % 3 === 1) styles.visual += 1;
      else if (qNum % 3 === 2) styles.auditory += 1;
      else styles.kinesthetic += 1;
    });

    return {
      styles,
      predominantStyle: Object.entries(styles).reduce((a, b) => styles[a[0] as keyof typeof styles] > styles[b[0] as keyof typeof styles] ? a : b)[0],
      totalResponses: Object.keys(responses).length
    };
  }
};

// Generic text-based calculator for projective and open-ended questions
export const textBasedCalculator: QuestionnaireCalculator = {
  calculateScore: (responses: Record<number, string>) => {
    return {
      responsesProvided: Object.keys(responses).length,
      completionRate: 100 // Form completed
    };
  }
};

// Factory function to get calculator by section
export function getCalculatorForSection(sectionId: number): QuestionnaireCalculator {
  switch (sectionId) {
    case SECTION_IDS.MILLON:
      return mipsCalculator;
    case SECTION_IDS.RIASEC:
      return riasecCalculator;
    case SECTION_IDS.HERRMANN:
      return herrmannCalculator;
    case SECTION_IDS.GARDNER:
      return gardnerCalculator;
    case SECTION_IDS.APRENDIZAJE:
      return vakCalculator;
    case SECTION_IDS.PROYECTIVA:
    case SECTION_IDS.AUTODESC:
    case SECTION_IDS.LIFESTYLE:
    case SECTION_IDS.FUTURO:
    case SECTION_IDS.FAMILIA:
      return textBasedCalculator;
    case SECTION_IDS.IPPR:
      return textBasedCalculator;
    case SECTION_IDS.BRAVITO:
    case SECTION_IDS.UNIVERSIDAD:
    default:
      // For personal data and university scan, return basic completion info
      return {
        calculateScore: (responses: any) => ({
          completed: true,
          responsesCount: Object.keys(responses).length,
          completedAt: new Date().toISOString()
        })
      };
  }
}