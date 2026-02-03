import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#13377b] text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Filters Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3 ">Filters</h3>
            <ul className="space-y-2 text-sm text-gray-200 ml-3">
              <li>All</li>
              <li>Electronics</li>
            </ul>
          </div>

          {/* About Us Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3">About Us</h3>
            <ul className="space-y-2 text-sm text-gray-200 ml-3">
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-[#2c6ade] rounded-full flex items-center justify-center hover:bg-white/20 transition-colors "
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-[#2c6ade] text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors "
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5  stroke-[2.2]" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-[#306ddf] rounded-full flex items-center justify-center hover:bg-white/20 transition-colors "
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-6 text-left text-sm text-gray-300">
          © 2026 America
        </div>
      </div>
    </footer>
  );
}