import { performWebSearch } from '@/lib/searchService';
import Link from 'next/link';
import { EXPERT_RESOURCES } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ niche: string, city: string }> }) {
  const { niche, city } = await params;
  const decodedNiche = decodeURIComponent(niche);
  const decodedCity = decodeURIComponent(city);
  return {
    title: `${decodedNiche} Leads in ${decodedCity} | Free Lead Gen`,
    description: `Find ${decodedNiche} leads in ${decodedCity}. Free automated lead generation tool.`,
  };
}

export default async function LeadPage({ params }: { params: Promise<{ niche: string, city: string }> }) {
  const { niche, city } = await params;
  const decodedNiche = decodeURIComponent(niche);
  const decodedCity = decodeURIComponent(city);
  const query = `${decodedNiche} in ${decodedCity}`;
  
  let results: any[] = [];
  let error = null;

  try {
    // Perform server-side search
    results = await performWebSearch(query, 10);
  } catch (e) {
    console.error("Search failed:", e);
    error = "Could not fetch live results at this moment. Please try again later.";
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/leads" className="text-blue-600 hover:underline">← Back to Directory</Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">{decodedNiche} Leads in {decodedCity}</h1>
      <p className="text-gray-600 mb-8">
        Found {results.length} potential leads. Use our automated tools to enrich this data.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid gap-6 mb-12">
        {results.map((result, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
            <h3 className="font-semibold text-lg text-blue-800">
              <a href={result.link} target="_blank" rel="noopener noreferrer">{result.title}</a>
            </h3>
            <p className="text-green-700 text-sm mb-2 truncate">{result.link}</p>
            <p className="text-gray-700 text-sm">{result.snippet}</p>
          </div>
        ))}
        {results.length === 0 && !error && (
            <p className="text-gray-500 italic">No results found via automated search. Try the live tool below.</p>
        )}
      </div>

      <div className="bg-gray-50 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">Expert Resources & Tools</h2>
        <p className="mb-4 text-gray-600">Take your lead generation to the next level with these recommended tools:</p>
        <div className="grid md:grid-cols-2 gap-4">
          {EXPERT_RESOURCES.map(resource => (
            <div key={resource.name} className="bg-white p-4 rounded border">
              <h3 className="font-bold">{resource.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                Visit Website
              </a>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/tools/lead-finder" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
          Start a New Live Search
        </Link>
      </div>
    </div>
  );
}
