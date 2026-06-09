import Link from "next/link";

const features = [
  {
    href: "/resume",
    icon: "📄",
    title: "Resume Analysis",
    desc: "Upload your resume and get AI-powered insights",
    color: "border-cyan-500",
  },
  {
    href: "/jd-analysis",
    icon: "🎯",
    title: "JD Match Score",
    desc: "Compare your resume with any job description",
    color: "border-purple-500",
  },
  {
    href: "/cover-letter",
    icon: "✉️",
    title: "Cover Letter",
    desc: "Generate personalized cover letters instantly",
    color: "border-green-500",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-12 mt-4">
        <h1 className="text-4xl font-bold text-white mb-3">
          AI Job Copilot 🚀
        </h1>
        <p className="text-gray-400 text-lg">
          Your AI-powered job search assistant
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f) => (
          <Link key={f.href} href={f.href}>
            <div
              className={`bg-gray-900 border-2 ${f.color} rounded-xl p-6 
              hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h2 className="text-white font-bold text-lg mb-2">
                {f.title}
              </h2>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}