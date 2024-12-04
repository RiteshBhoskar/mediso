
import { Button } from "./ui/button";

export default function (){
    return (
        <footer className="w-full py-5 bg-white border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500">© 2024 Mediso. All rights reserved.</p>
            <nav className="flex ">
              <Button variant="linkHover2" className="text-sm text-gray-500">
                   Terms of Service
              </Button>
              <Button variant="linkHover2" className="text-sm text-gray-500">
                   Privacy Policy
              </Button>
              <Button variant="linkHover2" className="text-sm text-gray-500">
                   Contact Us
              </Button>
            </nav>
          </div>
        </div>
      </footer>
    )
}