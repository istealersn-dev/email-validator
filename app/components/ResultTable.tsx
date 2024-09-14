'use client';

interface ResultTableProps {
  result: {
    isValid: boolean;
    reason?: string;
    email?: string;
    domain?: string;
    mxRecords?: string | string[];
    ipAddress?: string;
    error?: string;
  };
}

export default function ResultTable({ result }: ResultTableProps) {
  if (!result.isValid) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Invalid Email: </strong>
        <span className="block sm:inline">{result.reason}</span>
        {result.error && <p className="mt-2 text-sm">Details: {result.error}</p>}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
        <strong className="font-bold">Valid Email Address</strong>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {Object.entries(result).map(([key, value]) => (
            <tr key={key}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {Array.isArray(value) ? value.join(', ') : String(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}