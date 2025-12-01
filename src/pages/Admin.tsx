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
import { apiClient } from '@/lib/api';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple client-side auth check: if a token exists, treat as authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
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
