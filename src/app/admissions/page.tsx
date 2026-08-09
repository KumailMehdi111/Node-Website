"use client";

import React, { useState } from 'react';
import { CheckCircle2, FileText, Calendar, CreditCard, Send, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Accordion } from '@/components/ui/Accordion';

export default function AdmissionsPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    studentName: '',
    grade: 'Grade 1',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.email || !formData.phone) return;
    setFormSubmitted(true);
  };

  const steps = [
    {
      num: '01',
      title: 'Online Application',
      desc: 'Fill out the prospective student application form online or collect the hardcopy form from the admissions desk.',
    },
    {
      num: '02',
      title: 'Document Verification',
      desc: 'Submit student birth certificate, previous school transcripts, medical record, and passport photos.',
    },
    {
      num: '03',
      title: 'Assessment & Interaction',
      desc: 'Age-appropriate aptitude assessment and informal interaction with the academic counseling panel.',
    },
    {
      num: '04',
      title: 'Fee Payment & Enrolment',
      desc: 'Upon selection, complete fee remittance to finalize enrolment and receive student ID & uniforms.',
    },
  ];

  const faqs = [
    {
      id: 'faq-1',
      title: 'What are the age criteria for Kindergarten and Grade 1 admissions?',
      content: 'For Kindergarten, the child should turn 4 years old by March 31st of the enrolment year. For Grade 1, the child should be 6 years old by March 31st.',
    },
    {
      id: 'faq-2',
      title: 'Are scholarships available for meritorious students?',
      content: 'Yes, Apex Academy offers Merit Scholarships covering up to 50% tuition fees for Grade 9-11 students demonstrating outstanding academic or sporting achievements.',
    },
    {
      id: 'faq-3',
      title: 'Is school transport available for all regions?',
      content: 'We operate a fleet of 25 air-conditioned GPS-tracked buses covering all major city neighborhoods with trained attendants.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Banner */}
        <div className="bg-navy-950 text-white rounded-3xl p-10 lg:p-14 text-center max-w-4xl mx-auto space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-600 text-white text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Session 2026-2027</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Admissions & Enrolment</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Join the Apex Academy community. We welcome prospective students who are curious, ambitious, and eager to excel.
          </p>
        </div>

        {/* Step Process */}
        <div className="space-y-8">
          <h2 className="text-3xl font-extrabold text-navy-900 text-center">4-Step Admission Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <Card key={idx} className="p-6 relative bg-white border-t-4 border-t-gold-500 space-y-3">
                <span className="text-3xl font-extrabold text-navy-900/20 block font-mono">{step.num}</span>
                <h3 className="font-bold text-base text-navy-900">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Fee Structure Table */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-navy-900">Annual Fee Structure (2026–27)</h2>
              <p className="text-slate-500 text-xs mt-1">Transparent fee breakdown with quarterly payment option.</p>
            </div>
            <CreditCard className="w-8 h-8 text-gold-600 hidden sm:block" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-navy-900 text-white text-xs uppercase font-bold">
                  <th className="py-3 px-4">Grade Level</th>
                  <th className="py-3 px-4">Admission Fee (One-Time)</th>
                  <th className="py-3 px-4">Tuition Fee (Quarterly)</th>
                  <th className="py-3 px-4">Lab & Tech Fee (Annual)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold text-navy-900">Primary (Grades 1-5)</td>
                  <td className="py-3 px-4 text-slate-600">$500</td>
                  <td className="py-3 px-4 text-slate-600">$1,200</td>
                  <td className="py-3 px-4 text-slate-600">$300</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold text-navy-900">Middle School (Grades 6-8)</td>
                  <td className="py-3 px-4 text-slate-600">$600</td>
                  <td className="py-3 px-4 text-slate-600">$1,450</td>
                  <td className="py-3 px-4 text-slate-600">$400</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold text-navy-900">Senior High (Grades 9-12)</td>
                  <td className="py-3 px-4 text-slate-600">$750</td>
                  <td className="py-3 px-4 text-slate-600">$1,800</td>
                  <td className="py-3 px-4 text-slate-600">$550</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Admission Inquiry Form & FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inquiry Form */}
          <div className="lg:col-span-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-2xl font-extrabold text-navy-900">Admission Inquiry Form</h3>
              <p className="text-slate-500 text-xs mt-1">Fill in your details and our admission team will contact you within 24 hours.</p>
            </div>

            {formSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-lg">Inquiry Submitted Successfully!</h4>
                <p className="text-xs text-emerald-700">Thank you, {formData.parentName}. Our admission counselor will reach out to {formData.email} shortly.</p>
                <Button variant="outline" size="sm" onClick={() => setFormSubmitted(false)}>
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Parent / Guardian Name"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Student Full Name"
                    placeholder="e.g. Alex Doe"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  />
                  <Select
                    label="Grade Seeking Admission"
                    options={[
                      { value: 'Grade 1', label: 'Grade 1' },
                      { value: 'Grade 6', label: 'Grade 6' },
                      { value: 'Grade 9', label: 'Grade 9' },
                      { value: 'Grade 11', label: 'Grade 11' },
                    ]}
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  />
                </div>
                <Button variant="accent" type="submit" className="w-full font-bold flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  <span>Submit Admission Inquiry</span>
                </Button>
              </form>
            )}
          </div>

          {/* FAQs */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-extrabold text-navy-900">Frequently Asked Questions</h3>
            <Accordion items={faqs} defaultOpenId="faq-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
