'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CanvasComponent } from "@/hooks/canvas-component";

type ComponentType = "button" | "input";

interface ComponentEntry {
  id: number;
  type: ComponentType;
}

export default function ComponentLibrary() {
  const [components, setComponents] = useState<ComponentEntry[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  const availableComponents: { type: ComponentType; label: string }[] = [
    { type: "button", label: "Button" },
    { type: "input", label: "Input" },
  ];

  const handleAddComponent = (type: ComponentType) => {
    setComponents([...components, { id: idCounter, type }]);
    setIdCounter(idCounter + 1);
  };

  const handleDeleteComponent = (idToDelete: number) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== idToDelete));
  };

  return (
    <div className="flex h-screen bg-muted">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white p-4 space-y-3 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Component Library</h2>
        {availableComponents.map((comp) => (
          <Button
            key={comp.type}
            variant="outline"
            className="w-full justify-start"
            onClick={() => handleAddComponent(comp.type)}
          >
            ➕ {comp.label}
          </Button>
        ))}
      </aside>

      {/* Canvas */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Canvas</h2>
        <Card className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {components.map((comp) => (
            <CanvasComponent
              key={comp.id}
              id={comp.id}
              type={comp.type}
              onDelete={handleDeleteComponent}
            />
          ))}
        </Card>
      </main>
    </div>
  );
}
