import React from "react";
import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";

export const QueryInput: React.FC = () => (
  <Input
    icon={
      <div className="bg-orange-500 p-1 rounded-lg cursor-pointer">
        <ArrowUp className="h-4 w-4 text-white" />
      </div>
    }
    placeholder="What can we help you with today?.."
  />
);
