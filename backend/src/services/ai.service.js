import { ChatGoogle } from "@langchain/google";
import { createAgent } from "langchain";
import { z } from "zod";

const googleModel = new ChatGoogle({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.5-flash",
  temperature: 0,
});

const CareerRoadmapSchema = z.object({
  targetRole: z.string(),

  summary: z.string(),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      reason: z.string(),
      priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
    })
  ),

  roadmap: z.array(
    z.object({
      month: z.number(),
      focus: z.string(),
      topics: z.array(z.string()),
      weeklyHours: z.number(),
      project: z.string(),
    })
  ),

  projects: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      skills: z.array(z.string()),
    })
  ),

  interviewPreparation: z.array(z.string()),

  jobStrategy: z.object({
    companiesToTarget: z.array(z.string()),
    portfolioAdvice: z.string(),
  }),
});

const careerAgent = createAgent({
  model: googleModel,

  systemPrompt: `
You are an expert career roadmap agent.

Your job is to create a realistic, personalized career roadmap.

Analyze:
- target role
- industry
- current skills
- experience level
- available hours per week
- timeline
- education

Do not give generic advice.

Identify the user's existing skills first.
Then identify skill gaps.
Prioritize skills based on the target role and industry.

Create a roadmap that fits the user's available hours and timeline.

Include:
1. Skill gaps
2. Month-by-month roadmap
3. Practical projects
4. Interview preparation
5. Job strategy

The roadmap must be realistic for the user's experience level.

Return ONLY the requested structured output.
`,

  responseFormat: CareerRoadmapSchema,
});

export const generateCareerRoadmap = async (userData) => {
  const result = await careerAgent.invoke({
    messages: [
      {
        role: "user",
        content: JSON.stringify(userData),
      },
    ],
  });

  return result.structuredResponse;
};