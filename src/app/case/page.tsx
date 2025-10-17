"use client";
import Link from "next/link";
import { useState } from "react";

export default function CasePage() {
  const [caseDetails, setCaseDetails] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      // For now, show a placeholder response
      setTimeout(() => {
        setResult(`Case Analysis for: "${caseDetails}"

**CASE PREPARATION ANALYSIS**

1. **Case Summary**:
   - Type: Civil/Criminal matter
   - Jurisdiction: Appropriate court based on case value and nature
   - Limitation period: Check applicable limitation under Limitation Act, 1963

2. **Legal Framework**:
   - Relevant Acts and Sections applicable
   - Precedents and case law references
   - Statutory provisions and amendments

3. **Evidence Collection**:
   - Documentary evidence required
   - Witness statements needed
   - Expert opinions if applicable
   - Digital evidence considerations

4. **Procedural Requirements**:
   - Court fees and stamp duty
   - Filing requirements and timelines
   - Service of notice procedures
   - Interim relief applications

5. **Strategy Recommendations**:
   - Strengths and weaknesses analysis
   - Settlement possibilities
   - Alternative dispute resolution options
   - Risk assessment

6. **Next Steps**:
   - Immediate actions required
   - Documentation to be prepared
   - Expert consultations needed
   - Timeline for case progression

**Note**: This is a preliminary analysis. Detailed case preparation requires thorough review of facts, applicable laws, and current legal precedents.`);
        setLoading(false);
      }, 2000);
    } catch (error) {
      setResult("Error analyzing case. Please try again.");
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
            Case Preparation
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            AI-powered case analysis and preparation for Indian courts and legal proceedings.
          </p>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Describe your case details:</label>
              <textarea
                value={caseDetails}
                onChange={(e) => setCaseDetails(e.target.value)}
                className="w-full p-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800"
                rows={4}
                placeholder="Example: My client has a contract dispute with a company. The contract was signed 2 years ago, but the other party has not fulfilled their obligations. What are my options?"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3 rounded-lg font-medium disabled:opacity-50"
            >
              {loading ? "Analyzing Case..." : "Analyze Case"}
            </button>
          </form>
        </div>

        {result && (
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Case Analysis:</h3>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg max-h-96 overflow-y-auto">{result}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
