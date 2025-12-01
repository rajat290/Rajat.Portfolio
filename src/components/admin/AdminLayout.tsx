import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  LayoutDashboard,
  FolderOpen,
  Briefcase,
  Code,
  GraduationCap,
  Mail,
  User,
  LogOut,
  Settings,
} from 'lucide-react';
import { toast } from 'sonner';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
    { name: 'Services', href: '/admin/services', icon: Briefcase },
    { name: 'Tech Stack', href: '/admin/techstack', icon: Code },
    { name: 'Experience', href: '/admin/experience', icon: GraduationCap },
    { name: 'Contact', href: '/admin/contact', icon: Mail },
    { name: 'About', href: '/admin/about', icon: User },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminToken');

    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-slate-950 text-slate-100">
      {/* Logo / brand */}
      <div className="flex h-16 shrink-0 items-center px-5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-500 via-purple-500 to-sky-500 flex items-center justify-center shadow-lg">
            <span className="text-xs font-semibold tracking-wide">RP</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Rajat Admin</span>
            <span className="text-[11px] text-slate-400">Portfolio Control</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'bg-slate-900 text-slate-50 shadow-sm'
                  : 'text-slate-300 hover:bg-slate-900/60 hover:text-slate-50'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-md border text-xs ${
                  active
                    ? 'border-violet-500/60 bg-violet-500/10 text-violet-300'
                    : 'border-slate-700 bg-slate-900/60 text-slate-400 group-hover:border-violet-500/40 group-hover:text-violet-300'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-slate-800 px-3 py-3 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-slate-200 hover:bg-slate-900 hover:text-slate-50"
          onClick={() => navigate('/')}
        >
          <Settings className="h-4 w-4" />
          <span className="text-xs">Back to website</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-rose-300 hover:bg-rose-950/60 hover:text-rose-100"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span className="text-xs">Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex bg-slate-100">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <SidebarContent />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-slate-950 text-slate-100 border-r border-slate-800">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-col flex-1 lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center border-b border-slate-200 bg-slate-50/80 backdrop-blur">
          <div className="flex flex-1 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="mr-1 h-9 w-9 border-slate-300 text-slate-600 hover:bg-slate-100 lg:hidden"
                  >
                    <span className="sr-only">Open navigation</span>
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-[0.18em]">
                  Admin Panel
                </span>
                <span className="text-sm text-slate-700">
                  Manage your portfolio content
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center rounded-full bg-white/80 border border-slate-200 px-3 py-1.5 shadow-sm">
                <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-600">Live</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/80 border border-slate-200 px-2 py-1 shadow-sm">
                <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-violet-500 to-sky-500 flex items-center justify-center text-[11px] font-semibold text-white">
                  R
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-slate-700">Rajat</p>
                  <p className="text-[11px] text-slate-500">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-5 sm:py-6">
            <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
