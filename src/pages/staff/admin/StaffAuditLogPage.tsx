/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { getAuditLogs } from '../../../api';
import { AuditLog } from '../../../api/types';
import { ShieldCheck, Filter, Search } from 'lucide-react';

export const StaffAuditLogPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filterAction, setFilterAction] = useState('all');

  useEffect(() => {
    getAuditLogs().then(setLogs);
  }, []);

  const filtered = logs.filter(
    (l) => filterAction === 'all' || l.action.toLowerCase().includes(filterAction.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="font-headline font-black text-xl text-zinc-900 dark:text-zinc-50">
          सुरक्षा एवं संपादकीय ऑडिट लॉग (System Audit Trail)
        </h1>
        <p className="text-xs text-zinc-500">
          पोर्टल पर संपन्न प्रत्येक गतिविधि, संपादन, लॉगिन एवं विलोपन का अपरिवर्तनीय डिजिटल रिकॉर्ड
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-zinc-400" />
          <span className="font-semibold text-zinc-600 dark:text-zinc-300">कार्रवाई प्रकार:</span>
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="p-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs"
          >
            <option value="all">सभी गतिविधियाँ</option>
            <option value="ARTICLE">लेख संपादन एवं प्रकाशन</option>
            <option value="USER">यूजर लॉगिन एवं पासवर्ड</option>
            <option value="SITE">पोर्टल सेटिंग्स</option>
          </select>
        </div>

        <span className="text-xs text-zinc-500 font-mono">
          कुल {filtered.length} प्रविष्टियां दर्ज
        </span>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800/70 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">समय एवं दिनांक</th>
                <th className="p-4">स्टाफ सदस्य</th>
                <th className="p-4">भूमिका</th>
                <th className="p-4">क्रिया (Action)</th>
                <th className="p-4">विवरण</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-mono">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="p-4 text-zinc-500 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString('hi-IN')}
                  </td>
                  <td className="p-4 font-sans font-bold text-zinc-900 dark:text-zinc-100">
                    {log.userName}
                  </td>
                  <td className="p-4">
                    <span className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded uppercase text-[10px]">
                      {log.userRole}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-brand">{log.action}</span>
                  </td>
                  <td className="p-4 font-sans text-zinc-700 dark:text-zinc-300">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
