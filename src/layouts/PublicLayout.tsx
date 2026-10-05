/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { InstallPwaBanner } from '../components/common/InstallPwaBanner';

export const PublicLayout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink dark:bg-zinc-950 dark:text-zinc-100 font-sans transition-colors duration-200">
      <InstallPwaBanner />
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
