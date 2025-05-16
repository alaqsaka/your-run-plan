'use server';

import { collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface GeminiResponse {
  generatedText: {
    parts: { text: string }[];
  };
}

async function callGeminiAI(promptText: string): Promise<GeminiResponse> {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not set in environment variables');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [
      {
        parts: [
          {
            text: promptText,
          },
        ],
      },
    ],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
    throw new Error('Gemini API response missing generated content');
  }

  return { generatedText: data.candidates[0].content };
}

function buildGeminiPrompt(data) {
  const context = {
    raceDate: data.raceDate || "",
    goal: data.goal,
    daysPerWeek: data.daysPerWeek,
    timePerRunMinutes: data.timePerRun,
    fitnessLevel: data.fitnessLevel,
    environment: data.environment,
    pace: data.pace,
    injuries: data.injuries || "no",
    nutrition: data.nutrition,
    sleepQuality: data.sleepQuality || "",
    motivations: data.motivations,
    prefersCrossTraining: data.prefersCrossTraining || false,
    crossTrainingActivities: data.crossTrainingActivities || [],
    recoveryTools: data.recoveryTools || [],
  };

  const instruction = `
You are an expert running coach and training planner AI. Using the user input provided in the context, generate a personalized running plan in JSON format.

Goals:
- If the user has a race date, create a weekly training plan from now until that race date.
- If no race date is provided, generate a 4-week structured general fitness training plan.
- Incorporate cross-training if the user prefers it.
- Make the plan realistic for their fitness level, time availability, pace, recovery method, and training motivations.

Requirements:
- Generate a UNIQUE and motivating training plan TITLE, CATEGORY, DIFFICULTY based on the user's profile, goal, and personality.
- Output a list of WEEKS, each containing 7 days with a labeled \`day\`, \`activity\`, and \`details\`.

Output JSON format:
{
  "title": "Generated unique and motivating plan title",
  "category": "10K",
  "difficulty": "Beginner",
  "weeks": [
    {
      "week": 1,
      "days": [
        { "day": "Monday", "activity": "Rest or Light Stretching", "details": "Focus on massage recovery." },
        { "day": "Tuesday", "activity": "Easy Run", "details": "Run 5km at comfortable pace (6:30/km). Focus on breathing." },
        { "day": "Wednesday", "activity": "Cross-Training", "details": "45 min cycling, moderate effort." }
        // ...
      ]
    }
  ]
}
`;

  // Combine context and instruction into a single prompt string
  return JSON.stringify({ context, instruction });
}

export async function storeFormDataAndGeneratePlan(data) {
    try {
      // Store user input first
      await addDoc(collection(db, 'plans'), {
        userInput: data,
        createdAt: Timestamp.now(),
      });
  
      // Build prompt text for Gemini AI
      const promptText = buildGeminiPrompt(data);
  
      // Call Gemini AI to generate the plan
      const { generatedText } = await callGeminiAI(promptText);
  
      console.log('Raw generatedText:', generatedText);
  
      // Extract the text content from parts array
      const rawText = generatedText.parts?.[0]?.text;
  
      if (!rawText) {
        throw new Error('Generated text parts missing or empty');
      }
  
      // Remove markdown code block delimiters (```json ... ```)
      const cleanedText = rawText
        .replace(/^```json\s*/, '')  // Remove starting ```json
        .replace(/```$/, '')         // Remove ending ```
        .trim();
  
      // Parse the cleaned JSON string
      const generatedPlan = JSON.parse(cleanedText);
  
      // Store the generated plan in Firestore (in a separate collection)
      const savedPlanRef = await addDoc(collection(db, 'generatedPlans'), {
        plan: generatedPlan,
        createdAt: Timestamp.now(),
      });
  
      return { success: true, plan: generatedPlan, planId: savedPlanRef.id };
    } catch (error) {
      console.error('Error storing data or generating plan:', error);
      return { success: false, error: String(error) };
    }
  }
  
export async function getPlanDetail(docId: string) {
if (!docId) {
throw new Error('Document ID is required');
}

const docRef = doc(db, 'generatedPlans', docId);
const docSnap = await getDoc(docRef);

if (!docSnap.exists()) {
throw new Error('Plan not found');
}

const data = docSnap.data();

if (!data.plan) {
throw new Error('Plan data is missing');
}

return data.plan;
}


export const getGeneratedPlansList = async () => {
  try {
    const snapshot = await getDocs(collection(db, "generatedPlans"))
    const plans = snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        plan: data.plan,
        createdAt: data.createdAt?.toDate().toISOString() ?? null, // convert Firestore Timestamp
      }
    })

    return { success: true, plans }
  }  catch (error: unknown) {
    console.error("Error fetching plans:", error)

    if (error instanceof Error) {
      return { success: false, error: error.message }
    } else {
      return { success: false, error: String(error) }
    }
  }
}