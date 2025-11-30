import { useState } from 'react';
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
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For demo purposes

  // For demo purposes, we'll assume authentication is handled elsewhere
  // In production, this would check JWT tokens, etc.

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
