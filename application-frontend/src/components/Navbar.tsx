import { Button } from "@/components/ui/button"
import { BookOpen, Menu, User, Settings, LogOut, Bell } from "lucide-react"
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://github.com/shadcn.png"
  })

  // Simulate user authentication state
  useEffect(() => {
    // In a real app, you would check authentication status here
    // For demo purposes, we'll simulate a logged-in user
    const checkAuthStatus = () => {
      // You can toggle this to false to see the sign-in button
      setIsLoggedIn(true)
    }
    
    checkAuthStatus()
  }, [])

  const handleSignOut = () => {
    setIsLoggedIn(false)
    // In a real app, you would handle sign out logic here
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

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

          <nav className="hidden md:flex items-center space-x-8">
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
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Dialog>
                <DialogTrigger className="hidden md:inline-flex">
                  Sign In
                </DialogTrigger>
                <DialogContent>
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-4 z-10"
                      >
                        <X className="w-5 h-5" />
                      </Button>

                      <div className="p-8">
                        <div className="text-center mb-8">
                          <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">WorkSpace</span>
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
                          <p className="text-gray-600">Sign in to your account or create a new one</p>
                        </div>

                        <Tabs defaultValue="signin" className="w-full">
                          <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="signin">Sign In</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                          </TabsList>

                          <TabsContent value="signin" className="space-y-4">
                            <form className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="signin-email">Email</Label>
                                <Input id="signin-email" type="email" placeholder="Enter your email" className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="signin-password">Password</Label>
                                <Input
                                  id="signin-password"
                                  type="password"
                                  placeholder="Enter your password"
                                  className="w-full"
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="remember" className="rounded border-gray-300" />
                                  <Label htmlFor="remember" className="text-sm text-gray-600">
                                    Remember me
                                  </Label>
                                </div>
                                <Button variant="link" className="text-sm text-purple-600 p-0">
                                  Forgot password?
                                </Button>
                              </div>
                              <Button 
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                onClick={() => setIsLoggedIn(true)}
                              >
                                Sign In
                              </Button>
                            </form>

                            <div className="relative my-6">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                              </div>
                              <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <Button variant="outline" className="w-full">
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                  <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                  />
                                </svg>
                                Google
                              </Button>
                              <Button variant="outline" className="w-full">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                              </Button>
                            </div>
                          </TabsContent>

                          <TabsContent value="signup" className="space-y-4">
                            <form className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="signup-firstname">First Name</Label>
                                  <Input id="signup-firstname" type="text" placeholder="John" className="w-full" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="signup-lastname">Last Name</Label>
                                  <Input id="signup-lastname" type="text" placeholder="Doe" className="w-full" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="signup-email">Email</Label>
                                <Input id="signup-email" type="email" placeholder="john@example.com" className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="signup-password">Password</Label>
                                <Input
                                  id="signup-password"
                                  type="password"
                                  placeholder="Create a strong password"
                                  className="w-full"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="signup-confirm">Confirm Password</Label>
                                <Input
                                  id="signup-confirm"
                                  type="password"
                                  placeholder="Confirm your password"
                                  className="w-full"
                                />
                              </div>
                              <div className="flex items-start space-x-2">
                                <input type="checkbox" id="terms" className="rounded border-gray-300 mt-1" />
                                <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                                  I agree to the{" "}
                                  <Button variant="link" className="text-sm text-purple-600 p-0 h-auto">
                                    Terms of Service
                                  </Button>{" "}
                                  and{" "}
                                  <Button variant="link" className="text-sm text-purple-600 p-0 h-auto">
                                    Privacy Policy
                                  </Button>
                                </Label>
                              </div>
                              <Button 
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                onClick={() => setIsLoggedIn(true)}
                              >
                                Create Account
                              </Button>
                            </form>

                            <div className="relative my-6">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                              </div>
                              <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <Button variant="outline" className="w-full">
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                  <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                  />
                                </svg>
                                Google
                              </Button>
                              <Button variant="outline" className="w-full">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                              </Button>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            
            {!isLoggedIn && (
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Get Started
              </Button>
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