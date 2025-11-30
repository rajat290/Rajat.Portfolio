import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Briefcase, Code, GraduationCap, Mail, User, TrendingUp, Users } from 'lucide-react';

const Dashboard = () => {
  // Fetch dashboard stats
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
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const statCards = [
    {
      title: 'Projects',
      value: stats?.projects || 0,
      icon: FolderOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Services',
      value: stats?.services || 0,
      icon: Briefcase,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Tech Stack',
      value: stats?.techstack || 0,
      icon: Code,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Experience',
      value: stats?.experience || 0,
      icon: GraduationCap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Contact Messages',
      value: stats?.contact || 0,
      icon: Mail,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'About Sections',
      value: stats?.about || 0,
      icon: User,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your portfolio content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-md ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Portfolio backend integration completed</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Frontend components updated with API integration</p>
                <p className="text-xs text-gray-400">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Admin panel development started</p>
                <p className="text-xs text-gray-400">Just now</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
