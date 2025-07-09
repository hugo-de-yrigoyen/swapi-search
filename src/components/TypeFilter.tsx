import React from 'react';
import { Button } from './ui/Button';

const TYPES = [
  { value: '', label: 'All' },
  { value: 'people', label: 'People' },
  { value: 'starships', label: 'Starships' },
  { value: 'planets', label: 'Planets' },
  { value: 'films', label: 'Films' },
  { value: 'species', label: 'Species' },
  { value: 'vehicles', label: 'Vehicles' },
];

interface TypeFilterProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export const TypeFilter: React.FC<TypeFilterProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {TYPES.map((type) => (
        <Button
          key={type.value}
          variant={selectedType === type.value ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onTypeChange(type.value)}
        >
          {type.label}
        </Button>
      ))}
    </div>
  );
};