/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { requestStaffPasswordReset } from '../../lib/firebase/authService';
import { Logo } from '../../components/common/Logo';
import { Lock, Mail, Eye, EyeOff, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const StaffLoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(identifier, password);
      if (res.success) {
        if (res.mustChangePassword) {
          navigate('/staff/change-password');
        } else {
          navigate('/staff');
        }
      } else {
        setError(res.error || 'लॉगिन विफल। कृपया क्रेडेंशियल्स की जांच करें।');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch (err: any) {
      setError(err.message || 'सिस्टम त्रुटि।');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;

    setResetLoading(true);
    setResetError('');
    try {
      const res = await requestStaffPasswordReset(resetEmail);
      if (res.success) {
        setResetSent(true);
      } else {
        setResetError(res.error || 'पासवर्ड रीसेट लिंक भेजने में त्रुटि हुई।');
      }
    } catch (err: any) {
      setResetError('अनपेक्षित त्रुटि हुई।');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-zinc-950 font-sans">
      {/* Left 5 Cols: Brand Panel */}
      <div className="lg:col-span-5 bg-gradient-to-br from-brand-dark via-zinc-950 to-black p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-800 text-white relative overflow-hidden">
        {/* Background glow circle */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand/20 rounded-full blur-3xl pointer-events-none" />

        <div>
          <Logo light />
          <div className="mt-8 space-y-2">
            <span className="px-3 py-1 bg-white/10 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              आंतरिक संपादकीय कक्ष
            </span>
            <h1 className="font-headline font-black text-2xl sm:text-3xl text-white leading-tight">
              स्टाफ एवं संवाददाता पोर्टल
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              झारखंड स्वतंत्र खबर की संपादकीय टीम, जिला संवाददाताओं और मीडिया प्रबंधकों के लिए अधिकृत सुरक्षित प्रवेश द्वार।
            </p>
          </div>
        </div>

        {/* Security & Access Guidelines */}
        <div className="my-8 p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2.5 backdrop-blur-xs">
          <p className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>सुरक्षा प्रोटोकॉल एवं दिशानिर्देश:</span>
          </p>
          <ul className="text-[11px] text-zinc-300 space-y-1.5 list-disc pl-4 leading-relaxed">
            <li>केवल अधिकृत स्टाफ सदस्यों को ही इस पोर्टल तक पहुंच की अनुमति है।</li>
            <li>सभी संवेदनशील गतिविधियां और प्रकाशन ऑडिट लॉग में दर्ज किए जाते हैं।</li>
            <li>नए स्टाफ सदस्य एडमिनिस्ट्रेटर द्वारा अधिकृत ईमेल के जरिए आमंत्रित किए जाते हैं।</li>
          </ul>
        </div>

        <div className="text-xs text-zinc-500 flex items-center justify-between">
          <span>सुरक्षित एसएसएल एन्क्रिप्शन (Firebase Zero-Trust)</span>
          <Link to="/" className="text-zinc-400 hover:text-white transition-colors">
            &larr; मुख्य वेबसाइट पर जाएं
          </Link>
        </div>
      </div>

      {/* Right 7 Cols: Login Form */}
      <div className="lg:col-span-7 bg-[#121318] p-6 sm:p-12 lg:p-16 flex items-center justify-center">
        <div className={`w-full max-w-md space-y-6 ${shake ? 'animate-bounce' : ''}`}>
          <div>
            <h2 className="font-headline font-black text-2xl text-white">
              स्टाफ लॉगिन करें
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              अपने अधिकृत ईमेल और पासवर्ड से संपादकीय कक्ष में प्रवेश करें
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                ईमेल पता (Email) *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@swatantrakhabar.in"
                  className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-brand focus:ring-1 focus:ring-brand"
                />
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-zinc-300">
                  पासवर्ड (Password) *
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] text-zinc-400 hover:text-amber-400 cursor-pointer"
                >
                  पासवर्ड भूल गए?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-brand focus:ring-1 focus:ring-brand"
                />
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand hover:bg-brand-dark disabled:bg-zinc-800 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{loading ? 'सत्यापित किया जा रहा है...' : 'संपादकीय कक्ष में प्रवेश करें'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-headline font-bold text-lg text-white">पासवर्ड रीसेट करें</h3>
            {resetSent ? (
              <div className="space-y-3 text-center py-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <p className="text-xs text-zinc-300">
                  पासवर्ड रीसेट लिंक <strong>{resetEmail}</strong> पर भेज दिया गया है। कृपया अपना इनबॉक्स जांचें।
                </p>
                <button
                  onClick={() => {
                    setShowForgotModal(false);
                    setResetSent(false);
                  }}
                  className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl"
                >
                  लॉगिन पर लौटें
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-3">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  अपना पंजीकृत स्टाफ ईमेल दर्ज करें। हम आपको सुरक्षित पासवर्ड रीसेट करने का लिंक भेजेंगे।
                </p>
                {resetError && (
                  <p className="text-xs text-red-400 bg-red-950/40 p-2 rounded-lg border border-red-900">
                    {resetError}
                  </p>
                )}
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="name@swatantrakhabar.in"
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-brand"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
                  >
                    रद्द करें
                  </button>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="px-4 py-1.5 bg-brand hover:bg-brand-dark text-white text-xs font-bold rounded-xl"
                  >
                    {resetLoading ? 'भेज रहे हैं...' : 'रीसेट लिंक भेजें'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
