'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { ExportableComponents } from "./exportable-components";

export const TypeProjects = ({
  onSelectComponent,
}: {
  onSelectComponent: (Component: React.ReactNode) => void;
}) => {
  const cardContent = [
    { name: "Database", type: "database", description: "Create a new database project", componentName: "database" },
    { name: "List", type: "list", description: "List of Data user", componentName: "list" },
    { name: "Form", type: "form", description: "Create a new form project", componentName: "form" },
    { name: "Table", type: "table", description: "Create a new table project", componentName: "table" },
    { name: "Chart", type: "chart", description: "Create a new chart project", componentName: "chart" },
    { name: "Map", type: "map", description: "Create a new map project", componentName: "map" },
    { name: "Calendar", type: "calendar", description: "Create a new calendar project", componentName: "calendar" },
    { name: "File", type: "file", description: "Create a new file project", componentName: "file" },
  ];

  const getGradientClasses = (name: string) => {
    switch (name) {
      case "Database": return "from-blue-400 to-blue-600";
      case "List": return "from-green-400 to-green-600";
      case "Form": return "from-purple-400 to-purple-600";
      case "Table": return "from-yellow-400 to-yellow-600";
      case "Chart": return "from-red-400 to-red-600";
      case "Map": return "from-indigo-400 to-indigo-600";
      case "Calendar": return "from-pink-400 to-pink-600";
      case "File": return "from-gray-400 to-gray-600";
      default: return "from-gray-300 to-gray-500";
    }
  };

  const handleClick = (project: { componentName: string }) => {
    const Component = ExportableComponents[project.componentName as keyof typeof ExportableComponents];

    if (Component) {
      toast.success("🧩 Component selected");
      onSelectComponent(<Component />);
    } else {
      toast.error("⚠️ Component not found");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {cardContent.map((project, index) => (
        <Card
          key={index}
          onClick={() => handleClick(project)}
          className={`group relative overflow-hidden cursor-pointer transition-all duration-300
            bg-white hover:scale-105 hover:shadow-lg
            hover:bg-gradient-to-r ${getGradientClasses(project.name)}`}
        >
          <CardHeader className="z-10 text-center transition-transform duration-300 group-hover:-translate-y-1">
            <CardTitle className="text-gray-800 group-hover:text-white transition-colors duration-300">
              {project.name}
            </CardTitle>
            <CardDescription className="text-gray-600 group-hover:text-gray-200 transition-colors duration-300">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="z-10 text-center transition-transform duration-300 group-hover:-translate-y-1" />
        </Card>
      ))}
    </div>
  );
};
