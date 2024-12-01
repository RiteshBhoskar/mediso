import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Search } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-between items-center py-4 px-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
          <span className="text-2xl font-bold text-blue-600">Mediso</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Services</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Doctors</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Careers</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 text-gray-600" />
          <Button className="bg-blue-900 hover:bg-blue-800 text-white rounded-full px-6">
            Get Started
          </Button>
        </div>
      </header>

      <main className="flex flex-col md:flex-row justify-between items-center px-6 py-12 max-w-7xl mx-auto">
        <div className="md:w-1/2 space-y-6">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-gray-600">4.7 | 3,460 Reviews</span>
          </div>
          <h1 className="text-5xl font-bold leading-tight">
            A modern <span className="inline-block bg-blue-100 rounded-full p-1 w-8 h-8"></span> safe and<br />
            effective approach to<br />
            <span className="inline-flex items-center">
              <span className="bg-orange-100 rounded-lg p-1 mr-2">
                <Star className="w-6 h-6 text-orange-400 fill-current" />
              </span>
              well being
            </span>
          </h1>
          <div className="flex space-x-4">
            <Button className="bg-blue-900 hover:bg-blue-800 text-white rounded-full px-8 py-2">
              Book Now
            </Button>
            <Button variant="outline" className="text-blue-900 border-blue-900 rounded-full px-8 py-2">
              Learn more
            </Button>
          </div>
        </div>

        <div className="md:w-1/2 relative mt-12 md:mt-0">
          <div className="bg-blue-100 rounded-full w-[400px] h-[400px] absolute top-0 right-0 z-0"></div>
          <Image
            src="/placeholder.svg?height=500&width=400"
            alt="Doctor"
            width={400}
            height={500}
            className="relative z-10"
          />
          <div className="absolute bottom-0 left-0 bg-white rounded-lg shadow-lg p-4 z-20">
            <h3 className="font-semibold mb-2">Available Doctors</h3>
            <div className="flex items-center space-x-2 mb-2">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Jonathan Reed"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">Jonathan Reed</p>
                <p className="text-sm text-gray-600">Gastroenterologist</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Olivia Bennett"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">Olivia Bennett</p>
                <p className="text-sm text-gray-600">Dermatologist</p>
              </div>
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for a Doctor"
                className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}