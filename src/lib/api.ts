interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface PaginatedData<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

import { API_V1 } from './config';

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const isServer = typeof window === 'undefined';
  const baseUrl = isServer ? API_V1 : '/api/v1';
  const url = `${baseUrl}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const json: ApiResponse<T> = await res.json();
  if (!json.success) {
    throw new Error(json.message || 'API request failed');
  }

  return json.data;
}

// --- Raw API response types (match Prisma schema) ---

export interface RawAnnouncement {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  content: string;
  featuredImage: string | null;
  publicationDate: string | null;
  status: string;
  author: string | null;
  featuredFlag: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RawEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  startTime: string | null;
  endTime: string | null;
  location: string | null;
  image: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface RawDepartment {
  id: string;
  name: string;
  slug: string;
}

export interface RawStaff {
  id: string;
  name: string;
  slug: string;
  photo: string | null;
  designation: string;
  departmentId: string;
  department: RawDepartment;
  subject: string | null;
  qualification: string | null;
  experience: string | null;
  bio: string | null;
  displayOrder: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface RawGalleryCategory {
  id: string;
  name: string;
  slug: string;
}

export interface RawGalleryImage {
  id: string;
  caption: string | null;
  fileUrl: string;
  categoryId: string;
  category: RawGalleryCategory;
  status: string;
  displayOrder: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface RawDownload {
  id: string;
  title: string;
  category: string | null;
  class: string | null;
  year: string | null;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface RawSport {
  id: string;
  name: string;
  description: string | null;
  category: string;
  coach: string | null;
  image: string | null;
  events: Array<{ id: string; title: string; date: string }>;
  results: Array<{ id: string; competition: string; position: string; participant: string; year: string; achievement: string | null; image: string | null }>;
  createdAt: string;
  updatedAt: string;
}

export interface RawActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string | null;
  date: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface RawSchoolInformation {
  id: string;
  name: string;
  logoUrl: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  timings: string | null;
  aboutText: string | null;
  vision: string | null;
  mission: string | null;
  principalMsg: string | null;
  principalName: string | null;
  principalTitle: string | null;
  principalPhoto: string | null;
}

export interface RawWebsiteSetting {
  id: string;
  schoolLogoUrl: string | null;
  faviconUrl: string | null;
  schoolName: string | null;
  primaryContact: string | null;
  email: string | null;
  address: string | null;
  whatsappNumber: string | null;
  googleMapsUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  footerText: string | null;
  statsStudents: string | null;
  statsTeachers: string | null;
  statsPassRate: string | null;
  statsCampus: string | null;
  statsClubs: string | null;
  heroImageUrl: string | null;
  heroCampusHighlight: string | null;
}

export interface RawSocialLink {
  id: string;
  platform: string;
  url: string;
  isActive: boolean;
  displayOrder: number;
}

export interface RawFeeStructure {
  id: string;
  className: string;
  admissionFee: number;
  monthlyFee: number;
  annualFee: number;
  otherCharges: number | null;
  effectiveYear: string;
  status: string;
}

export interface RawAdmissionNotice {
  id: string;
  title: string;
  content: string;
  status: string;
}

// --- API Fetchers ---

export async function fetchAnnouncements(): Promise<RawAnnouncement[]> {
  const data = await apiFetch<PaginatedData<RawAnnouncement>>('/public/announcements?limit=50');
  return data.data;
}

export async function fetchAnnouncementBySlug(slug: string): Promise<RawAnnouncement> {
  const data = await apiFetch<{ data: RawAnnouncement }>(`/public/announcements/${slug}`);
  return data.data;
}

export async function fetchEvents(): Promise<RawEvent[]> {
  const data = await apiFetch<{ data: RawEvent[] }>('/public/events');
  return data.data;
}

export async function fetchEventBySlug(slug: string): Promise<RawEvent> {
  const data = await apiFetch<{ data: RawEvent }>(`/public/events/${slug}`);
  return data.data;
}

export async function fetchStaff(): Promise<RawStaff[]> {
  const data = await apiFetch<{ data: RawStaff[] }>('/public/staff');
  return data.data;
}

export async function fetchStaffBySlug(slug: string): Promise<RawStaff> {
  const data = await apiFetch<{ data: RawStaff }>(`/public/staff/${slug}`);
  return data.data;
}

export async function fetchGallery(): Promise<RawGalleryImage[]> {
  const data = await apiFetch<{ data: RawGalleryImage[] }>('/public/gallery');
  return data.data;
}

export async function fetchDownloads(): Promise<RawDownload[]> {
  const data = await apiFetch<{ data: RawDownload[] }>('/public/downloads');
  return data.data;
}

export async function fetchSports(): Promise<RawSport[]> {
  const data = await apiFetch<{ data: RawSport[] }>('/public/sports');
  return data.data;
}

export async function fetchActivities(): Promise<RawActivity[]> {
  const data = await apiFetch<{ data: RawActivity[] }>('/public/activities');
  return data.data;
}

export async function fetchSettings(): Promise<{
  schoolInformation: RawSchoolInformation | null;
  websiteSettings: RawWebsiteSetting | null;
  socialLinks: RawSocialLink[];
}> {
  return apiFetch('/public/settings');
}

export async function fetchAdmissions(): Promise<{
  notices: RawAdmissionNotice[];
  feeStructure: RawFeeStructure[];
}> {
  return apiFetch('/public/admissions');
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<void> {
  await apiFetch('/public/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function submitInquiry(data: {
  parentName: string;
  email: string;
  phone?: string;
  studentName: string;
  grade: string;
  message?: string;
}): Promise<void> {
  await apiFetch('/public/admissions/inquiry', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
