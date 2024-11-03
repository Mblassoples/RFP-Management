interface RFPItem {
  title: string;
  updatedAt: string;
  status: 'in_progress' | 'completed';
}

const rfpItems: RFPItem[] = [
  {
    title: 'Cloud Infrastructure RFP',
    updatedAt: '2 hours ago',
    status: 'in_progress',
  },
  {
    title: 'Security Assessment RFP',
    updatedAt: '1 day ago',
    status: 'completed',
  },
];

export function RecentRFPs() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">Recent RFPs</h3>
      <div className="space-y-4">
        {rfpItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500">Updated {item.updatedAt}</p>
            </div>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                item.status === 'in_progress'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {item.status === 'in_progress' ? 'In Progress' : 'Completed'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}