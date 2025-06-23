// src/hooks/useComponentsAdder.ts
import { useState } from "react";
export interface CustomComponent {
  name: string;
  type: string;
  description: string;
  link: string;
  icon: string;
}

export const useComponentsAdder = () => {
  const [components, setComponents] = useState<CustomComponent[]>([]);
  const [componentName, setComponentName] = useState("");
  const [componentType, setComponentType] = useState("");
  const [componentDescription, setComponentDescription] = useState("");
  const [componentLink, setComponentLink] = useState("");
  const [componentIcon, setComponentIcon] = useState("");
  const [isIconPickerDialogOpen, setIsIconPickerDialogOpen] = useState(false);

  const handleAddComponent = () => {
    if (componentName.trim() && componentType.trim()) {
      setComponents((prev) => [
        ...prev,
        {
          name: componentName.trim(),
          type: componentType.trim(),
          description: componentDescription.trim(),
          link: componentLink.trim(),
          icon: componentIcon,
        },
      ]);
      setComponentName("");
      setComponentType("");
      setComponentDescription("");
      setComponentLink("");
      setComponentIcon("");
    } else {
      alert("Component Name and Type are required!");
    }
  };

  const handleRemoveComponent = (index: number) => {
    setComponents((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    components,
    componentName,
    componentType,
    componentDescription,
    componentLink,
    componentIcon,
    isIconPickerDialogOpen,
    setComponentName,
    setComponentType,
    setComponentDescription,
    setComponentLink,
    setComponentIcon,
    setIsIconPickerDialogOpen,
    handleAddComponent,
    handleRemoveComponent,
  };
};
