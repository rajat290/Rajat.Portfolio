import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import Dashboard from '@/components/admin/Dashboard';
import ProjectsAdmin from '@/components/admin/ProjectsAdmin';
import ServicesAdmin from '@/components/admin/ServicesAdmin';
import TechStackAdmin from '@/components/admin/TechStackAdmin';
import ExperienceAdmin from '@/components/admin/ExperienceAdmin';
import ContactAdmin from '@/components/admin/ContactAdmin';
import AboutAdmin from '@/components/admin/AboutAdmin';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated by verifying token
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('adminToken');
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        localStorage.removeItem('adminToken');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectsAdmin />} />
        <Route path="/services" element={<ServicesAdmin />} />
        <Route path="/techstack" element={<TechStackAdmin />} />
        <Route path="/experience" element={<ExperienceAdmin />} />
        <Route path="/contact" element={<ContactAdmin />} />
        <Route path="/about" element={<AboutAdmin />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
