"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  onSubscribeClick: () => void
}

export function Navbar({ onSubscribeClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activePath, setActivePath] = useState("/")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const handlePathChange = () => {
      setActivePath(window.location.pathname)
    }

    window.addEventListener("scroll", handleScroll)
    handlePathChange()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3 bg-black/80 backdrop-blur-lg shadow-lg" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            Neural<span className="text-purple-500">Pulse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm">
            <Link href="/" className={`nav-link ${activePath === "/" ? "active" : ""}`}>
              Home
            </Link>
            <Link href="/articles/" className={`nav-link ${activePath.includes("/articles") ? "active" : ""}`}>
              Articles
            </Link>
            <Link href="/topics/" className={`nav-link ${activePath.includes("/topics") ? "active" : ""}`}>
              Topics
            </Link>
            <Link href="/about/" className={`nav-link ${activePath.includes("/about") ? "active" : ""}`}>
              About
            </Link>
          </nav>

          <div className="hidden md:block">
            <Button variant="outline" className="liquid-button" onClick={onSubscribeClick}>
              Subscribe
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-gray-900/90 backdrop-blur-lg rounded-lg">
            <nav className="flex flex-col space-y-4 px-4">
              <Link
                href="/"
                className={`nav-link ${activePath === "/" ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/articles/"
                className={`nav-link ${activePath.includes("/articles") ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/topics/"
                className={`nav-link ${activePath.includes("/topics") ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Topics
              </Link>
              <Link
                href="/about/"
                className={`nav-link ${activePath.includes("/about") ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Button
                variant="outline"
                className="liquid-button w-full"
                onClick={() => {
                  onSubscribeClick()
                  setIsMobileMenuOpen(false)
                }}
              >
                Subscribe
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
