'use client';
import { Download, Globe, Package, Settings } from 'lucide-react';
import React from 'react';

import BackButton from '@/components/common/BackButton';
import StatCard from '@/components/packages/StatCard';
// import { IconDownload, IconGlobe, IconPackage } from '@/lib/icons';

export default function IconsPackagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1651C6] to-[#0D388E] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton
              fallbackUrl="/packages"
              label="Back to Packages"
              className="text-white hover:text-white"
            />
          </div>
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Lucide Icon Library
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              1,000+ beautiful icons for React, Vue, and Flutter. Fully
              customizable with TypeScript support.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Package className="w-6 h-6" />}
            label="Total Icons"
            value="1,000+"
          />
          <StatCard
            icon={<Settings className="w-6 h-6" />}
            label="Categories"
            value="20"
          />
          <StatCard
            icon={<Globe className="w-6 h-6" />}
            label="Frameworks"
            value="3"
            description="React, Vue, Flutter"
          />
          <StatCard
            icon={<Download className="w-6 h-6" />}
            label="Weekly Downloads"
            value="1M+"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Icon Browser Temporarily Unavailable
          </h2>
          <p className="text-gray-600 mb-6">
            The interactive icon browser is being updated to use Lucide Icons.
            In the meantime, you can explore the icons directly on the{' '}
            <a
              href="https://lucide.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Lucide website
            </a>
            .
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://lucide.dev/icons"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Icons
            </a>
            <a
              href="https://github.com/lucide-icons/lucide"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
