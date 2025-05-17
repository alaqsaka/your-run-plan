import { z } from "zod";

export const formSchema = z.object({
    goal: z.string().min(1, "Please select a running goal"),
    fitnessLevel: z.string().min(1, "Please select your fitness level"),
    daysPerWeek: z.string().min(1, "Please select days per week"),
    timePerRun: z.string().min(1, "Please enter time per run"),
    injuries: z.string().optional(),
    environment: z.string().min(1, "Please select your preferred environment"),
    pace: z.string().min(1, "Please enter your typical pace"),
    motivations: z.array(z.string()).min(1, "Please select at least one motivation"),
    nutrition: z.string().min(1, "Please select your nutrition habit"),
    additionalInfo: z.string().optional(),
    raceDate: z.string().optional(),
    prefersCrossTraining: z.boolean().optional(),
    crossTrainingActivities: z.array(z.string()).optional(),
    sleepQuality: z.string().optional(),
    recoveryTools: z.array(z.string()).optional(),
})