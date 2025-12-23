import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-primary p-2 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
              <Plane className="w-5 h-5 md:w-6 md:h-6 -rotate-45" />
            </div>
            <span
              className={`text-xl md:text-2xl font-bold font-display tracking-tight ${scrolled ? "text-primary" : "text-primary"}`}
            >
              Fly Companion
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          <Link href="/contact">
            <span
              className={`text-sm md:text-base font-medium hover:text-secondary transition-colors cursor-pointer ${location === "/contact" ? "text-secondary" : "text-foreground/80"}`}
            >
              Contact
            </span>
          </Link>
          <Button
            variant="default"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-lg shadow-secondary/20 rounded-full px-6"
            onClick={() => {
              const el = document.getElementById("join-waitlist");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Join Now
          </Button>
        </div>
      </div>
    </nav>
  );
}
