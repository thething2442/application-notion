// components/TaskCreator.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Re-import Card components from shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Edit, Plus } from 'lucide-react'; // Assuming you want these icons back with the card

export function TaskCreator({ onAddTask, initialTitle = "New Task Creator" }:any) {
  const [taskText, setTaskText] = useState("");
  const [cardTitle, setCardTitle] = useState(initialTitle);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitleInput, setNewTitleInput] = useState(cardTitle);

  const handleSaveTitle = () => {
    setCardTitle(newTitleInput);
    setIsEditingTitle(false);
  };

  const handleAddTask = () => {
    if (taskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskText.trim(),
        completed: true,
      };
      onAddTask(newTask);
      setTaskText("");
    }
  };

  return (
    // Reintroducing the Card component from shadcn/ui
    <Card className="w-full max-w-lg mx-auto my-4 shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-gray-50 border-b rounded-t-xl">
        {isEditingTitle ? (
          <div className="flex-grow flex items-center gap-2">
            <Input
              value={newTitleInput}
              onChange={(e) => setNewTitleInput(e.target.value)}
              className="text-xl font-bold w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveTitle();
              }}
            />
            <Button size="icon" onClick={handleSaveTitle} className="shrink-0 bg-green-500 hover:bg-green-600">
              <Save className="h-4 w-4" />
              <span className="sr-only">Save Title</span>
            </Button>
          </div>
        ) : (
          <div className="flex-grow flex items-center gap-2">
            <CardTitle className="text-2xl font-extrabold text-gray-800">{cardTitle}</CardTitle>
            <Button size="icon" variant="ghost" onClick={() => setIsEditingTitle(true)} className="text-gray-600 hover:text-indigo-600">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit Title</span>
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2">
          <Input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddTask();
            }}
          />
          <Button onClick={handleAddTask} className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors">
            <Plus className="h-5 w-5 mr-2" /> Add Task
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}