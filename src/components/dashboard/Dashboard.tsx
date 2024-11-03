import { PlusCircle } from 'lucide-react';
import { Navbar } from '../layout/Navbar';
import { UploadCard } from './UploadCard';
import { RecentRFPs } from './RecentRFPs';
import { AnalyticsCard } from './AnalyticsCard';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">RFP Dashboard</h1>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <PlusCircle className="h-5 w-5 mr-2" />
            New RFP
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UploadCard />
          <RecentRFPs />
          <AnalyticsCard />
        </div>
      </main>
    </div>
  );
}