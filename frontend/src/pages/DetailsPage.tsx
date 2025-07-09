import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDetails } from '../hooks/useSearch';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ArrowLeft, User, Rocket, Globe, Film, Users, Car } from 'lucide-react';

export const DetailsPage: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { data, isLoading, error } = useDetails(type!, id!);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'people':
        return <User className="h-6 w-6 text-blue-400" />;
      case 'starships':
        return <Rocket className="h-6 w-6 text-yellow-400" />;
      case 'planets':
        return <Globe className="h-6 w-6 text-green-400" />;
      case 'films':
        return <Film className="h-6 w-6 text-purple-400" />;
      case 'species':
        return <Users className="h-6 w-6 text-orange-400" />;
      case 'vehicles':
        return <Car className="h-6 w-6 text-red-400" />;
      default:
        return null;
    }
  };

  const renderDetails = () => {
    if (!data) return null;

    const commonFields = ['name', 'title'];
    const skipFields = ['created', 'edited', 'url', 'films', 'people', 'characters', 'residents', 'pilots', 'vehicles', 'starships', 'species'];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(data).map(([key, value]) => {
          if (skipFields.includes(key) || !value) return null;

          const isNameField = commonFields.includes(key);
          
          return (
            <div key={key} className={isNameField ? 'md:col-span-2' : ''}>
              <div className="mb-2">
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  {key.replace(/_/g, ' ')}
                </label>
              </div>
              <div className={`text-white ${isNameField ? 'text-2xl font-bold' : 'text-lg'}`}>
                {Array.isArray(value) ? value.join(', ') : value.toString()}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <ErrorMessage message={error.message} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </div>

        <Card>
          <div className="flex items-center gap-3 mb-6">
            {getTypeIcon(type!)}
            <span className="text-blue-400 font-medium uppercase tracking-wider">
              {type}
            </span>
          </div>

          {renderDetails()}

          {/* Related Information */}
          {data?.films && data.films.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Featured in Films
              </h3>
              <div className="text-gray-400">
                {data.films.length} film{data.films.length > 1 ? 's' : ''}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};