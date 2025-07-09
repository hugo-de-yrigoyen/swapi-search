import React, { useState, useEffect } from "react";
import { Starfield } from "../components/Starfield";
import { SearchBar } from "../components/SearchBar";
import { TypeFilter } from "../components/TypeFilter";
import { SearchResults } from "../components/SearchResults";
import { useSearch } from "../hooks/useSearch";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const { data, isLoading } = useSearch(query, type);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // On mount, trigger a search for all results
  useEffect(() => {
    setHasSearched(true);
  }, []);

  const handleResultClick = (result: any) => {
    navigate(`/details/${result.type}/${result.id}`, { state: { result } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <Starfield />
      <div className="w-full max-w-2xl mx-auto p-6 z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 bg-black/30 backdrop-blur-sm border-b border-gray-700 rounded-lg p-4">
          <div>
            <h1 className="star-wars-font text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 glow">
              IMPERIAL DATABASE
            </h1>
            <p className="star-wars-font text-xs text-blue-200 tracking-wider">Imperial Intelligence System</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white star-wars-font">
              Welcome, <strong>{user?.username}</strong>
            </span>
            <button
              onClick={logout}
              className="star-wars-font py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 btn-hover text-xs font-bold">
              Logout
            </button>
          </div>
        </header>
        <div className="text-center mb-8">
          <h2 className="star-wars-font text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 mb-4 glow">
            SEARCH THE ARCHIVES
          </h2>
        </div>
        <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-8 border border-blue-500">
          <div className="mb-6">
            <SearchBar value={query} onChange={setQuery} placeholder="Search for people, planets, starships..." />
          </div>
          <div className="mb-6">
            <TypeFilter selectedType={type} onTypeChange={setType} />
          </div>
          {isLoading && (
            <div className="flex justify-center my-8">
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && <SearchResults results={data?.results || []} onResultClick={handleResultClick} />}
        </div>
      </div>
    </div>
  );
};
