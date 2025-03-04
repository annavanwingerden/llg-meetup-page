import Link from "next/link"
import Image from "next/image"
import { Venus } from "lucide-react"  

export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-[#f7f7eb]/80 backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Venus className="h-6 w-6 text-sky-600 dark:text-sky-400" />  {/* Changed from SkullIcon */}
          <Image
            src="/logo.png"
            alt="London Longboard Girls!"
            width={200}
            height={70}
            style={{ height: 'auto' }}
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="https://www.londonlongboardgirls.com/meetups"
            className="text-sm font-medium hover:text-sky-600 dark:hover:text-sky-400"
            target="_blank" 
            rel="noopener noreferrer"  
          >
            Home
          </Link>
        </nav>

        <div className="md:hidden">
          <button className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

