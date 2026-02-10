import {
  Film,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-screen bg-[#4338CA] text-white flex justify-center overflow-hidden -mx-[50vw] left-[50%] right-[50%] relative">
      <div className="flex w-full max-w-[1440px] h-[280px] py-10 justify-between items-start px-8 md:px-16">
        
        <div className="flex flex-col gap-4 w-full md:w-[386px]">
          <div className="flex items-center gap-2">
            <Film className="w-8 h-8" />
            <span className="text-2xl font-bold italic">Movie Z</span>
          </div>
          <p className="text-white/90 text-sm">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        
        <div className="flex flex-col gap-4 w-full md:w-[386px]">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 flex-shrink-0" />
              <div className="flex flex-col gap-1">
                <p className="text-sm text-white/90">Email:</p>
                <a
                  href="mailto:support@movieZ.com"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  support@movieZ.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 flex-shrink-0" />
              <div className="flex flex-col gap-1">
                <p className="text-sm text-white/90">Phone:</p>
                <a
                  href="tel:+97611123-4567"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  +976 (11) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>

        
        <div className="flex flex-col gap-4 w-full md:w-[386px]">
          <h3 className="text-lg font-semibold">Follow us</h3>
          <div className="flex gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 transition-colors"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 transition-colors"
              aria-label="Twitter"
            >
              Twitter
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 transition-colors"
              aria-label="Youtube"
            >
              Youtube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
