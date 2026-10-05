import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useTheme } from '../../context/ThemeContext';
import { JHARKHAND_DISTRICTS, BIHAR_DISTRICTS } from '../../api/data/districts';
import { CATEGORIES } from '../../api/data/categories';
import {
  Sun,
  Moon,
  Search,
  BookOpen,
  Menu,
  X,
  MapPin,
  CloudSun,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { isDark, toggleDark, fontSize, setFontSize, selectedDistrict, setSelectedDistrict } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);
  const [megaMenuState, setMegaMenuState] = useState<'jharkhand' | 'bihar' | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const districtRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const formattedHindiDate = 'सोमवार, 5 अक्टूबर 2026';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (districtRef.current && !districtRef.current.contains(e.target as Node)) {
        setDistrictDropdownOpen(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setMegaMenuState(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDistrictDropdownOpen(false);
    setMegaMenuState(null);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-paper dark:bg-zinc-950 border-b border-line dark:border-zinc-800 transition-all shadow-xs">
      {/* 1. Thin Top Bar */}
      <div className={`border-b border-line dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/60 text-xs px-3 sm:px-6 transition-all duration-300 ${
        isScrolled ? 'h-0 py-0 opacity-0 overflow-hidden' : 'py-1.5 opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 sm:gap-4 text-zinc-600 dark:text-zinc-400">
            <span className="font-medium hidden sm:inline">{formattedHindiDate}</span>
            <div className="flex items-center gap-1 font-semibold text-zinc-700 dark:text-zinc-300">
              <CloudSun className="w-4 h-4 text-amber-500" />
              <span>{selectedDistrict.nameHi}: 28°C धूप</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* District dropdown */}
            <div className="relative" ref={districtRef}>
              <button
                onClick={() => setDistrictDropdownOpen(!districtDropdownOpen)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-brand text-zinc-800 dark:text-zinc-200 shadow-2xs transition-colors"
                aria-label="जिला चुनें"
              >
                <MapPin className="w-3.5 h-3.5 text-brand" />
                <span className="truncate max-w-[120px]">{selectedDistrict.nameHi}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {districtDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-72 max-h-96 overflow-y-auto bg-white dark:bg-zinc-900 border border-line dark:border-zinc-700 rounded-xl shadow-xl z-50 p-2 text-xs">
                  <div className="p-2 border-b border-line dark:border-zinc-800 font-bold text-brand">
                    झारखंड के 24 जिले
                  </div>
                  <div className="grid grid-cols-2 gap-1 p-1">
                    {JHARKHAND_DISTRICTS.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          setSelectedDistrict(d);
                          setDistrictDropdownOpen(false);
                        }}
                        className={`text-left px-2 py-1.5 rounded transition-colors ${
                          selectedDistrict.id === d.id
                            ? 'bg-brand text-white font-bold'
                            : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200'
                        }`}
                      >
                        {d.nameHi}
                      </button>
                    ))}
                  </div>

                  <div className="p-2 border-b border-line dark:border-zinc-800 font-bold text-amber-700 dark:text-amber-500 mt-2">
                    बिहार के प्रमुख जिले
                  </div>
                  <div className="grid grid-cols-2 gap-1 p-1">
                    {BIHAR_DISTRICTS.slice(0, 16).map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          setSelectedDistrict(d);
                          setDistrictDropdownOpen(false);
                        }}
                        className={`text-left px-2 py-1.5 rounded transition-colors ${
                          selectedDistrict.id === d.id
                            ? 'bg-amber-600 text-white font-bold'
                            : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200'
                        }`}
                      >
                        {d.nameHi}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Font size control A- A A+ */}
            <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded overflow-hidden bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-1.5 py-0.5 text-[11px] font-bold hover:bg-zinc-100 dark:hover:bg-zinc-700 ${fontSize === 'sm' ? 'bg-brand text-white' : ''}`}
                title="छोटा अक्षर"
              >
                A−
              </button>
              <button
                onClick={() => setFontSize('md')}
                className={`px-1.5 py-0.5 text-xs font-bold border-x border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 ${fontSize === 'md' ? 'bg-brand text-white' : ''}`}
                title="सामान्य अक्षर"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-1.5 py-0.5 text-xs font-black hover:bg-zinc-100 dark:hover:bg-zinc-700 ${fontSize === 'lg' ? 'bg-brand text-white' : ''}`}
                title="बड़ा अक्षर"
              >
                A+
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDark}
              className="p-1 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              title={isDark ? 'लाइट मोड चालू करें' : 'डार्क मोड चालू करें'}
              aria-label="डार्क मोड"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="मेनू खोलें"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Logo compact={isScrolled} />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="खबरें खोजें..."
              className="w-48 lg:w-64 pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full focus:outline-hidden focus:ring-1 focus:ring-brand text-zinc-900 dark:text-zinc-100"
            />
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5" />
          </form>

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="खोजें"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            to="/epaper"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand hover:bg-brand-dark text-white rounded-lg text-xs font-bold tracking-wide shadow-xs transition-colors"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>ई-पेपर</span>
          </Link>
        </div>
      </div>

      {/* Mobile search bar dropdown */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 border-b border-line dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="खबर, जिला, या विषय खोजें..."
                className="w-full pl-8 pr-3 py-2 text-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-brand"
                autoFocus
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-2.5 top-3" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-brand text-white text-xs font-bold rounded-lg"
            >
              खोजें
            </button>
          </form>
        </div>
      )}

      {/* 3. Category Navigation Bar (Sticky with Mega Menu) */}
      <nav className="relative border-t border-line dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs" ref={megaMenuRef}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center overflow-x-auto no-scrollbar scroll-smooth space-x-1 sm:space-x-2 py-1 text-sm font-semibold whitespace-nowrap">
            {CATEGORIES.map((cat) => {
              const to = cat.slug ? `/${cat.slug}` : '/';
              const isActive = location.pathname === to;
              const isJharkhand = cat.id === 'jharkhand';
              const isBihar = cat.id === 'bihar';

              return (
                <div key={cat.id} className="relative group">
                  <div className="flex items-center">
                    <Link
                      to={to}
                      className={`px-3 py-2 rounded-md transition-colors relative flex items-center gap-1 ${
                        isActive
                          ? 'text-brand font-bold'
                          : 'text-zinc-700 dark:text-zinc-300 hover:text-brand dark:hover:text-amber-400'
                      }`}
                    >
                      {cat.nameHi}
                      {isActive && (
                        <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand rounded-full" />
                      )}
                    </Link>

                    {(isJharkhand || isBihar) && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setMegaMenuState(megaMenuState === cat.id ? null : (cat.id as 'jharkhand' | 'bihar'));
                        }}
                        className="hidden lg:flex p-1 text-zinc-400 hover:text-brand"
                        title={`${cat.nameHi} के जिले देखें`}
                        aria-label={`${cat.nameHi} के जिले`}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Mega-Menu for Jharkhand / Bihar */}
        {megaMenuState && (
          <div className="hidden lg:block absolute left-0 right-0 top-full bg-white dark:bg-zinc-900 border-b border-line dark:border-zinc-700 shadow-2xl z-50 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-line dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-brand" />
                  <h3 className="font-headline font-bold text-lg text-zinc-900 dark:text-zinc-100">
                    {megaMenuState === 'jharkhand' ? 'झारखंड के सभी 24 जिले' : 'बिहार के सभी 38 जिले'}
                  </h3>
                  <span className="text-xs text-muted">जिलावार विशेष खबरें और ताजा अपडेट</span>
                </div>
                <button
                  onClick={() => setMegaMenuState(null)}
                  className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {(megaMenuState === 'jharkhand' ? JHARKHAND_DISTRICTS : BIHAR_DISTRICTS).map((d) => (
                  <Link
                    key={d.id}
                    to={`/district/${d.id}`}
                    onClick={() => {
                      setSelectedDistrict(d);
                      setMegaMenuState(null);
                    }}
                    className="p-2 text-xs rounded hover:bg-brand/10 hover:text-brand dark:hover:bg-zinc-800 font-medium text-zinc-700 dark:text-zinc-300 transition-colors flex items-center justify-between"
                  >
                    <span>{d.nameHi}</span>
                    <ChevronRight className="w-3 h-3 text-zinc-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white dark:bg-zinc-900 h-full overflow-y-auto p-4 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-line dark:border-zinc-800">
                <Logo compact />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <span className="text-xs text-muted block mb-1">वर्तमान चयनित जिला:</span>
                <div className="font-bold text-brand flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedDistrict.nameHi} ({selectedDistrict.state === 'jharkhand' ? 'झारखंड' : 'बिहार'})</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-2 py-1">
                  खबरों के विभाग
                </p>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={cat.slug ? `/${cat.slug}` : '/'}
                    className="block px-3 py-2 text-sm font-semibold rounded-lg text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    {cat.nameHi}
                  </Link>
                ))}
              </div>

              <div className="space-y-1 pt-2 border-t border-line dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
                <Link to="/about" className="block px-3 py-1.5 hover:text-brand">हमारे बारे में</Link>
                <Link to="/contact" className="block px-3 py-1.5 hover:text-brand">संपर्क करें</Link>
                <Link to="/citizen-reporter" className="block px-3 py-1.5 text-brand font-semibold hover:underline">
                  अपनी खबर भेजें (नागरिक पत्रकार)
                </Link>
                <Link to="/grievance-officer" className="block px-3 py-1.5 hover:text-brand">शिकायत निवारण अधिकारी</Link>
              </div>
            </div>

            <div className="pt-4 border-t border-line dark:border-zinc-800">
              <Link
                to="/staff/login"
                className="text-xs text-zinc-400 hover:text-brand text-center block"
              >
                स्टाफ लॉगिन (Staff Portal)
              </Link>
            </div>
          </div>

          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
