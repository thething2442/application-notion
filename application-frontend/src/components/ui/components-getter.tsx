import { useEffect, useState } from "react";


export function useComponentsGetter() {
    const [components, setComponents] = useState<any[]>([]);
    async function getComponents() {
          const res = await fetch("http://localhost:8000/components");
        const data = await res.json();
        setComponents(data);
    }
    return { components, getComponents };
} 