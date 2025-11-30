
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import SectionHeading from "./SectionHeading";

// API call to submit contact form
const submitContactForm = async (formData: { name: string; email: string; message: string }) => {
  const response = await apiClient.post('/contact', formData);
  return response.data;
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    },
    onError: (error) => {
      console.error('Failed to submit contact form:', error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Radial gradient glow */}
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_#2A2C3E_0%,_transparent_70%)]"></div>
        
        {/* Light streak */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
          className="absolute bottom-40 -right-20 w-80 h-[500px] bg-indigo-700/20 blur-[80px] rounded-full transform rotate-45"
        ></motion.div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading 
          overlineText="GET IN TOUCH"
          title="Contact Me"
          description="Have a project in mind or want to collaborate? Drop me a message and I'll get back to you as soon as possible."
        />

        <div className="max-w-3xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md"
          >
            {mutation.isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mb-4">
                  <Send size={24} className="text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/70">Thanks for reaching out. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-white/80">
                      Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                        <User size={18} />
                      </span>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-white/80">
                      Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                        <Mail size={18} />
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-white/80">
                    Message
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-white/40">
                      <MessageSquare size={18} />
                    </span>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                      placeholder="How can I help you?"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(155, 135, 245, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    disabled={mutation.isPending}
                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {mutation.isPending ? (
                      <>
                        <span className="text-white font-medium">Sending...</span>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      </>
                    ) : (
                      <>
                        <span className="text-white font-medium">Send Message</span>
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10">
                          <Send size={14} className="text-white" />
                        </div>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
