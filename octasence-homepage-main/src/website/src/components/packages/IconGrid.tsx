'use client';
import React from 'react';

interface IconGridProps {
  icons: any[];
  isLoading: boolean;
  onSelectIcon: (icon: any) => void;
}

export default function IconGrid({
  icons,
  isLoading,
  onSelectIcon,
}: IconGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Loading icons...</p>
        </div>
      </div>
    );
  }

  if (icons.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No icons found
          </h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-3">
      {icons.map((icon) => (
        <div
          key={icon.name}
          className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
          onClick={() => onSelectIcon(icon)}
        >
          <div className="w-8 h-8 mb-2 flex items-center justify-center text-gray-700">
            {icon.component || <div className="w-6 h-6 bg-gray-300 rounded" />}
          </div>
          <div className="text-xs text-gray-600 text-center truncate w-full">
            {icon.name}
          </div>
        </div>
      ))}
    </div>
  );
}
