import { FileText, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold">RFP Manager</span>
          </div>
          <div className="flex items-center space-x-4">
            <Settings className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" />
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.email?.[0].toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">{user.email}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}