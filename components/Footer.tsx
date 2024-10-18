import Link from "next/link";

export default function (){
    return (
        <footer className="w-full py-6 bg-white border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500">© 2024 HealthConnect. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6">
              <Link className="text-sm hover:underline underline-offset-4 text-gray-500 hover:text-blue-600" href="#">
                Terms of Service
              </Link>
              <Link className="text-sm hover:underline underline-offset-4 text-gray-500 hover:text-blue-600" href="#">
                Privacy Policy
              </Link>
              <Link className="text-sm hover:underline underline-offset-4 text-gray-500 hover:text-blue-600" href="#">
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    )
}