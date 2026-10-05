'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    status: 'Student', // Dropdown: Student/Employee
    phone: '',
    orgName: '',
    roleOrJob: '',
    specialization: '', // student only
    collegeName: '', // student only
    passOutYear: '', // student only
    city: '',
    state: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const eventInfo = {
    name: 'Potential Applications of AI in Mining Geotechnics and its Limitations',
    date: 'FRIDAY, APRIL 24th, 2026 • 6:00 PM — 7:00 PM IST',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          eventName: eventInfo.name,
          eventDate: eventInfo.date,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          onClose();
        }, 2000);
      } else {
        alert('Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-[#0A1128] border border-blue-500/30 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden text-white mt-16 md:mt-20"
        >
          {/* Header */}
          <div className="relative p-5 border-b border-blue-500/20 bg-gradient-to-r from-blue-900/40 to-transparent">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X size={18} />
            </button>
            
            <div className="text-center space-y-1">
              <h2 className="text-lg md:text-xl font-black text-[#3b82f6] leading-tight uppercase tracking-tight">
                {eventInfo.name}
              </h2>
              <div className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <p className="text-blue-300 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">{eventInfo.date}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
            {submitSuccess ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-500 mb-6">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-emerald-400">SUCCESSFULLY REGISTERED!</h3>
                <p className="text-blue-200 text-lg">We&apos;ve reserved your spot. See you at the session.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Section 1: Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white">Full Name</label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white">E-mail address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white">I AM A...</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="Student" className="bg-[#0A1128]">Student</option>
                      <option value="Employee" className="bg-[#0A1128]">Employee</option>
                    </select>
                  </div>
                </div>

                {/* Section 2: Contact & Location */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white">Phone Number</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white">City</label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Current city"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white">State</label>
                    <input
                      required
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Current state"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/50"
                    />
                  </div>
                </div>

                {/* Section 3: Professional/Academic Details */}
                <AnimatePresence mode="wait">
                  {formData.status === 'Employee' ? (
                    <motion.div 
                      key="employee-fields"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white">Organization Name</label>
                        <input
                          required
                          type="text"
                          name="orgName"
                          value={formData.orgName}
                          onChange={handleChange}
                          placeholder="e.g. Acme Corp"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white">Role / Designation</label>
                        <input
                          required
                          type="text"
                          name="roleOrJob"
                          value={formData.roleOrJob}
                          onChange={handleChange}
                          placeholder="e.g. Geotechnical Engineer"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/50"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="student-fields"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white">College / University</label>
                        <input
                          required
                          type="text"
                          name="collegeName"
                          value={formData.collegeName}
                          onChange={handleChange}
                          placeholder="Your institution"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white">Specialization</label>
                        <input
                          required
                          type="text"
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleChange}
                          placeholder="e.g. Mining Engineering"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white">Pass out year</label>
                        <input
                          required
                          type="text"
                          name="passOutYear"
                          value={formData.passOutYear}
                          onChange={handleChange}
                          placeholder="e.g. 2026"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/50"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative px-12 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full font-black text-sm tracking-[0.2em] uppercase shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {isSubmitting ? 'Processing...' : 'Complete Registration'}
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EventForm;
