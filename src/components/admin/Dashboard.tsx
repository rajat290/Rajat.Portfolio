import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Briefcase, Code, GraduationCap, Mail, User, TrendingUp, Users } from 'lucide-react';

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [projects, services, techstack, experience, contact, about] = await Promise.all([
        apiClient.get('/projects'),
        apiClient.get('/services'),
        apiClient.get('/techstack'),
        apiClient.get('/experience'),
        apiClient.get('/contact'),
        apiClient.get('/about'),
      ]);

      return {
        projects: projects.data.data?.length || 0,
        services: services.data.data?.length || 0,
        techstack: techstack.data.data?.length || 0,
        experience: experience.data.data?.length || 0,
        contact: contact.data.data?.length || 0,
        about: about.data.data?.length || 0,
      };
    },
    staleTime: 5 * 60 * 1000,
  });

  const statCards = [
    {
      title: 'Projects',
      value: stats?.projects || 0,
      icon: FolderOpen,
      accent: 'from-sky-500/20 via-sky-500/5 to-transparent',
    },
    {
      title: 'Services',
      value: stats?.services || 0,
      icon: Briefcase,
      accent: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    },
    {
      title: 'Tech Stack',
      value: stats?.techstack || 0,
      icon: Code,
      accent: 'from-violet-500/20 via-violet-500/5 to-transparent',
    },
    {
      title: 'Experience',
      value: stats?.experience || 0,
      icon: GraduationCap,
      accent: 'from-amber-500/20 via-amber-500/5 to-transparent',
    },
    {
      title: 'Contact Messages',
      value: stats?.contact || 0,
      icon: Mail,
      accent: 'from-rose-500/20 via-rose-500/5 to-transparent',
    },
    {
      title: 'About Sections',
      value: stats?.about || 0,
      icon: User,
      accent: 'from-indigo-500/20 via-indigo-500/5 to-transparent',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
          <div className="absolute inset-0 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            Overview
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Quick snapshot of your portfolio content and recent activity.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs text-slate-500 border border-slate-200 shadow-sm">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          <span>All systems healthy</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="relative overflow-hidden border-slate-200/80 bg-gradient-to-br from-white to-slate-50 shadow-sm"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${stat.accent}`}
              />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                  {stat.title}
                </CardTitle>
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 border border-slate-200 shadow-sm">
                  <Icon className="h-4 w-4 text-slate-600" />
                </div>
              </CardHeader>
              <CardContent className="relative pb-4 pt-1">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-semibold text-slate-900">
                      {stat.value}
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      Total {stat.title.toLowerCase()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Secondary row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)]">
        {/* Activity / notes */}
        <Card className="border-slate-200/80 bg-white/90 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-800">
              Recent activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">
              <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <div className="flex-1 space-y-0.5">
                <p className="text-slate-700">
                  Admin panel connected to live portfolio backend.
                </p>
                <p className="text-[11px] text-slate-500">Today • 2:14 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white px-3 py-2.5">
              <div className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
              <div className="flex-1 space-y-0.5">
                <p className="text-slate-700">
                  Projects, services and tech stack are synced with the website.
                </p>
                <p className="text-[11px] text-slate-500">Yesterday • 6:03 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-dashed border-slate-200 bg-slate-50/70 px-3 py-2.5">
              <div className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500" />
              <div className="flex-1 space-y-0.5">
                <p className="text-slate-700">
                  Use the left navigation to add new projects, update services or
                  refine your about sections.
                </p>
                <p className="text-[11px] text-slate-500">Tip</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* At-a-glance */}
        <Card className="border-slate-200/80 bg-slate-900 text-slate-50 overflow-hidden shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-sm font-medium text-slate-50">
              Portfolio snapshot
              <Users className="h-4 w-4 text-slate-300" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-200">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-800/80 px-3 py-2.5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Content
                </p>
                <p className="mt-1 text-lg font-semibold">
                  {stats?.projects || 0} <span className="text-xs font-normal">projects</span>
                </p>
              </div>
              <div className="rounded-lg bg-slate-800/80 px-3 py-2.5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Services
                </p>
                <p className="mt-1 text-lg font-semibold">
                  {stats?.services || 0} <span className="text-xs font-normal">live</span>
                </p>
              </div>
            </div>
            <div className="rounded-lg bg-slate-800/80 px-3 py-2.5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Inbox
              </p>
              <p className="mt-1 text-sm">
                {stats?.contact || 0} contact messages stored in the database.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
