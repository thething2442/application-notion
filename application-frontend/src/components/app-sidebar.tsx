"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Plus,
  Ellipsis,
  Trash2,
  Pencil,
} from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { NavUser } from "@/components/nav-user";
import { useComponentsAdder } from '@/components/components-adder';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog";
import { TypeProjects } from "./type-projects";
import { useComponentContext } from "@/components/ComponentContext"; // ✅ Correct import location

export function AppSidebar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setSelectedComponent } = useComponentContext(); // ✅ Only call once here

  const { user } = useUser();
  const [data, setData] = useState<{id: string; title: string}[]>([]);
  const api_user_project = process.env.NEXT_PUBLIC_API_PROJECTS + `/${user?.id}`;
  const {
    handleAddComponent,
    componentName,
    componentType,
    componentDescription,
    componentLink,
    componentIcon,
    isIconPickerDialogOpen,
  } = useComponentsAdder();

  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      try {
        const res = await axios.get(api_user_project, {
          headers: {
            "user-id": user.id,
            "Content-Type": "application/json",
          },
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchData();
  }, [user?.id, api_user_project]);

  const handleDeleteProject = async (id: string) => {
    try {
      await axios.delete(`${api_user_project}/${id}`, {
        headers: {
          "user-id": user?.id!,
        },
      });
      setData((prev) => prev.filter((p: {id: string}) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <BookOpen className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Veridia</span>
                  <span className="truncate text-xs text-gray-300">Personal</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <div className="flex justify-between items-center px-4 pt-2">
          <p className="text-sm font-semibold text-gray-500">Projects</p>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <Button variant="ghost" size="icon" className="text-muted-foreground" asChild>
                <Plus className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-full w-full p-4 space-y-4">
              <TypeProjects
                onSelectComponent={(Component) => {
                  setSelectedComponent(Component); // ✅ This shares it with AccountPage
                  setIsDialogOpen(false);          // ✅ Close dialog
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {data.length > 0 ? (
          data.map((item: {id: string; title: string}, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center px-4 py-2 hover:bg-muted rounded-sm"
            >
              <p className="text-sm font-medium truncate">{item.title}</p>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon">
                    <Ellipsis className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <button onClick={() => console.log("Edit", item.id)} className="flex items-center w-full">
                      <Pencil className="w-4 h-4 mr-2" /> Edit
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button 
                      onClick={() => handleDeleteProject(item.id)}
                      className="flex items-center w-full text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        ) : (
          <p className="px-4 py-3 text-sm text-muted-foreground">No projects found.</p>
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
