import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-purple-50 text-purple-700 border-purple-200">
            ✨ New: AI-powered writing assistant
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your connected
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}
              workspace
            </span>
            <br />
            for everything
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Write, plan, share, and get organized. WorkSpace is the connected workspace where better, faster work
            happens. Join millions who use it daily.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 text-lg"
            >
              Get WorkSpace free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-gray-300 hover:border-gray-400">
              Request a demo
            </Button>
          </div>
          <p className="text-sm text-gray-500">Free for personal use. No credit card required.</p>
        </div>

        {/* Hero Image */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <Image
              src="/placeholder.svg?height=600&width=1000"
              alt="WorkSpace Dashboard"
              width={1000}
              height={600}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
} 