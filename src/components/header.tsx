import Link from "next/link"
import Image from "next/image"
import { Venus } from "lucide-react"  

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#f7f7eb] dark:bg-slate-900 dark:border-slate-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Venus className="h-6 w-6 text-sky-600 dark:text-sky-400" />  
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
        
      </div>
    </header>
  )
}

