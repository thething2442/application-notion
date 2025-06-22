import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface CanvasComponentProps {
  id: number;
  type: "button" | "input" | "text";
  onDelete: (id: number) => void;
}

export const CanvasComponent: React.FC<CanvasComponentProps> = ({ id, type, onDelete }) => {
  const renderInnerComponent = () => {
    switch (type) {
      case "button":
        return (
          <Button variant="secondary" className="w-full">
            Button {id}
          </Button>
        );
      case "input":
        return (
          <Input
            placeholder={'Add a Title'}
            className="w-full"
          />
        );
      case "text":
        return (
          <Textarea
            placeholder={'Add a Description'}
            className="w-full"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative group p-4 border border-border rounded-xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-200">
      {/* Delete Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white hover:bg-red-50"
        onClick={() => onDelete(id)}
        aria-label="Delete component"
      >
        <X className="h-4 w-4 text-red-500" />
      </Button>

      {/* Component Body */}
      <div>{renderInnerComponent()}</div>
    </div>
  );
};
