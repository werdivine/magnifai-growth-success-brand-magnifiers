import Link from 'next/link';
import { POPULAR_NICHES, POPULAR_CITIES } from '@/lib/constants';

export default function LeadsDirectory() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lead Generation Directory</h1>
      <p className="mb-8 text-gray-600">Find leads in popular niches and cities. Select a combination to view live results.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Popular Niches</h2>
          <ul className="space-y-2">
            {POPULAR_NICHES.map(niche => (
              <li key={niche}>
                <span className="font-medium text-gray-800">{niche}</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {POPULAR_CITIES.slice(0, 5).map(city => (
                    <Link 
                      key={city} 
                      href={`/leads/${encodeURIComponent(niche)}/${encodeURIComponent(city)}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {city}
                    </Link>
                  ))}
                  <Link href={`/leads/${encodeURIComponent(niche)}/all`} className="text-sm text-gray-500 hover:underline">
                    View all cities
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Popular Cities</h2>
          <ul className="space-y-2">
            {POPULAR_CITIES.map(city => (
              <li key={city}>
                <span className="font-medium text-gray-800">{city}</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {POPULAR_NICHES.slice(0, 5).map(niche => (
                    <Link 
                      key={niche} 
                      href={`/leads/${encodeURIComponent(niche)}/${encodeURIComponent(city)}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {niche}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
