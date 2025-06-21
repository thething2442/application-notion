import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<typeof motion.h1>) {
  return (
    <motion.h1
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<typeof motion.p>) {
  return (
    <motion.p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<typeof motion.footer>) {
  return (
    <motion.footer
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardAction }
