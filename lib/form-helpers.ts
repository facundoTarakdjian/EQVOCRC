import { saveQuestionnaireResponse } from "@/app/actions/saveQuestionnaireResponse"
import { getCalculatorForSection } from "./questionnaire-calculator"

export interface QuestionnaireFormHelpers {
  saveFormData: (sectionId: number, responses: any, additionalMeta?: object, questions?: string[]) => Promise<void>;
  getUserId: () => string | null;
  validateUserId: () => boolean;
}

export function createFormHelpers(): QuestionnaireFormHelpers {
  const getUserId = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem("userId");
  };

  const validateUserId = () => {
    const userId = getUserId();
    if (!userId) {
      alert("Error: No se encontró el ID del usuario. Complete primero los datos personales.");
      return false;
    }
    return true;
  };

  const saveFormData = async (sectionId: number, responses: any, additionalMeta: object = {}, questions?: string[]) => {
    try {
      if (!validateUserId()) {
        return;
      }

      const userId = parseInt(getUserId()!);
      
      // Format responses based on type
      let formattedResponses: any[] = [];
      
      if (Array.isArray(responses)) {
        // Already formatted
        formattedResponses = responses;
      } else if (typeof responses === 'object') {
        // Convert object responses to array format
        formattedResponses = Object.entries(responses).map(([key, value], index) => {
          const questionNumber = parseInt(key) + 1 || index + 1;
          const question = questions ? questions[parseInt(key)] || questions[index] : undefined;
          
          if (typeof value === 'boolean') {
            return { questionNumber, question, responseBoolean: value };
          } else if (typeof value === 'number') {
            return { questionNumber, question, responseInteger: value };
          } else if (typeof value === 'string') {
            return { questionNumber, question, responseText: value };
          } else if (Array.isArray(value)) {
            return { questionNumber, question, responseArray: value };
          } else {
            return { questionNumber, question, responseText: JSON.stringify(value) };
          }
        });
      }

      // Calculate scores using the appropriate calculator
      const calculator = getCalculatorForSection(sectionId);
      const scoreData = calculator.calculateScore(responses);

      await saveQuestionnaireResponse({
        userId,
        sectionId,
        responses: formattedResponses,
        scoreData,
        meta: {
          completedAt: new Date().toISOString(),
          totalResponses: formattedResponses.length,
          ...additionalMeta
        }
      });

    } catch (error) {
      console.error("Error saving questionnaire responses:", error);
      alert("Error al guardar las respuestas. Por favor intenta de nuevo.");
      throw error;
    }
  };

  return {
    saveFormData,
    getUserId,
    validateUserId
  };
}

// Specific helpers for different response formats
export function formatMipsResponses(responses: Record<number, boolean>, questions?: string[]) {
  return Object.entries(responses).map(([questionNum, response]) => ({
    questionNumber: parseInt(questionNum) + 1,
    question: questions ? questions[parseInt(questionNum)] : undefined,
    responseBoolean: response
  }));
}

export function formatRiasecResponses(responses: any) {
  // RIASEC has complex nested structure - customize as needed
  const formatted: any[] = [];
  let questionNumber = 1;
  
  Object.entries(responses).forEach(([sectionName, sectionData]: [string, any]) => {
    Object.entries(sectionData).forEach(([category, items]: [string, any]) => {
      if (Array.isArray(items)) {
        formatted.push({
          questionNumber: questionNumber++,
          responseArray: items,
          responseText: `${sectionName}-${category}`
        });
      }
    });
  });
  
  return formatted;
}

export function formatHerrmannResponses(responses: Record<number, number>, questions?: string[]) {
  return Object.entries(responses).map(([questionNum, score]) => ({
    questionNumber: parseInt(questionNum) + 1,
    question: questions ? questions[parseInt(questionNum)] : undefined,
    responseInteger: score
  }));
}

export function formatGardnerResponses(responses: Record<number, number>, questions?: string[]) {
  return Object.entries(responses).map(([questionNum, score]) => ({
    questionNumber: parseInt(questionNum) + 1,
    question: questions ? questions[parseInt(questionNum)] : undefined,
    responseInteger: score
  }));
}

export function formatTextResponses(responses: Record<number, string>, questions?: string[]) {
  return Object.entries(responses).map(([questionNum, text]) => ({
    questionNumber: parseInt(questionNum) + 1,
    question: questions ? questions[parseInt(questionNum)] : undefined,
    responseText: text
  }));
}