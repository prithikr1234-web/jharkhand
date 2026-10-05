import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { JHARKHAND_DISTRICTS } from '../../api/data/districts';
import { CATEGORIES } from '../../api/data/categories';
import { AdSlot } from './AdSlot';
import {
  Facebook,
  Twitter,
  Youtube,
  Send,
  MessageCircle,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800 pt-10 pb-6 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AdSlot slot="leaderboard_728x90" className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-zinc-800">
          <div className="lg:col-span-2 space-y-4">
            <Logo light />
            <p className="text-xs text-zinc-400 leading-relaxed pr-4">
              <strong>झारखंड स्वतंत्र खबर</strong> झारखंड और बिहार का प्रमुख निष्पक्ष एवं जन-सरोकारों को समर्पित स्वतंत्र डिजिटल समाचार पत्र है। हमारा संकल्प है सच के साथ और आपके साथ हर परिस्थिति में निष्पक्षता से खड़े रहना।
            </p>
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand" />
                <span>प्रेस एनक्लेव, मेन रोड, राँची, झारखंड - 834001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand" />
                <span>+91 651 2233445 / 2233446</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand" />
                <span>contact@swatantrakhabar.in</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors"
                title="व्हाट्सएप चैनल"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                title="फेसबुक"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 hover:bg-sky-500 hover:text-white flex items-center justify-center transition-colors"
                title="ट्विटर (X)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
                title="यूट्यूब"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors"
                title="टेलीग्राम"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold text-sm text-white mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-brand" />
              प्रमुख विभाग
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={cat.slug ? `/${cat.slug}` : '/'}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {cat.nameHi}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-sm text-white mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-brand" />
              झारखंड के जिले
            </h4>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {JHARKHAND_DISTRICTS.slice(0, 12).map((d) => (
                <Link
                  key={d.id}
                  to={`/district/${d.id}`}
                  className="hover:text-amber-400 transition-colors truncate"
                >
                  {d.nameHi}
                </Link>
              ))}
            </div>
            <Link
              to="/jharkhand"
              className="text-xs text-brand hover:underline inline-block mt-2 font-medium"
            >
              सभी 24 जिले देखें &rarr;
            </Link>
          </div>

          <div>
            <h4 className="font-headline font-bold text-sm text-white mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-brand" />
              नीति एवं सूचना
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">
                  हमारे बारे में (About Us)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors">
                  संपर्क करें (Contact Us)
                </Link>
              </li>
              <li>
                <Link to="/citizen-reporter" className="text-amber-400 font-semibold hover:underline">
                  अपनी खबर भेजें (Citizen Reporter)
                </Link>
              </li>
              <li>
                <Link to="/grievance-officer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>शिकायत अधिकारी (Grievance)</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-amber-400 transition-colors">
                  गोपनीयता नीति (Privacy Policy)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-amber-400 transition-colors">
                  नियम और शर्तें (Terms of Use)
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-amber-400 transition-colors">
                  अस्वीकरण (Disclaimer)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
          <p>© 2026 झारखंड स्वतंत्र खबर (Jharkhand Swatantra Khabar). सर्वाधिकार सुरक्षित।</p>
          <div className="flex items-center gap-4">
            <span className="text-zinc-600">पंजीकृत डिजिटल समाचार माध्यम</span>
            <Link
              to="/staff/login"
              className="text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              स्टाफ लॉगिन
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
