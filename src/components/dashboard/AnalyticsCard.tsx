interface AnalyticItem {
  label: string;
  value: string | number;
  className?: string;
}

const analytics: AnalyticItem[] = [
  { label: 'Active RFPs', value: 3 },
  { label: 'Completed This Month', value: 7 },
  { label: 'Success Rate', value: '85%', className: 'text-green-600' },
];

export function AnalyticsCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">Analytics</h3>
      <div className="space-y-4">
        {analytics.map((item, index) => (
          <div key={index}>
            <p className="text-sm text-gray-600">{item.label}</p>
            <p className={`text-2xl font-semibold ${item.className || 'text-gray-900'}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}