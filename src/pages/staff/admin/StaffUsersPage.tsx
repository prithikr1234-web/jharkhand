/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { getStaffUsers, createStaffUser, toggleStaffUserActive, resetStaffPassword } from '../../../api';
import { User, Role } from '../../../api/types';
import { Users, UserPlus, Key, Lock, Check, Copy, X, ShieldCheck, ShieldAlert } from 'lucide-react';

export const StaffUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState<Role>('reporter');

  // Once-shown temporary password card
  const [createdTempPassword, setCreatedTempPassword] = useState<string | null>(null);
  const [createdUserName, setCreatedUserName] = useState('');
  const [copied, setCopied] = useState(false);

  const fetchUsers = () => {
    getStaffUsers().then(setUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !mobile.trim()) return;

    try {
      const res = await createStaffUser({ name, email, mobile, role });
      setCreatedTempPassword(res.temporaryPassword);
      setCreatedUserName(res.user.name);
      setShowAddModal(false);
      setName('');
      setEmail('');
      setMobile('');
      fetchUsers();
    } catch (err: any) {
      alert(err.message || 'यूजर जोड़ने में त्रुटि');
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    await toggleStaffUserActive(id, !current);
    fetchUsers();
  };

  const handleResetPassword = async (id: string, userName: string) => {
    if (confirm(`क्या आप ${userName} का पासवर्ड रीसेट कर नया अस्थायी पासवर्ड बनाना चाहते हैं?`)) {
      const res = await resetStaffPassword(id);
      setCreatedTempPassword(res.temporaryPassword);
      setCreatedUserName(userName);
    }
  };

  const handleCopyPassword = () => {
    if (createdTempPassword) {
      navigator.clipboard.writeText(createdTempPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="font-headline font-black text-xl text-zinc-900 dark:text-zinc-50">
            स्टाफ एवं उपयोगकर्ता प्रबंधन (User Accounts & RBAC)
          </h1>
          <p className="text-xs text-zinc-500">
            एडमिन, संपादक, संवाददाता और मीडिया प्रबंधकों के खाते व अनुमतियां
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-brand hover:bg-brand-dark text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 flex-shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>नया स्टाफ जोड़ें</span>
        </button>
      </div>

      {/* One-time Temporary Password Alert Card */}
      {createdTempPassword && (
        <div className="p-4 bg-amber-500/10 border-2 border-amber-500 rounded-2xl space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs">
              <Key className="w-4 h-4" />
              <span>अस्थायी पासवर्ड उत्पन्न (Temporary Password Generated)</span>
            </div>
            <button
              onClick={() => setCreatedTempPassword(null)}
              className="text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-zinc-700 dark:text-zinc-300">
            यह पासवर्ड <strong>{createdUserName}</strong> को दें। <strong>पहले लॉगिन पर बदलना अनिवार्य होगा।</strong> यह पासवर्ड पुनः कभी प्रदर्शित नहीं होगा!
          </p>

          <div className="flex items-center gap-2">
            <span className="font-mono font-black text-lg bg-white dark:bg-zinc-800 px-4 py-1.5 rounded-lg border border-amber-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 select-all">
              {createdTempPassword}
            </span>
            <button
              onClick={handleCopyPassword}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'कॉपी हुआ' : 'पासवर्ड कॉपी करें'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800/70 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">नाम एवं संपर्क</th>
                <th className="p-4">ईमेल</th>
                <th className="p-4">भूमिका (Role)</th>
                <th className="p-4">स्थिति</th>
                <th className="p-4 text-right">कार्रवाई</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 block">
                      {u.name}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">{u.mobile}</span>
                  </td>

                  <td className="p-4 font-mono text-zinc-600 dark:text-zinc-400">
                    {u.email}
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full font-bold uppercase text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {u.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      u.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {u.isActive ? 'सक्रिय (Active)' : 'अवरुद्ध (Disabled)'}
                    </span>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleResetPassword(u.id, u.name)}
                      className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 rounded font-semibold text-[11px]"
                    >
                      पासवर्ड रीसेट
                    </button>
                    {u.role !== 'admin' && (
                      <button
                        onClick={() => handleToggleActive(u.id, u.isActive)}
                        className={`px-2.5 py-1 rounded font-semibold text-[11px] ${
                          u.isActive
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        }`}
                      >
                        {u.isActive ? 'अवरुद्ध करें' : 'सक्रिय करें'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="font-headline font-bold text-base text-zinc-900 dark:text-zinc-100">
                नया स्टाफ खाता जोड़ें
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  पूरा नाम *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा. राहुल कुमार"
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  ईमेल पता (लॉगिन आईडी) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@swatantrakhabar.in"
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  मोबाइल नंबर *
                </label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="9876543210"
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  भूमिका (Role) *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs font-semibold"
                >
                  <option value="editor">वरिष्ठ संपादक (Editor)</option>
                  <option value="reporter">संवाददाता (Reporter)</option>
                  <option value="media">छायाकार / वीडियोग्राफर (Media)</option>
                  <option value="ad_manager">विज्ञापन प्रबंधक (Ad Manager)</option>
                  <option value="admin">मुख्य व्यवस्थापक (Admin)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand hover:bg-brand-dark text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  खाता सृजित करें व अस्थायी पासवर्ड प्राप्त करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
