import { Button } from "@/components/ui/button"
import { BookOpen, Menu, User, Settings, LogOut, Bell, LayoutDashboard, Folder } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isLoaded, isSignedIn } = useUser()

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (!isLoaded) {
    return (
      <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">WorkSpace</span>
            </div>
            <div className="animate-pulse bg-gray-200 h-8 w-8 rounded-full"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link href={isSignedIn ? '/dashboard' : '/'}>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
            </Link>
            <Link href={isSignedIn ? '/dashboard' : '/'}>
              <span className="text-xl font-bold text-gray-900">WorkSpace</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {isSignedIn ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link href="/projects" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1">
                  <Folder className="w-4 h-4" />
                  <span>Projects</span>
                </Link>
              </>
            ) : (
              <>
                <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </Link>
                <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
                <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </Link>
                <Link href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium">
                          {getInitials(user?.fullName || 'User')}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.fullName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.primaryEmailAddress?.emailAddress}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/projects">
                        <Folder className="mr-2 h-4 w-4" />
                        <span>Projects</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <SignOutButton>
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </SignOutButton>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <SignInButton mode="modal">
                  <Button variant="ghost" className="hidden md:inline-flex">
                    Sign In
                  </Button>
                </SignInButton>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Get Started
                </Button>
              </div>
            )}
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 