import { z } from "zod";

export const modelTrainSchema = z.object({
  name: z.string().min(3, "Name must be length of 3 or greater"),
  description: z.string().optional(),
  training_data: z.string().min(1, "Training data is required"),
  api_key: z.string().min(1, "Api key is required."),
  model_type: z.string().min(1, "Model type is required"),
  training_parameters: z.string().optional(),
  evaluation_metrics_target: z.string().optional(),
});

export type ModelTrainSchema = z.infer<typeof modelTrainSchema>;
