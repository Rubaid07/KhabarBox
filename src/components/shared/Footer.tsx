import { Copyright } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Copyright className="h-4 w-4" />
          <span>{currentYear} Khabar Box. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}