import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSearch } from '../hooks/useSearch';
import { SearchBar } from '../components/SearchBar';
import { TypeFilter } from '../components/TypeFilter';
import { SearchResults } from '../components/SearchResults';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Button } from '../components/ui/Button';
import { SearchResult } from '../types';
import { Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SearchPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const { data, isLoading, error } = useSearch(query, selectedType);

  const handleResultClick = (result: SearchResult) => {
    navigate(`/details/${result.type}/${result.id}`, { state: { result } });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-xl font-bold text-white">
                  Rebel Alliance Database
                </h1>
                <p className="text-blue-200 text-sm">
                  Imperial Intelligence System
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-white">
                Welcome, <strong>{user?.username}</strong>
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search for people, starships, planets, films..."
            />
          </div>

          <div className="flex justify-center">
            <TypeFilter
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
          {!query && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">
                Ready to infiltrate the Imperial database
              </div>
              <div className="text-gray-500 text-sm">
                Enter a search term to begin your mission
              </div>
            </div>
          )}

          {query && isLoading && <LoadingSpinner />}

          {query && error && (
            <ErrorMessage message={error.message} />
          )}

          {query && data && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Search Results
                </h2>
                <div className="text-gray-400 text-sm">
                  {data.totalCount} results found for "{data.query}"
                </div>
              </div>

              <SearchResults
                results={data.results}
                onResultClick={handleResultClick}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};