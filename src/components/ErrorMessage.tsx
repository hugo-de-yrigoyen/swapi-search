import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <p className="text-red-400 text-lg font-medium">
          Error connecting to the Imperial database
        </p>
        <p className="text-gray-400 text-sm mt-2">
          {message}
        </p>
      </div>
    </div>
  );
};