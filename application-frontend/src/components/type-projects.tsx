'use client'

import { useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// The 'useParams' import from "next/navigation" cannot be resolved in this environment.
// It is replaced by a mock below to allow compilation and demonstration.
// In your actual Next.js project, you would keep:
// import { useParams } from "next/navigation"
import { toast } from "sonner"

// --- Mock for useParams (to resolve "next/navigation" error in this environment) ---
// This mock is crucial for the code to be runnable here.
// In your actual Next.js project, you would use the real 'useParams' from "next/navigation".
const useParams = () => {
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const parts = path.split('/');
  // This mock assumes a URL structure like /dashboard/[userId]/create
  // Adjust the index if your actual URL path for this component is different.
  const id = parts[parts.length - 2] || 'demo_user_id';
  return { id };
};
// --- End Mock for useParams ---

export const TypeProjects = () => {
  const { id } = useParams()

  // Modified getGradientClasses to return the base gradient color classes (e.g., 'from-blue-400 to-blue-600')
  // The 'hover:bg-gradient-to-r' will be added directly in the JSX.
  const getGradientClasses = (name: string) => {
    let colors = '';
    switch (name) {
      case 'Database': return 'from-blue-400 to-blue-600';
      case 'List': return 'from-green-400 to-green-600';
      case 'Form': return 'from-purple-400 to-purple-600';
      case 'Table': return 'from-yellow-400 to-yellow-600';
      case 'Chart': return 'from-red-400 to-red-600';
      case 'Map': return 'from-indigo-400 to-indigo-600';
      case 'Calendar': return 'from-pink-400 to-pink-600';
      case 'File': return 'from-gray-400 to-gray-600'; // Corrected to 'File' from 'File Storage' based on your cardContent
      default: return 'from-gray-300 to-gray-500'; // Fallback gradient
    }
  };

  const cardContent = [
    { name: 'Database', type: 'database', description: 'Create a new database project', componentName: 'data' },
    { name: 'List', type: 'list', description: 'List of Data user', componentName: 'list' },
    { name: 'Form', type: 'form', description: 'Create a new form project', componentName: 'form' },
    { name: 'Table', type: 'table', description: 'Create a new table project', componentName: 'table' },
    { name: 'Chart', type: 'chart', description: 'Create a new chart project', componentName: 'chart' },
    { name: 'Map', type: 'map', description: 'Create a new map project', componentName: 'map' },
    { name: 'Calendar', type: 'calendar', description: 'Create a new calendar project', componentName: 'calendar' },
    { name: 'File', type: 'file', description: 'Create a new file project', componentName: 'file' },
  ]

  const handleClick = async (project: any) => {
    try {
      // Used NEXT_PUBLIC_API_PROJECTS! as per your provided code
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_PROJECTS!}/${id}`, project)
      console.log("✅ Project created:", response.data)
      // Added check for 201 status code, common for successful creation
      if(response.status === 200 || response.status === 201){
        toast.success("Project created successfully")
      }
    } catch (err) {
      toast.error("Failed to create project")
      console.error("❌ Failed to create project:", err) // Retained for debugging
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {cardContent.map((project, index) => (
        <Card
          key={index} // Using index as key per your original code
          onClick={() => handleClick(project)}
          className={`
            group relative overflow-hidden // Essential for hover effects and ensuring content stays within bounds
            cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out
            bg-white // Default background for the card
            hover:bg-gradient-to-r ${getGradientClasses(project.name)} // Apply hover gradient directly to the card
            hover:border-transparent // Makes the border disappear on hover for a cleaner gradient look
            w-auto hover:scale-105 duration-300 // Your existing scale and duration
          `}
        >
          {/* CardHeader now includes text-center and transform for animation */}
          <CardHeader className="z-10 text-center transition-transform duration-300 group-hover:-translate-y-1">
            {/* Text colors change on hover for better contrast */}
            <CardTitle className="text-gray-800 group-hover:text-white transition-colors duration-300">{project.name}</CardTitle>
            <CardDescription className="text-gray-600 group-hover:text-gray-200 transition-colors duration-300">{project.description}</CardDescription>
          </CardHeader>
          {/* CardContent also includes text-center and transform for animation */}
          <CardContent className="z-10 text-center transition-transform duration-300 group-hover:-translate-y-1">
            {/* No other content in CardContent in your provided code */}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
