import { Announcement, EventItem, StaffMember, GalleryImage, DownloadResource, Sport, Activity, SchoolInfo } from '@/types';
import type { RawAnnouncement, RawEvent, RawStaff, RawGalleryImage, RawDownload, RawSport, RawActivity, RawSchoolInformation, RawWebsiteSetting } from './api';
import { API_BASE_URL } from './config';

export function mapAnnouncement(raw: RawAnnouncement): Announcement {
  const excerpt = raw.content.length > 200 ? raw.content.substring(0, 200) + '...' : raw.content;
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    category: (raw.category as Announcement['category']) || 'General',
    date: raw.publicationDate || raw.createdAt,
    excerpt,
    content: raw.content,
    image: raw.featuredImage || undefined,
    isImportant: raw.featuredFlag || undefined,
  };
}

export function mapEvent(raw: RawEvent): EventItem {
  const desc = raw.description || '';
  const excerpt = desc.length > 200 ? desc.substring(0, 200) + '...' : desc;
  const time = raw.startTime && raw.endTime
    ? `${raw.startTime} - ${raw.endTime}`
    : raw.startTime || 'TBD';
  const fallbackImage = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80';
  const image = raw.image && (raw.image.startsWith('http') || raw.image.startsWith('/uploads/'))
    ? (raw.image.startsWith('/uploads/') ? `${API_BASE_URL}${raw.image}` : raw.image)
    : fallbackImage;
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    category: 'Academic',
    startDate: raw.date,
    time,
    location: raw.location || 'TBD',
    excerpt,
    description: desc,
    image,
  };
}

export function mapStaff(raw: RawStaff): StaffMember {
  const isLeadership = raw.designation.toLowerCase().includes('principal') ||
    raw.designation.toLowerCase().includes('director');
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    role: raw.designation,
    department: (raw.department?.name as StaffMember['department']) || 'Administration',
    qualification: raw.qualification || '',
    experience: raw.experience || '',
    bio: raw.bio || '',
    email: `${raw.name.toLowerCase().replace(/[^a-z]/g, '').substring(0, 8)}@apexacademy.edu`,
    photo: raw.photo
      ? (raw.photo.startsWith('/uploads/') ? `${API_BASE_URL}${raw.photo}` : raw.photo)
      : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    isLeadership,
  };
}

export function mapGalleryImage(raw: RawGalleryImage): GalleryImage {
  const fileUrl = raw.fileUrl && raw.fileUrl.startsWith('/uploads/')
    ? `${API_BASE_URL}${raw.fileUrl}`
    : raw.fileUrl;
  return {
    id: raw.id,
    title: raw.caption || 'Untitled',
    category: (raw.category?.name as GalleryImage['category']) || 'Campus',
    imageUrl: fileUrl,
    date: raw.createdAt,
  };
}

export function mapDownload(raw: RawDownload): DownloadResource {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  return {
    id: raw.id,
    title: raw.title,
    category: (raw.category as DownloadResource['category']) || 'Forms',
    fileSize: formatFileSize(raw.fileSize),
    fileFormat: (raw.fileType as DownloadResource['fileFormat']) || 'PDF',
    downloadUrl: raw.fileUrl,
    uploadDate: raw.createdAt,
    targetAudience: 'Students',
  };
}

export function mapSport(raw: RawSport): Sport {
  const resultsArray = Array.isArray(raw.results) ? raw.results : [];
  const fallback = 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80';
  const image = raw.image
    ? (raw.image.startsWith('/uploads/') ? `${API_BASE_URL}${raw.image}` : raw.image)
    : fallback;
  return {
    id: raw.id,
    name: raw.name,
    category: (raw.category as Sport['category']) || 'Outdoor',
    coach: raw.coach || 'TBD',
    achievements: resultsArray.length > 0
      ? resultsArray.map((r: any) => `${r.competition} - ${r.position}`)
      : ['No recorded achievements yet'],
    description: raw.description || '',
    image,
  };
}

export function mapActivity(raw: RawActivity): Activity {
  const fallback = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80';
  const image = raw.image
    ? (raw.image.startsWith('/uploads/') ? `${API_BASE_URL}${raw.image}` : raw.image)
    : fallback;
  return {
    id: raw.id,
    name: raw.title,
    category: (raw.category as Activity['category']) || 'Club',
    mentor: 'Faculty Advisor',
    description: raw.description,
    meetingSchedule: 'Check with administration',
    image,
  };
}

export function mapSchoolInfo(school: RawSchoolInformation | null, website: RawWebsiteSetting | null): SchoolInfo {
  return {
    name: school?.name || website?.schoolName || 'Apex Academy International',
    tagline: 'Inspiring Excellence, Nurturing Character, Empowering Tomorrow',
    established: 1994,
    accreditation: 'CBSE & International Baccalaureate (IB) Candidate School',
    phone: school?.phone || website?.primaryContact || '+1 (555) 234-5678',
    emergencyPhone: '+1 (555) 987-6543',
    email: school?.email || website?.email || 'info@apexacademy.edu',
    address: school?.address || website?.address || '100 Academy Heights Parkway, Education Valley, CA 90210',
    timings: school?.timings || '',
    principalName: school?.principalName || 'Dr. Eleanor Vance',
    principalTitle: school?.principalTitle || 'Principal & Academic Director (Ph.D. Education, Oxford)',
    principalMessage: school?.principalMsg || 'At Apex Academy, we believe that education is not merely the accumulation of knowledge, but the awakening of creative passion, critical inquiry, and compassionate leadership.',
    principalPhoto: school?.principalPhoto || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    aboutText: school?.aboutText || '',
    vision: school?.vision || '',
    mission: school?.mission || '',
    heroImageUrl: website?.heroImageUrl || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80',
    heroCampusHighlight: website?.heroCampusHighlight || '45-Acre Smart Academic & Athletic Campus',
    stats: {
      students: website?.statsStudents || '1850',
      teachers: website?.statsTeachers || '140',
      passRate: website?.statsPassRate || '99.4%',
      campusAcres: website?.statsCampus || '45 Acres',
      clubsCount: website?.statsClubs || '32',
    },
  };
}
