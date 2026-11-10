import { useState } from 'react';
import {
  LayoutGrid,
  BookOpen,
  FileText,
  Settings,
  Globe,
  LogOut,
  ChevronRight,
  PanelLeftClose
} from 'lucide-react';

const primaryNav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, hasChevron: true },
  { id: 'products', label: 'Product', icon: BookOpen, hasChevron: true },
  { id: 'inventory-report', label: 'Inventory Report', icon: FileText, hasChevron: true },
];

const secondaryNav = [
  { id: 'settings', label: 'Settings', icon: Settings, hasChevron: true },
  { id: 'website-settings', label: 'Website Settings', icon: Globe, hasChevron: true },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <div className="flex h-screen bg-slate-100">
      <aside className="w-64 bg-white text-slate-400 flex flex-col justify-between p-4 border-r border-slate-200 select-none font-sans shrink-0">
        {/* Top Header & Main Navigation */}
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 flex items-center justify-center">
                <div className="w-6 h-6 rotate-45 border-2 border-slate-900 rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-slate-900 rounded-sm" />
                </div>
              </div>
              <span className="font-bold text-slate-800 text-lg tracking-tight">
                Inventory
              </span>
            </div>

            <button className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md">
              <PanelLeftClose className="w-5 h-5 stroke-[1.75]" />
            </button>
          </div>

          {/* Main Navigation List */}
          <nav className="space-y-1">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 stroke-[1.75] ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.hasChevron && (
                    <ChevronRight
                      className={`w-4 h-4 stroke-[1.75] ${
                        isActive ? 'text-white' : 'text-slate-300'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Settings & Logout */}
        <div className="space-y-1">
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 stroke-[1.75] ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.hasChevron && (
                  <ChevronRight
                    className={`w-4 h-4 stroke-[1.75] ${
                      isActive ? 'text-white' : 'text-slate-300'
                    }`}
                  />
                )}
              </button>
            );
          })}

          {/* Logout Link */}
          <button
            onClick={() => console.log('Logout clicked')}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4 stroke-[1.75] text-slate-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
}