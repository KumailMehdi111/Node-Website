"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { schoolInfoData } from '@/data/schoolInfo';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'General Admissions',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="bg-navy-950 text-white rounded-3xl p-10 lg:p-14 text-center max-w-4xl mx-auto space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-600 text-white text-xs font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Contact Us & Campus Inquiry</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Our administration and admissions team are here to answer your questions and assist with campus visits.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center space-y-3 bg-white">
            <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-900 flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6 text-gold-600" />
            </div>
            <h4 className="font-bold text-base text-navy-900">Phone & Helpline</h4>
            <p className="text-xs text-slate-500">{schoolInfoData.phone}</p>
            <p className="text-[11px] text-rose-600 font-bold">Emergency: {schoolInfoData.emergencyPhone}</p>
          </Card>

          <Card className="p-6 text-center space-y-3 bg-white">
            <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-900 flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6 text-gold-600" />
            </div>
            <h4 className="font-bold text-base text-navy-900">Email Address</h4>
            <p className="text-xs text-slate-500">{schoolInfoData.email}</p>
            <p className="text-[11px] text-slate-400">Admissions & General Desk</p>
          </Card>

          <Card className="p-6 text-center space-y-3 bg-white">
            <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-900 flex items-center justify-center mx-auto">
              <MapPin className="w-6 h-6 text-gold-600" />
            </div>
            <h4 className="font-bold text-base text-navy-900">Campus Location</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{schoolInfoData.address}</p>
          </Card>

          <Card className="p-6 text-center space-y-3 bg-white">
            <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-900 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6 text-gold-600" />
            </div>
            <h4 className="font-bold text-base text-navy-900">Visiting Hours</h4>
            <p className="text-xs text-slate-500">Mon - Fri: 8:00 AM - 4:00 PM</p>
            <p className="text-xs text-slate-500">Sat: 8:30 AM - 1:00 PM</p>
          </Card>
        </div>

        {/* Form & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-navy-900">Send an Official Inquiry</h2>
              <p className="text-slate-500 text-xs mt-1">Please select the destination department for faster routing.</p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-emerald-900 text-xl">Message Sent Successfully!</h3>
                <p className="text-xs text-emerald-700">Thank you, {formData.name}. We have received your inquiry for the {formData.department} department.</p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Select
                    label="Target Department"
                    options={[
                      { value: 'General Admissions', label: 'General Admissions' },
                      { value: 'Academic Counseling', label: 'Academic Counseling' },
                      { value: 'Examination Desk', label: 'Examination Desk' },
                      { value: 'Sports Office', label: 'Sports Office' },
                    ]}
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
                <Input
                  label="Subject"
                  placeholder="e.g. Admission Eligibility Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">Message</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-transparent transition"
                    placeholder="Type your detailed query here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <Button variant="primary" type="submit" className="w-full font-bold flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </Button>
              </form>
            )}
          </div>

          {/* Map Preview */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 bg-white space-y-4">
              <h3 className="text-lg font-bold text-navy-900">Campus Map & Directions</h3>
              <div className="relative h-80 rounded-xl overflow-hidden bg-slate-200 flex items-center justify-center border border-slate-300">
                <div className="text-center p-6 space-y-2">
                  <MapPin className="w-10 h-10 text-gold-600 mx-auto animate-bounce" />
                  <p className="font-bold text-navy-900 text-sm">{schoolInfoData.name}</p>
                  <p className="text-xs text-slate-500">{schoolInfoData.address}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
