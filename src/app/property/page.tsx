"use client";
import Link from "next/link";
import { useState } from "react";

export default function PropertyPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      // For now, show a placeholder response
      setTimeout(() => {
        setResult(`Property Opinion for: "${query}"

Based on Indian Property Law:

1. **Legal Analysis**: This query involves property law considerations under the Transfer of Property Act, 1882.

2. **Key Provisions**: 
   - Section 3: Definition of immovable property
   - Section 54: Sale of immovable property
   - Section 105: Lease of immovable property

3. **Practical Steps**:
   - Verify property title and ownership
   - Check for any encumbrances or liens
   - Review relevant documentation
   - Consult local property laws

4. **Important Considerations**:
   - State-specific property laws may apply
   - Registration requirements under the Registration Act, 1908
   - Stamp duty implications

Note: This is a general analysis. For specific legal advice, consult with a qualified property lawyer.`);
        setLoading(false);
      }, 2000);
    } catch (error) {
      setResult("Error generating property opinion. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      {/* Navigation */}
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

      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-6xl">
            Property Opinions
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Get expert property law opinions and analysis for Indian real estate matters.
          </p>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Describe your property matter:</label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800"
                rows={4}
                placeholder="Example: I want to buy a property but the seller has not provided clear title documents. What should I do?"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3 rounded-lg font-medium disabled:opacity-50"
            >
              {loading ? "Generating Opinion..." : "Get Property Opinion"}
            </button>
          </form>
        </div>

        {result && (
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Property Opinion:</h3>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg max-h-96 overflow-y-auto">{result}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
