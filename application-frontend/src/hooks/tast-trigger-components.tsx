import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TaskCreator } from "@/components/ui/task-creator";

export default function Creator() {
  type Task = {
    id: number;
    text: string;
    completed: boolean;
  };
  const [showTaskCreator, setShowTaskCreator] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-start bg-gray-50">
      <div className="absolute top-0 left-0">
        <Button
        onClick={() => setShowTaskCreator(true)}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-md mb-4" // Added mb-4 for some spacing
      >
        Add Task Manager
      </Button>
      </div>

      
      {showTaskCreator && <TaskCreator onAddTask={handleAddTask} />}

      {/* Display tasks, maybe add some styling for tasks here */}
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Tasks:</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks added yet. Start by creating one!</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="p-3 bg-white rounded-md shadow-sm border border-gray-200">
                <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.text}
                </span>
                {/* You might want to add buttons here to mark as complete, edit, or delete */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}