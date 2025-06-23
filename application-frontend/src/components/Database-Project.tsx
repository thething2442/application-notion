import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState,useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
const API_URL = "http://localhost:3000/api/projects";
  export const DatabaseProject = () =>{
  const [values,setValues] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(e.target.value)
  }
  const handleSaveProject = async (e: any) => {
    e.preventDefault();
    try {
      const payload = {
        type: "database",
        columns:values,
        name: "Custom Database Project",
        description: "Generated via UI",
        createdAt: new Date().toISOString()
      };
  
      console.log("API_URL being used:", API_URL); // Add this line
      const res = await axios.post(API_URL, payload);
      console.log("Saved:", res.data);
      alert("Project saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save project.");
    }
  };
  return (
    <div className="border-2 border-gray-300 rounded-md p-4">
      <h1 className="text-2xl font-bold">Database Project</h1>
      <Table>
        <TableHeader>
          <TableRow>
              <TableHead>{DatabaseProject()}</TableHead>
          </TableRow>
          
        </TableHeader>
      </Table>
    </div>
  )
}