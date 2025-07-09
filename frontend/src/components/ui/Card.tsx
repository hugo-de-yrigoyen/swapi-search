import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ className, children, onClick }) => {
  return (
    <div
      className={clsx(
        'bg-gray-800 rounded-lg border border-gray-700 p-6 shadow-lg',
        'transition-all duration-200',
        onClick && 'cursor-pointer hover:bg-gray-750 hover:border-gray-600 hover:shadow-xl',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};