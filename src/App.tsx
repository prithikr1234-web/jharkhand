/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Public Layout & Pages
import { PublicLayout } from './layouts/PublicLayout';
import { HomePage } from './pages/public/HomePage';
import { ArticlePage } from './pages/public/ArticlePage';
import { CategoryPage } from './pages/public/CategoryPage';
import { DistrictPage } from './pages/public/DistrictPage';
import { SearchPage } from './pages/public/SearchPage';
import { EPaperPage } from './pages/public/EPaperPage';
import { VideosListingPage } from './pages/public/VideosListingPage';
import { PhotosListingPage } from './pages/public/PhotosListingPage';
import { AboutPage } from './pages/public/static/AboutPage';
import { ContactPage } from './pages/public/static/ContactPage';
import { CitizenReporterPage } from './pages/public/static/CitizenReporterPage';
import { GrievanceOfficerPage } from './pages/public/static/GrievanceOfficerPage';
import { PrivacyPolicyPage } from './pages/public/static/PrivacyPolicyPage';
import { TermsPage, DisclaimerPage } from './pages/public/static/TermsAndDisclaimer';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Staff Layout & Pages
import { StaffLayout } from './layouts/StaffLayout';
import { StaffLoginPage } from './pages/staff/StaffLoginPage';
import { StaffChangePasswordPage } from './pages/staff/StaffChangePasswordPage';
import { StaffDashboardPage } from './pages/staff/StaffDashboardPage';
import { StaffArticlesListPage } from './pages/staff/StaffArticlesListPage';
import { StaffArticleEditorPage } from './pages/staff/StaffArticleEditorPage';
import { StaffReviewQueuePage } from './pages/staff/StaffReviewQueuePage';
import { StaffMediaLibraryPage } from './pages/staff/StaffMediaLibraryPage';
import { StaffEPaperUploadPage } from './pages/staff/StaffEPaperUploadPage';
import { StaffAdsManagerPage } from './pages/staff/StaffAdsManagerPage';
import { StaffCommentsModerationPage } from './pages/staff/StaffCommentsModerationPage';
import { StaffUsersPage } from './pages/staff/admin/StaffUsersPage';
import { StaffAuditLogPage } from './pages/staff/admin/StaffAuditLogPage';
import { StaffSettingsPage } from './pages/staff/admin/StaffSettingsPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* 1. Staff Portal Standalone Pages */}
            <Route path="/staff/login" element={<StaffLoginPage />} />
            <Route path="/staff/change-password" element={<StaffChangePasswordPage />} />

            {/* 2. Staff Portal Protected Dashboard Room */}
            <Route path="/staff" element={<StaffLayout />}>
              <Route index element={<StaffDashboardPage />} />
              <Route path="articles" element={<StaffArticlesListPage />} />
              <Route path="articles/new" element={<StaffArticleEditorPage />} />
              <Route path="articles/:id" element={<StaffArticleEditorPage />} />
              <Route path="review-queue" element={<StaffReviewQueuePage />} />
              <Route path="media" element={<StaffMediaLibraryPage />} />
              <Route path="epaper" element={<StaffEPaperUploadPage />} />
              <Route path="ads" element={<StaffAdsManagerPage />} />
              <Route path="comments" element={<StaffCommentsModerationPage />} />
              <Route path="users" element={<StaffUsersPage />} />
              <Route path="audit" element={<StaffAuditLogPage />} />
              <Route path="settings" element={<StaffSettingsPage />} />
            </Route>

            {/* 3. Public News Website */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/news/:id/:slug" element={<ArticlePage />} />
              <Route path="/news/:id" element={<ArticlePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/epaper" element={<EPaperPage />} />
              <Route path="/videos" element={<VideosListingPage />} />
              <Route path="/photos" element={<PhotosListingPage />} />
              <Route path="/district/:slug" element={<DistrictPage />} />

              {/* Static Pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/citizen-reporter" element={<CitizenReporterPage />} />
              <Route path="/grievance-officer" element={<GrievanceOfficerPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />

              {/* Dynamic Category Slugs (e.g. /jharkhand, /bihar, /crime, /sports, /jobs) */}
              <Route path="/:category" element={<CategoryPage />} />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
