"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("research");

  const tabs = [
    { id: "property", label: "Property Opinions", href: "/property" },
    { id: "research", label: "Research", href: "/research" },
    { id: "case", label: "Case", href: "/case" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            LegalIndia.ai
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/about" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
            About
          </Link>
          <Link href="/login" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
            Login
          </Link>
          <Link href="/settings" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
            Settings
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-6xl">
        {/* Tab Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Junior</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Welcome Section */}
        <section className="rounded-2xl bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-black/5 dark:border-white/10 p-10 sm:p-16 text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Junior AI for Indian Lawyers
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Your assistant for property opinions, research, case preparation, and more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/research" className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-white bg-black hover:bg-zinc-800 w-full sm:w-auto">
              Start Research
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-zinc-100 w-full sm:w-auto">
              Login
            </Link>
          </div>
        </section>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/property" className="p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Property Opinions</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">Get expert property law opinions and analysis</p>
          </Link>
          <Link href="/research" className="p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Legal Research</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">AI-powered research with case law references</p>
          </Link>
          <Link href="/case" className="p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Case Preparation</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">Prepare and analyze legal cases</p>
          </Link>
        </div>
      </div>
    </div>
  );
}