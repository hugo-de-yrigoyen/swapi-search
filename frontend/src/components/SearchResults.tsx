import React from 'react';
import { SearchResult } from '../types';
import { Card } from './ui/Card';
import { User, Rocket, Globe, Film, Users, Car } from 'lucide-react';

interface SearchResultsProps {
  results: SearchResult[];
  onResultClick: (result: SearchResult) => void;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'people':
      return <User className="h-5 w-5 text-blue-400" />;
    case 'starships':
      return <Rocket className="h-5 w-5 text-yellow-400" />;
    case 'planets':
      return <Globe className="h-5 w-5 text-green-400" />;
    case 'films':
      return <Film className="h-5 w-5 text-purple-400" />;
    case 'species':
      return <Users className="h-5 w-5 text-orange-400" />;
    case 'vehicles':
      return <Car className="h-5 w-5 text-red-400" />;
    default:
      return null;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'people':
      return 'text-blue-400';
    case 'starships':
      return 'text-yellow-400';
    case 'planets':
      return 'text-green-400';
    case 'films':
      return 'text-purple-400';
    case 'species':
      return 'text-orange-400';
    case 'vehicles':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onResultClick,
}) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">
          No results found in the Imperial database
        </div>
        <div className="text-gray-500 text-sm mt-2">
          Try adjusting your search terms
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((result) => (
        <Card
          key={`${result.type}-${result.id}`}
          onClick={() => onResultClick(result)}
          className="hover:transform hover:scale-105 transition-transform duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {getTypeIcon(result.type)}
                <span className={`text-sm font-medium uppercase ${getTypeColor(result.type)}`}>
                  {result.type}
                </span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                {result.name}
              </h3>
              <p className="text-gray-400 text-sm">
                Click to view details
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};