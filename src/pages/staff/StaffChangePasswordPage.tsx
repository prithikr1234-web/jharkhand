/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { KeyRound, ShieldAlert, Check, X, Lock } from 'lucide-react';

export const StaffChangePasswordPage: React.FC = () => {
  const { user, changePassword } = useAuth();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Criteria validation
  const hasMinLength = newPassword.length >= 8;
  const hasNumber = /\d/.test(newPassword);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const matches = newPassword && newPassword === confirmPassword;

  // Strength score
  const strength = [hasMinLength, hasNumber, hasSymbol, newPassword.length >= 10].filter(Boolean).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasMinLength || !hasNumber || !hasSymbol) {
      setError('कृपया पासवर्ड सुरक्षा के सभी नियम पूरे करें।');
      return;
    }
    if (!matches) {
      setError('दोनों पासवर्ड मेल नहीं खाते।');
      return;
    }

    setLoading(true);
    try {
      const res = await changePassword(newPassword);
      if (res.success) {
        alert('पासवर्ड सफलतापूर्वक बदल गया है!');
        navigate('/staff', { replace: true });
      } else {
        setError(res.error || 'त्रुटि हुई।');
      }
    } catch (err: any) {
      setError(err.message || 'त्रुटि हुई।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 font-sans text-white">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="font-headline font-black text-xl text-white">
            नया स्थायी पासवर्ड बनाएं
          </h2>
          <p className="text-xs text-zinc-400">
            नमस्ते <strong>{user?.name}</strong>, सुरक्षा कारणों से पहले लॉगिन पर अपना पासवर्ड बदलना अनिवार्य है।
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/70 border border-red-700 rounded-xl text-red-200 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              नया मजबूत पासवर्ड
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="नया पासवर्ड दर्ज करें"
              className="w-full px-3 py-2 text-xs bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-hidden focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Password strength meter */}
          <div className="space-y-1">
            <div className="flex gap-1.5 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className={`h-full flex-1 ${strength >= 1 ? 'bg-red-500' : 'bg-transparent'}`} />
              <div className={`h-full flex-1 ${strength >= 2 ? 'bg-amber-500' : 'bg-transparent'}`} />
              <div className={`h-full flex-1 ${strength >= 3 ? 'bg-emerald-500' : 'bg-transparent'}`} />
              <div className={`h-full flex-1 ${strength >= 4 ? 'bg-emerald-400' : 'bg-transparent'}`} />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>कमजोर</span>
              <span>मध्यम</span>
              <span>मजबूत</span>
            </div>
          </div>

          {/* Rules checklist */}
          <div className="p-3 bg-zinc-950 rounded-xl text-[11px] space-y-1.5 text-zinc-400">
            <div className={`flex items-center gap-2 ${hasMinLength ? 'text-emerald-400 font-semibold' : ''}`}>
              {hasMinLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-zinc-600" />}
              <span>कम से कम 8 वर्ण (8+ characters)</span>
            </div>
            <div className={`flex items-center gap-2 ${hasNumber ? 'text-emerald-400 font-semibold' : ''}`}>
              {hasNumber ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-zinc-600" />}
              <span>कम से कम एक संख्या (0-9)</span>
            </div>
            <div className={`flex items-center gap-2 ${hasSymbol ? 'text-emerald-400 font-semibold' : ''}`}>
              {hasSymbol ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-zinc-600" />}
              <span>कम से कम एक विशेष चिन्ह (!@#$%...)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              नए पासवर्ड की पुष्टि करें
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="पासवर्ड दोबारा दर्ज करें"
              className="w-full px-3 py-2 text-xs bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-hidden focus:ring-2 focus:ring-brand"
            />
            {confirmPassword && !matches && (
              <span className="text-[10px] text-red-400 block mt-1">पासवर्ड मेल नहीं खा रहे हैं</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !matches || strength < 3}
            className="w-full py-2.5 bg-brand hover:bg-brand-dark disabled:bg-zinc-700 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>{loading ? 'सहेजा जा रहा है...' : 'पासवर्ड सुरक्षित करें और आगे बढ़ें'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
