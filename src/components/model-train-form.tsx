"use client";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { UploadedFile } from "@/app/(main)/(aiml)/upload/columns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFetchRecords } from "@/hooks/fetch-records";
import api from "@/lib/api";
import { modelTrainSchema, ModelTrainSchema } from "@/schemas/ModelTrainSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function ModelTrainForm() {
  const { data: session } = useSession();
  const { data: uploadedFiles } = useFetchRecords({ module: "uploaded_files" });
  const { data: apiCredentials } = useFetchRecords({
    module: "api_credentials",
  });
  const { data: modelTypes } = useFetchRecords({
    module: "models/get_model_choices",
  });

  const form = useForm<ModelTrainSchema>({
    resolver: zodResolver(modelTrainSchema),
  });

  const onSubmit = async (values: ModelTrainSchema) => {
    console.log("Form values:", values);
    toast("Submitting AI Model Configuration...");

    try {
      const res = await api.post("/models/", {
        model_type: values.model_type,
        user: session?.user?.id,
        name: values.name,
        api_key: values.api_key,
        training_data: values.training_data,
      });
      console.log("🚀 ~ onSubmit ~ res:", res);
      toast.success("AI Model Training Started...");
      window.location.reload();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error while submitting model config"
      );
    }
  };

  return (
    <div className="overflow-auto p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">*</span>Model Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Best Conversation Model"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs italic">
                  A descriptive name for your AI model.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Explain the purpose and expected output of this model."
                    className="resize-y min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs italic">
                  {`Provide a detailed description of your model's objective.`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="training_data"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">*</span>Training Data File
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="truncate w-full max-w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a training data file" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {uploadedFiles?.results?.map((file: UploadedFile) => (
                      <SelectItem key={file.id} value={String(file.id)}>
                        {file?.name} ({file.file_size} Bytes)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs italic">
                  Choose the dataset uploaded by you for model training.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="api_key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">*</span>API Credential
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="truncate w-full max-w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select an API credential" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {apiCredentials?.results?.map((cred: any) => (
                      <SelectItem key={cred.id} value={String(cred.id)}>
                        {cred.provider} ({cred.key})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs italic">
                  Select an API key if your model training requires external API
                  access (e.g., pre-trained models).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">*</span>Model Type
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="truncate w-full max-w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {modelTypes?.map((type: any) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs italic">
                  Categorize the primary task of your AI model.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="training_parameters"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Training Parameters (JSON)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={`{\n  "epochs": 10,\n  "learning_rate": 0.001,\n  "optimizer": "adam"\n}`}
                    className="font-mono text-sm resize-y min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs italic">
                  Provide hyper-parameters and other configuration for model
                  training in JSON format.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="evaluation_metrics_target"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Target Evaluation Metrics (JSON, Optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={`{\n  "accuracy": 0.90,\n  "f1_score": 0.85\n}`}
                    className="font-mono text-sm resize-y min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs italic">
                  Define target performance metrics for your model, if any.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Start Model Training"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
