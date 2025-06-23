import { Home, Search, Calendar, FileText, Settings2, Archive, Trash2, LifeBuoy } from "lucide-react";
import { useUser } from "@clerk/nextjs";
export function useSidebarData() {
  const { user } = useUser();

  const navMain = [
    { title: "Home", url: "#", icon: Home, isActive: true },
    { title: "Search", url: "#", icon: Search },
    { title: "Calendar", url: "#", icon: Calendar },
    { title: "Templates", url: "#", icon: FileText },
  ];

  const navSecondary = [
    { title: "Settings", url: "#", icon: Settings2 },
    { title: "Archive", url: "#", icon: Archive },
    { title: "Trash", url: "#", icon: Trash2 },
    { title: "Support", url: "#", icon: LifeBuoy },
  ];

  return { user, navMain, navSecondary };
}