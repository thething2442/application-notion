'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Zap, Shield, Smartphone, Globe, CheckCircle, ArrowRight, Star, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Footer from "@/components/Footer"

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gray-600 mb-8">Trusted by teams at</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="Company 1"
                width={120}
                height={40}
                className="mx-auto"
              />
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="Company 2"
                width={120}
                height={40}
                className="mx-auto"
              />
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="Company 3"
                width={120}
                height={40}
                className="mx-auto"
              />
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="Company 4"
                width={120}
                height={40}
                className="mx-auto"
              />
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="Company 5"
                width={120}
                height={40}
                className="mx-auto col-span-2 md:col-span-1"
              />
            </div>
          </div>

          {/* Testimonial */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-900 mb-6 leading-relaxed">
                  "WorkSpace has completely transformed how our team collaborates. We've gone from scattered documents
                  to a unified workspace that everyone actually wants to use."
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Sarah Chen"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Sarah Chen</p>
                    <p className="text-gray-600">Head of Product, TechCorp</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to get organized?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join millions of users who have already transformed their productivity with WorkSpace.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-80 bg-white/10 border-white/20 text-white placeholder:text-purple-200"
              />
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Get Started Free
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-purple-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Free forever for personal use</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Setup in minutes</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
