import ModelTrainForm from "@/components/model-train-form";
import { Edit } from "lucide-react";

export default async function AIModelForm() {
  return (
    <div className="flex items-center justify-center p-4 min-h-screen bg-gray-50">
      <div className="w-full bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex gap-2 items-center">
          <Edit /> Create New AI Model Training Job
        </h2>
        <ModelTrainForm />
      </div>
    </div>
  );
}
