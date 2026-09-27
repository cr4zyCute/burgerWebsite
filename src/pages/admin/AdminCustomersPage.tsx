import React from 'react';
import { Mail, Phone, ShoppingBag, Shield } from 'lucide-react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { SEED_USERS } from '../../db/seed-data';
import { formatDate } from '../../lib/utils';

export const AdminCustomersPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <AdminHeader
        title="Customer Directory & Staff Profiles"
        subtitle="Manage registered diners, loyalty profiles, and staff role permissions."
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1 max-w-7xl mx-auto w-full">
        <div className="bg-white border-4 border-[#171717] shadow-[6px_6px_0px_0px_#171717] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-body">
              <thead>
                <tr className="bg-[#171717] text-white uppercase font-display font-bold text-sm tracking-wider">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role Permission</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Member Since</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD3]">
                {SEED_USERS.map((user) => (
                  <tr key={user.id} className="hover:bg-[#FAF8F3]">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt=""
                            className="w-9 h-9 rounded-full object-cover border border-[#171717]"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#F5F0E6] border border-[#171717] flex items-center justify-center font-bold">
                            {user.name[0]}
                          </div>
                        )}
                        <span className="font-bold text-[#171717]">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#77736E]">{user.email}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold uppercase font-display px-2 py-0.5 bg-[#F5F0E6] text-[#A82D24] border border-[#E5DFD3]">
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#77736E]">{user.phoneNumber || 'N/A'}</td>
                    <td className="py-3.5 px-4 text-[#77736E]">{formatDate(user.createdAt)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-[10px] font-bold uppercase font-display px-2 py-0.5 bg-green-100 text-green-800 border border-green-300">
                        Active Verified
                      </span>
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
