"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "🏠 Dashboard" },
  { href: "/resume", label: "📄 Resume" },
  { href: "/jd-analysis", label: "🎯 JD Analysis" },
  { href: "/cover-letter", label: "✉️ Cover Letter" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center gap-8">
      <span className="text-xl font-bold text-cyan-400">
        AI Job Copilot
      </span>
      <div className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors ${
              pathname === link.href
                ? "text-cyan-400 border-b-2 border-cyan-400 pb-1"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}