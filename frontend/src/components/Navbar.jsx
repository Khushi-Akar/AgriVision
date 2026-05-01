import { Link, useLocation } from "react-router-dom";
import { Leaf, LayoutDashboard, History, Info } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Scanner", path: "/", icon: Leaf },
    { name: "Dashboard", path: "/dashboards", icon: LayoutDashboard },
    { name: "History", path: "/history", icon: History },
    { name: "About", path: "/about", icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="bg-gradient-to-br from-brand-400 to-teal-500 p-2 rounded-xl text-white shadow-lg shadow-brand-500/20">
              <Leaf size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              Agri<span className="text-brand-500">Vision</span>
            </span>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
