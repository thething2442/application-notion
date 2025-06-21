import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Zap, Shield, Smartphone, Globe } from "lucide-react"

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything you need to stay organized</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From notes and tasks to wikis and databases, WorkSpace adapts to your workflow
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Notes & Docs</h3>
              <p className="text-gray-600 leading-relaxed">
                Create beautiful documents with rich formatting, embeds, and collaborative editing in real-time.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                Share pages and work together seamlessly. Comment, mention teammates, and track changes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Assistant</h3>
              <p className="text-gray-600 leading-relaxed">
                Get writing help, generate content, and automate tasks with our built-in AI assistant.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Enterprise Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Bank-level security with SSO, advanced permissions, and compliance certifications.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile & Offline</h3>
              <p className="text-gray-600 leading-relaxed">
                Access your workspace anywhere with native mobile apps and offline sync capabilities.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrations</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with 100+ tools including Slack, Google Drive, Figma, and more.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 