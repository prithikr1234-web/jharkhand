/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  Clock,
  Image as ImageIcon,
  BookOpen,
  DollarSign,
  MessageSquare,
  Users,
  Settings,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Bell,
  UserCheck,
} from 'lucide-react';
import { StaffRole, normalizeRole } from '../lib/permissions/roles';

export const StaffLayout: React.FC = () => {
  const { user, isLoading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If still checking auth status, show skeleton loader
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="space-y-3 text-center">
          <div className="w-10 h-10 border-3 border-brand border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-zinc-400">संपादकीय क्रेडेंशियल्स सत्यापित हो रहे हैं...</p>
        </div>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!user) {
    navigate('/staff/login', { replace: true });
    return null;
  }

  // If user must change password, redirect to change-password
  if (user.mustChangePassword && location.pathname !== '/staff/change-password') {
    navigate('/staff/change-password', { replace: true });
    return null;
  }

  const role: StaffRole = normalizeRole(user.role);

  // Navigation menu items filtered strictly by role per prompt specification
  const navItems = [
    {
      titleHi: 'डैशबोर्ड',
      titleEn: 'Dashboard',
      path: '/staff',
      icon: LayoutDashboard,
      roles: ['ADMIN', 'EDITOR', 'REPORTER', 'MEDIA', 'AD_MANAGER'],
    },
    {
      titleHi: 'नया लेख',
      titleEn: 'New Article',
      path: '/staff/articles/new',
      icon: FilePlus,
      roles: ['ADMIN', 'EDITOR', 'REPORTER'],
    },
    {
      titleHi: 'मेरे / सभी लेख',
      titleEn: 'Articles',
      path: '/staff/articles',
      icon: FileText,
      roles: ['ADMIN', 'EDITOR', 'REPORTER'],
    },
    {
      titleHi: 'रिव्यू कतार',
      titleEn: 'Review Queue',
      path: '/staff/review-queue',
      icon: Clock,
      roles: ['ADMIN', 'EDITOR'],
    },
    {
      titleHi: 'मीडिया लाइब्रेरी',
      titleEn: 'Media Library',
      path: '/staff/media',
      icon: ImageIcon,
      roles: ['ADMIN', 'EDITOR', 'REPORTER', 'MEDIA'],
    },
    {
      titleHi: 'ई-पेपर',
      titleEn: 'E-Paper',
      path: '/staff/epaper',
      icon: BookOpen,
      roles: ['ADMIN', 'EDITOR', 'MEDIA'],
    },
    {
      titleHi: 'विज्ञापन',
      titleEn: 'Ads Manager',
      path: '/staff/ads',
      icon: DollarSign,
      roles: ['ADMIN', 'AD_MANAGER'],
    },
    {
      titleHi: 'कमेंट्स',
      titleEn: 'Comments',
      path: '/staff/comments',
      icon: MessageSquare,
      roles: ['ADMIN', 'EDITOR'],
    },
    {
      titleHi: 'स्टाफ',
      titleEn: 'Staff',
      path: '/staff/users',
      icon: Users,
      roles: ['ADMIN'],
    },
    {
      titleHi: 'सेटिंग्स',
      titleEn: 'Settings',
      path: '/staff/settings',
      icon: Settings,
      roles: ['ADMIN'],
    },
    {
      titleHi: 'ऑडिट लॉग',
      titleEn: 'Audit Log',
      path: '/staff/audit',
      icon: ShieldCheck,
      roles: ['ADMIN', 'EDITOR'],
    },
  ];

  const allowedNav = navItems.filter((item) => item.roles.includes(role));

  // Verify authorization for current route
  const currentMatchedItem = navItems.find((item) =>
    item.path === '/staff'
      ? location.pathname === '/staff'
      : location.pathname.startsWith(item.path)
  );

  const isCurrentRouteAllowed = !currentMatchedItem || currentMatchedItem.roles.includes(role);

  const roleLabels: Record<StaffRole, { hi: string; color: string }> = {
    ADMIN: { hi: 'मुख्य एडमिन', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    EDITOR: { hi: 'वरिष्ठ संपादक', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    REPORTER: { hi: 'संवाददाता', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    MEDIA: { hi: 'मीडिया मैनेजर', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    AD_MANAGER: { hi: 'विज्ञापन प्रबंधक', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  };

  const currentRoleInfo = roleLabels[role] || { hi: role, color: 'bg-zinc-700 text-zinc-300' };

  return (
    <div className="min-h-screen flex bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      {/* Sidebar (Charcoal #14161E) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#14161E] text-zinc-300 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
            <Link to="/staff" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-headline font-black text-lg">
                झ
              </div>
              <div className="flex flex-col">
                <span className="font-headline font-bold text-sm text-white leading-tight">
                  स्वतंत्र खबर
                </span>
                <span className="text-[10px] text-zinc-400 font-mono tracking-wider">
                  न्यूज़रूम CMS
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="p-3.5 mx-3 my-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-white truncate max-w-[130px]">
                {user.name}
              </span>
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${currentRoleInfo.color}`}
              >
                {currentRoleInfo.hi}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
          </div>

          {/* Nav Items */}
          <nav className="px-3 space-y-1 mt-2">
            {allowedNav.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/staff'
                  ? location.pathname === '/staff'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand text-white shadow-xs font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.titleHi}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-zinc-800/80 space-y-1.5">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>पब्लिक वेबसाइट</span>
            </span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>लॉगआउट करें</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-2.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                झारखंड स्वतंत्र खबर
              </span>
              <span className="hidden sm:inline-block text-xs text-muted">
                / {currentMatchedItem?.titleHi || 'संपादकीय कक्ष'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full">
              <UserCheck className="w-3.5 h-3.5 text-brand" />
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{user.name}</span>
              <span>•</span>
              <span className="text-brand font-bold">{currentRoleInfo.hi}</span>
            </div>

            <button
              onClick={logout}
              title="लॉगआउट"
              className="p-1.5 text-zinc-500 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content Outlet or Forbidden Gate */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {isCurrentRouteAllowed ? (
            <Outlet />
          ) : (
            <div className="bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-900/60 rounded-2xl p-8 sm:p-12 text-center space-y-4 max-w-xl mx-auto my-12 shadow-sm">
              <div className="w-14 h-14 bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h2 className="font-headline font-black text-xl text-zinc-900 dark:text-zinc-50">
                आपको इस पेज की अनुमति नहीं है
              </h2>
              <p className="text-xs text-muted leading-relaxed">
                आपकी वर्तमान संपादकीय भूमिका (<strong>{currentRoleInfo.hi}</strong>) को इस अनुभाग तक पहुंचने का अधिकार नहीं दिया गया है। अधिक जानकारी के लिए मुख्य प्रशासक से संपर्क करें।
              </p>
              <Link
                to="/staff"
                className="inline-block px-5 py-2.5 bg-brand hover:bg-brand-dark text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                डैशबोर्ड पर लौटें
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
