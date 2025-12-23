import { Link } from "wouter";
import { Plane, Twitter, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white/10 p-2 rounded-lg text-white">
                <Plane className="w-6 h-6 -rotate-45" />
              </div>
              <span className="text-2xl font-bold font-display tracking-tight">
                Fly Companion
              </span>
            </div>
            <p className="text-gray-400 max-w-sm text-lg leading-relaxed">
              Bridging generations through travel. We connect elderly travelers
              with caring companions for safer, happier journeys.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <span className="text-gray-600 cursor-not-allowed">
                  About Us (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-gray-600 cursor-not-allowed">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Fly Companion Inc. All rights
            reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
