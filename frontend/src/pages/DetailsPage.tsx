import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Starfield } from "../components/Starfield";
import { searchApi } from "../lib/api";
import axios from "axios";

// Helper to convert SWAPI URL to app route
const swapiUrlToRoute = (url: string) => {
  const match = url.match(/\/api\/(\w+)\/(\d+)/);
  if (match) {
    return `/details/${match[1]}/${match[2]}`;
  }
  return null;
};

// Helper to normalize SWAPI URLs (remove trailing slash)
const normalizeSwapiUrl = (url: string) => url.replace(/\/$/, "");

// Helper to format ISO date string as 'Month Day, Year' in English
const formatDate = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const DetailsPage: React.FC = () => {
  const { type, id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [details, setDetails] = useState<any>(location.state?.result?.data || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Cache for related entity names
  const [relatedNames, setRelatedNames] = useState<Record<string, string>>({});
  const [fromDetailsPage, setFromDetailsPage] = useState(false);

  // Detect if previous page was a DetailsPage
  useEffect(() => {
    // The logic for detecting previous page from history is removed as per the edit hint.
    // The state will now rely on location.state.fromDetailsPage.
    setFromDetailsPage(location.state?.fromDetailsPage || false);
  }, [location.state?.fromDetailsPage]);

  // Reset details and relatedNames when type or id changes
  useEffect(() => {
    setDetails(null);
    setRelatedNames({});
  }, [type, id]);

  useEffect(() => {
    if (!details && type && id) {
      setLoading(true);
      searchApi
        .getDetails(type, id)
        .then((data) => {
          setDetails(data);
          setError(null);
        })
        .catch((err) => {
          setError("Failed to load details.");
        })
        .finally(() => setLoading(false));
    }
  }, [details, type, id]);

  // Fetch and cache the name/title for a SWAPI URL
  const fetchRelatedName = useCallback(
    async (url: string) => {
      const normalizedUrl = normalizeSwapiUrl(url);
      if (relatedNames[normalizedUrl]) return; // Already cached
      try {
        const res = await axios.get(normalizedUrl);
        const name = res.data.name || res.data.title;
        setRelatedNames((prev) => ({ ...prev, [normalizedUrl]: name || normalizedUrl }));
      } catch {
        setRelatedNames((prev) => ({ ...prev, [normalizedUrl]: normalizedUrl }));
      }
    },
    [relatedNames]
  );

  // Helper to render value (string, array, or URL)
  const renderValue = (value: any) => {
    if (Array.isArray(value)) {
      if (value.length === 0) return null;
      return (
        <ul className="list-disc list-inside space-y-1">
          {value.map((item, idx) => {
            if (typeof item === "string" && (item === "none" || item === "n/a" || item === "unknown")) return null;
            if (typeof item === "string" && item.startsWith("http")) {
              const route = swapiUrlToRoute(item);
              const normalizedUrl = normalizeSwapiUrl(item);
              if (route) {
                // Fetch name if not cached
                if (!relatedNames[normalizedUrl]) fetchRelatedName(item);
                return (
                  <li key={idx}>
                    <a
                      href={route}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(route, { state: { fromDetailsPage: true } });
                      }}
                      className="text-blue-400 underline break-all">
                      {relatedNames[normalizedUrl] || "..."}
                    </a>
                  </li>
                );
              } else {
                return (
                  <li key={idx}>
                    <a
                      href={item}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline break-all">
                      {item}
                    </a>
                  </li>
                );
              }
            }
            return (
              <li key={idx}>
                <span>{String(item)}</span>
              </li>
            );
          })}
        </ul>
      );
    }
    if (typeof value === "string") {
      if (value === "none" || value === "n/a" || value === "unknown") return null;
      if (value.startsWith("http")) {
        const route = swapiUrlToRoute(value);
        const normalizedUrl = normalizeSwapiUrl(value);
        if (route) {
          if (!relatedNames[normalizedUrl]) fetchRelatedName(value);
          return (
            <a
              href={route}
              onClick={(e) => {
                e.preventDefault();
                navigate(route, { state: { fromDetailsPage: true } });
              }}
              className="text-blue-400 underline break-all">
              {relatedNames[normalizedUrl] || "..."}
            </a>
          );
        } else {
          return (
            <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline break-all">
              {value}
            </a>
          );
        }
      }
    }
    return <span>{String(value)}</span>;
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <Starfield />
      <div className="w-full max-w-xl mx-auto p-6 z-10">
        {/* Navigation links block */}
        <div className="mb-6">
          <div>
            <button
              onClick={() => navigate("/")}
              className="star-wars-font text-blue-400 hover:text-blue-200 underline text-sm">
              ← Back to Search
            </button>
          </div>
          {location.state?.fromDetailsPage && (
            <div className="mt-2">
              <button
                onClick={() => navigate(-1)}
                className="star-wars-font text-blue-400 hover:text-blue-200 underline text-sm">
                ← Back
              </button>
            </div>
          )}
        </div>
        <div className="text-center mb-8">
          <h1 className="star-wars-font text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 mb-4">
            IMPERIAL DATABASE
          </h1>
          <p className="star-wars-font text-lg text-gray-300 tracking-wider">
            {type ? type.toUpperCase() : "DETAILS"} DETAILS
          </p>
        </div>
        <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-8 border border-blue-500">
          {/* Render details dynamically */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center text-blue-300 star-wars-font">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-400 star-wars-font">{error}</div>
            ) : !details || Object.keys(details).length === 0 ? (
              <div className="text-center text-gray-400 star-wars-font">No details available.</div>
            ) : (
              Object.entries(details).map(([key, value]) => {
                // Hide lines where value is 'none', 'n/a', 'unknown', or empty array, or key is 'url'
                if (
                  key === "url" ||
                  value === "none" ||
                  value === "n/a" ||
                  value === "unknown" ||
                  (Array.isArray(value) && value.length === 0)
                ) {
                  return null;
                }
                // Format created/edited dates
                if ((key === "created" || key === "edited") && typeof value === "string") {
                  return (
                    <div key={key} className="flex flex-col md:flex-row md:items-center md:gap-4">
                      <span className="star-wars-font text-blue-300 font-bold uppercase w-40">{key}:</span>
                      <span className="text-white break-words">{formatDate(value)}</span>
                    </div>
                  );
                }
                return (
                  <div key={key} className="flex flex-col md:flex-row md:items-center md:gap-4">
                    <span className="star-wars-font text-blue-300 font-bold uppercase w-40">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="text-white break-words">{renderValue(value)}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
