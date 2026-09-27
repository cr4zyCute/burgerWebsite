import React from 'react';
import { ClipboardList, Shield, User, Clock } from 'lucide-react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { formatDateTime } from '../../lib/utils';

export const AdminAuditLogsPage: React.FC = () => {
  const sampleLogs = [
    {
      id: 'log-1',
      user: 'Marcus Vance',
      role: 'Super Admin',
      action: 'Published Homepage Changes',
      details: 'Updated main hero headline to "REAL DRY-AGED SMASH BURGERS."',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      ip: '192.168.1.42',
    },
    {
      id: 'log-2',
      user: 'Elena Rostova',
      role: 'Order Manager',
      action: 'Status Updated: Order #BC-849201',
      details: 'Advanced ticket status to "Completed"',
      timestamp: new Date(Date.now() - 1000 * 60 * 65).toISOString(),
      ip: '192.168.1.18',
    },
    {
      id: 'log-3',
      user: 'Marcus Vance',
      role: 'Super Admin',
      action: 'Created Promotion SMASH20',
      details: '20% off all orders over $25.00',
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      ip: '192.168.1.42',
    },
    {
      id: 'log-4',
      user: 'Elena Rostova',
      role: 'Order Manager',
      action: '86’d Item: Firebird Hot Chicken',
      details: 'Toggled item availability to out of stock for 45 minutes during dinner rush',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      ip: '192.168.1.18',
    },
    {
      id: 'log-5',
      user: 'Marcus Vance',
      role: 'Super Admin',
      action: 'Uploaded Media Asset',
      details: 'Added bourbon-bacon.jpg (980 KB) to media library',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      ip: '192.168.1.42',
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <AdminHeader
        title="Staff Security & Audit Logging"
        subtitle="Immutable records of administrative actions, pricing edits, and publishing events."
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1 max-w-7xl mx-auto w-full">
        <div className="bg-white border-4 border-[#171717] shadow-[6px_6px_0px_0px_#171717] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-body">
              <thead>
                <tr className="bg-[#171717] text-white uppercase font-display font-bold text-sm tracking-wider">
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Action Performed</th>
                  <th className="py-3 px-4">Change Details</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4 text-right">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD3]">
                {sampleLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#FAF8F3]">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#171717]">{log.user}</div>
                      <div className="text-[10px] text-[#A82D24] uppercase font-display font-bold">
                        {log.role}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-xs uppercase font-display text-[#171717]">
                      {log.action}
                    </td>
                    <td className="py-3.5 px-4 text-[#77736E] max-w-md">{log.details}</td>
                    <td className="py-3.5 px-4 text-[#77736E] font-mono text-[11px]">
                      {formatDateTime(log.timestamp)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-[#77736E]">
                      {log.ip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
