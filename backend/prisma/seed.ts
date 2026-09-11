import 'dotenv/config';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || 'file:./prisma/dev.db',
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Create Super Admin
  const passwordHash = await argon2.hash('admin123');
  const superAdmin = await prisma.user.upsert({
    where: { email: 'kumail@school.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'kumail@school.com',
      passwordHash,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
    },
  });
  console.log(`Created Super Admin: ${superAdmin.email}`);

  // Website Settings
  await prisma.websiteSetting.upsert({
    where: { id: 'default-settings' },
    update: {},
    create: {
      id: 'default-settings',
      schoolName: 'Apex Academy International',
      email: 'info@apexacademy.edu',
      address: '100 Academy Heights Parkway, Education Valley, CA 90210',
      primaryContact: '+1 (555) 234-5678',
      footerText: 'Inspiring Excellence, Nurturing Character, Empowering Tomorrow',
      seoTitle: 'Apex Academy International - Premier CBSE & IB School',
      seoDescription: 'Apex Academy International is a premier international school offering CBSE & IB curriculum.',
      statsStudents: '1850',
      statsTeachers: '140',
      statsPassRate: '99.4%',
      statsCampus: '45 Acres',
      statsClubs: '32',
      heroImageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80',
      heroCampusHighlight: '45-Acre Smart Academic & Athletic Campus',
    },
  });
  console.log('Created website settings');

  // School Information
  await prisma.schoolInformation.upsert({
    where: { id: 'default-school-info' },
    update: {},
    create: {
      id: 'school-info',
      name: 'Apex Academy International',
      address: '100 Academy Heights Parkway, Education Valley, CA 90210',
      phone: '+1 (555) 234-5678',
      email: 'info@apexacademy.edu',
      timings: 'Mon–Sat: 7:30 AM – 3:30 PM',
      aboutText: 'Apex Academy International is a premier institution committed to academic excellence and holistic development.',
      vision: 'To be a world-class educational institution that nurtures global leaders through innovative teaching and inclusive learning.',
      mission: 'To provide quality education that empowers students with knowledge, skills, and values to excel in a rapidly changing world.',
      principalMsg: 'At Apex Academy, we believe that education is not merely the accumulation of knowledge, but the awakening of creative passion, critical inquiry, and compassionate leadership. For over 30 years, our vibrant campus has been a haven where young minds blossom into confident global citizens.',
      principalName: 'Dr. Eleanor Vance',
      principalTitle: 'Principal & Academic Director (Ph.D. Education, Oxford)',
      principalPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    },
  });
  console.log('Created school information');

  // Departments
  const departments = [
    { name: 'Leadership', slug: 'leadership' },
    { name: 'Sciences', slug: 'sciences' },
    { name: 'Humanities', slug: 'humanities' },
    { name: 'Mathematics', slug: 'mathematics' },
    { name: 'Languages', slug: 'languages' },
    { name: 'Sports', slug: 'sports' },
    { name: 'Arts & Music', slug: 'arts-music' },
    { name: 'Administration', slug: 'administration' },
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { slug: dept.slug },
      update: {},
      create: dept,
    });
  }
  console.log('Created departments');

  // Staff
  const staffMembers = [
    {
      name: 'Dr. Eleanor Vance', slug: 'dr-eleanor-vance', designation: 'Principal & Academic Director',
      departmentSlug: 'leadership', qualification: 'Ph.D. Educational Leadership (Oxford), M.A. Literature (Harvard)',
      experience: '24 Years', bio: 'Dr. Vance has spearheaded global educational initiatives across UK and US institutions for over two decades. She champions inquiry-based learning and character ethics.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', displayOrder: 1,
    },
    {
      name: 'Prof. Marcus Sterling', slug: 'prof-marcus-sterling', designation: 'Vice Principal & Head of STEM',
      departmentSlug: 'leadership', qualification: 'M.S. Applied Physics (MIT), B.S. Engineering (Caltech)',
      experience: '18 Years', bio: 'Prof. Sterling leads our state-of-the-art STEM center, robotics research team, and AP Physics curriculum.',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80', displayOrder: 2,
    },
    {
      name: 'Dr. Aris Thorne', slug: 'dr-aris-thorne', designation: 'Head of Mathematics Department',
      departmentSlug: 'mathematics', qualification: 'Ph.D. Mathematics (Stanford University)',
      experience: '15 Years', bio: 'Dr. Thorne specializes in Olympiad Mathematics and Calculus, guiding students to top national math competition ranks.',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', displayOrder: 3,
    },
    {
      name: 'Sarah Jenkins', slug: 'sarah-jenkins', designation: 'Senior Faculty - Computer Science & AI',
      departmentSlug: 'sciences', qualification: 'M.S. Computer Science (UC Berkeley)',
      experience: '11 Years', bio: 'Former software engineer at Google, Sarah teaches Python, Web Development, and Machine Learning concepts to high school seniors.',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80', displayOrder: 4,
    },
    {
      name: 'David Rossi', slug: 'david-rossi', designation: 'Director of Athletics & Sports',
      departmentSlug: 'sports', qualification: 'M.P.E. Physical Education (UCLA), Former National Athlete',
      experience: '16 Years', bio: 'Coach Rossi manages our 12 inter-school varsity athletic teams, strength training programs, and annual sports events.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', displayOrder: 5,
    },
    {
      name: 'Elena Rostova', slug: 'elena-rostova', designation: 'Head of Performing Arts & Music',
      departmentSlug: 'arts-music', qualification: 'Master of Music (Juilliard School, New York)',
      experience: '14 Years', bio: 'Concert pianist and orchestra director, Elena fosters artistic expression through school musicals, symphony bands, and choir.',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80', displayOrder: 6,
    },
    {
      name: 'Robert Chen', slug: 'robert-chen', designation: 'Head of Humanities & Social Sciences',
      departmentSlug: 'humanities', qualification: 'M.A. World History (Columbia University)',
      experience: '19 Years', bio: 'Robert inspires critical thinking in World History, AP Macroeconomics, and International Relations.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80', displayOrder: 7,
    },
    {
      name: 'Maria Santos', slug: 'maria-santos', designation: 'Senior Counselor & Student Wellness Lead',
      departmentSlug: 'administration', qualification: 'M.S. Child Psychology (Northwestern University)',
      experience: '12 Years', bio: 'Dedicated to emotional well-being, university counseling, and supporting students in achieving balance.',
      photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80', displayOrder: 8,
    },
  ];

  for (const s of staffMembers) {
    const dept = await prisma.department.findUnique({ where: { slug: s.departmentSlug } });
    if (dept) {
      await prisma.staff.upsert({
        where: { slug: s.slug },
        update: {},
        create: {
          name: s.name,
          slug: s.slug,
          designation: s.designation,
          departmentId: dept.id,
          qualification: s.qualification,
          experience: s.experience,
          bio: s.bio,
          photo: s.photo,
          displayOrder: s.displayOrder,
          status: 'PUBLISHED',
        },
      });
    }
  }
  console.log('Created staff members');

  // Announcements
  const announcements = [
    {
      title: 'Admissions Open for Academic Session 2026-2027',
      slug: 'admissions-open-2026-2027',
      category: 'Admission',
      content: 'Apex Academy International is pleased to announce that applications for the upcoming 2026-2027 academic session are now open for prospective students across Primary, Middle, and Senior High levels.\n\nOur comprehensive admissions portal provides details regarding eligibility, assessment schedules, scholarship tests, and virtual campus tours.\n\nKey Dates:\n- Application Start: August 1, 2026\n- Entrance Assessment Round 1: September 20, 2026\n- Merit Scholarship Exam: October 5, 2026\n\nInterested parents can submit their online registration via the Admissions page or visit the Campus Administrative Block between 9:00 AM and 3:00 PM on working days.',
      featuredImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
      publicationDate: new Date('2026-08-01'),
      featuredFlag: true,
      status: 'PUBLISHED',
    },
    {
      title: 'Schedule for Mid-Term Examinations 2026',
      slug: 'mid-term-examinations-schedule-2026',
      category: 'Examination',
      content: 'The Academic Evaluation Cell has released the official timetable for the upcoming Mid-Term Examinations for the 2026-2027 academic cycle.\n\nExams will run from September 10, 2026 to September 22, 2026. Practical examinations and viva voce for Senior High science and computer streams will take place prior to regular written papers starting September 3rd.\n\nStudents can download their class-specific date sheet from the Downloads section or view it on their student portal.',
      featuredImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
      publicationDate: new Date('2026-08-04'),
      featuredFlag: true,
      status: 'PUBLISHED',
    },
    {
      title: 'Annual Inter-School STEM Olympiad Victory',
      slug: 'stem-olympiad-victory-2026',
      category: 'Academic',
      content: 'We are immensely proud to announce that the Apex Academy Senior Robotics Team bagged the coveted Gold Trophy at the 2026 State STEM Championships.\n\nCompeting against 48 top regional academies, our students designed an autonomous disaster-relief robot that achieved top scores in speed, efficiency, and innovative sensor integration.\n\nCongratulations to our student champions and their faculty mentors from the Physics & Computer Science Department!',
      featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
      publicationDate: new Date('2026-07-28'),
      featuredFlag: false,
      status: 'PUBLISHED',
    },
    {
      title: 'Annual Sports Meet & Athletic Championship Registration',
      slug: 'annual-sports-meet-2026',
      category: 'Sports',
      content: 'Get ready to showcase athletic prowess! The 32nd Apex Academy Annual Sports Meet will be hosted at our Olympic-standard athletic complex from October 12th to 14th.\n\nHouse captains are accepting registrations for track & field, basketball, swimming, archery, and badminton till September 1st.',
      featuredImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
      publicationDate: new Date('2026-07-20'),
      featuredFlag: false,
      status: 'PUBLISHED',
    },
    {
      title: 'Parent-Teacher Interactive Conference (PTIC) Fall Session',
      slug: 'ptic-fall-session-2026',
      category: 'General',
      content: 'Strong partnership between parents and teachers is key to holistic child development. The Fall PTIC will be held on Saturday, August 25th, from 8:30 AM to 2:00 PM.\n\nParents are requested to select preferred meeting time slots via the online scheduling portal.',
      featuredImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
      publicationDate: new Date('2026-07-15'),
      featuredFlag: false,
      status: 'PUBLISHED',
    },
  ];

  for (const a of announcements) {
    await prisma.announcement.upsert({
      where: { slug: a.slug },
      update: {},
      create: a,
    });
  }
  console.log('Created announcements');

  // Events
  const events = [
    {
      title: 'International Science & Innovation Expo 2026',
      slug: 'science-innovation-expo-2026',
      description: 'Apex Academy hosts its flagship annual International Science Expo. This year\'s theme is "Harnessing Technology for Sustainable Earth Futures".\n\nHighlights include keynote addresses by NASA guest scientists, live AI robot demonstrations, interactive chemistry showcases, and student project competitions evaluated by industry leaders.',
      date: new Date('2026-09-18'),
      startTime: '09:00 AM',
      endTime: '04:00 PM',
      location: 'Main Auditorium & Innovation Lab',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      status: 'PUBLISHED',
    },
    {
      title: 'Autumn Cultural Gala & Symphony Night',
      slug: 'autumn-cultural-gala-2026',
      description: 'Join us for the grandest cultural evening of the fall season! Over 300 student performers will present a rich tapestry of classical symphony, contemporary drama, global folk dance, and choir melodies.',
      date: new Date('2026-10-24'),
      startTime: '05:30 PM',
      endTime: '09:00 PM',
      location: 'Open-Air Amphitheatre',
      image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
      status: 'PUBLISHED',
    },
    {
      title: 'Inter-Academy Swimming & Aquatics Gala',
      slug: 'inter-academy-swimming-gala',
      description: 'Watch high-octane aquatics action as Apex Academy\'s Blue Fins swimming squad defends their state title against 12 guest schools in 24 swimming categories.',
      date: new Date('2026-11-05'),
      startTime: '08:00 AM',
      endTime: '02:00 PM',
      location: 'Aquatic Center (50m Olympic Pool)',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80',
      status: 'PUBLISHED',
    },
    {
      title: 'Career & Higher Education Global Fair',
      slug: 'career-higher-education-fair',
      description: 'Discover college pathways, Ivy League admissions strategies, scholarship opportunities, and career trends with official admissions officers from Oxford, Stanford, MIT, Cambridge, and UC universities.',
      date: new Date('2026-11-20'),
      startTime: '10:00 AM',
      endTime: '03:30 PM',
      location: 'Student Activity Hub',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      status: 'PUBLISHED',
    },
    {
      title: 'Annual Founders Day & Excellence Awards Ceremony',
      slug: 'annual-founders-day-2026',
      description: 'A celebratory gathering marking 32 years of educational excellence. Speeches, institutional achievements report, award distribution, and ceremonial dinner for parents, staff, and guests.',
      date: new Date('2026-12-12'),
      startTime: '10:00 AM',
      endTime: '01:00 PM',
      location: 'Apex Grand Convention Hall',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      status: 'PUBLISHED',
    },
  ];

  for (const e of events) {
    await prisma.event.upsert({
      where: { slug: e.slug },
      update: {},
      create: e,
    });
  }
  console.log('Created events');

  // Gallery Categories
  const galleryCategories = [
    { name: 'Campus', slug: 'campus' },
    { name: 'Sports', slug: 'sports' },
    { name: 'Science & Tech', slug: 'science-tech' },
    { name: 'Arts & Culture', slug: 'arts-culture' },
    { name: 'Events', slug: 'events' },
  ];

  for (const cat of galleryCategories) {
    await prisma.galleryCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('Created gallery categories');

  // Gallery Images
  const galleryImages = [
    { caption: 'State-of-the-Art Science & Innovation Complex', categorySlug: 'campus', fileUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80', displayOrder: 1 },
    { caption: 'Annual Robotics Championship Finals', categorySlug: 'science-tech', fileUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80', displayOrder: 2 },
    { caption: 'Olympic Swimming & Aquatics Complex', categorySlug: 'sports', fileUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80', displayOrder: 3 },
    { caption: 'Symphony Orchestra Performance', categorySlug: 'arts-culture', fileUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80', displayOrder: 4 },
    { caption: 'Central Library & Knowledge Hub', categorySlug: 'campus', fileUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80', displayOrder: 5 },
    { caption: 'Varsity Basketball Championship Match', categorySlug: 'sports', fileUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80', displayOrder: 6 },
    { caption: 'Visual Fine Arts Exhibition', categorySlug: 'arts-culture', fileUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80', displayOrder: 7 },
    { caption: 'Graduation Ceremony Class of 2026', categorySlug: 'events', fileUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80', displayOrder: 8 },
  ];

  for (const img of galleryImages) {
    const cat = await prisma.galleryCategory.findUnique({ where: { slug: img.categorySlug } });
    if (cat) {
      const existing = await prisma.galleryImage.findFirst({ where: { caption: img.caption } });
      if (!existing) {
        await prisma.galleryImage.create({
          data: {
            caption: img.caption,
            fileUrl: img.fileUrl,
            categoryId: cat.id,
            displayOrder: img.displayOrder,
            status: 'PUBLISHED',
          },
        });
      }
    }
  }
  console.log('Created gallery images');

  // Downloads
  const downloads = [
    { title: 'Admissions Prospectus & Application Guidelines 2026-27', category: 'Admissions', fileType: 'PDF', fileSize: 4404019, fileUrl: '#', status: 'PUBLISHED' },
    { title: 'Grade 6 to 10 Academic Curriculum & Syllabus Handbook', category: 'Syllabus', fileType: 'PDF', fileSize: 2936013, fileUrl: '#', status: 'PUBLISHED' },
    { title: 'Senior High School (Grade 11-12) Elective Course Catalogue', category: 'Syllabus', fileType: 'PDF', fileSize: 3250586, fileUrl: '#', status: 'PUBLISHED' },
    { title: 'Official School Transport & Bus Route Timetable', category: 'Forms', fileType: 'PDF', fileSize: 1468006, fileUrl: '#', status: 'PUBLISHED' },
    { title: 'Student Medical Emergency & Allergy Disclosure Form', category: 'Forms', fileType: 'PDF', fileSize: 665600, fileUrl: '#', status: 'PUBLISHED' },
    { title: 'Mid-Term Examination Datesheet & Invigilation Rules', category: 'Exam Schedules', fileType: 'PDF', fileSize: 1153434, fileUrl: '#', status: 'PUBLISHED' },
    { title: 'Apex Quarterly Newsletter - Summer 2026 Edition', category: 'Newsletters', fileType: 'PDF', fileSize: 8912896, fileUrl: '#', status: 'PUBLISHED' },
  ];

  for (const d of downloads) {
    const existing = await prisma.download.findFirst({ where: { title: d.title } });
    if (!existing) {
      await prisma.download.create({ data: d });
    }
  }
  console.log('Created downloads');

  // Sports
  const sports = [
    { name: 'Basketball', description: 'Full-size wooden maple indoor basketball court equipped with digital scoreboards and spectator seating.' },
    { name: 'Competitive Aquatics & Swimming', description: 'Heated 8-lane 50m Olympic pool with automated timing touchpads and diving facility.' },
    { name: 'Soccer & Track Athletics', description: 'FIFA-standard synthetic turf soccer pitch surrounded by a 400m 8-lane polyurethane running track.' },
    { name: 'Lawn Tennis & Badminton', description: '4 acrylic hard tennis courts and 6 indoor badminton courts with professional LED illumination.' },
  ];

  for (const s of sports) {
    await prisma.sport.upsert({
      where: { name: s.name },
      update: {},
      create: s,
    });
  }
  console.log('Created sports');

  // Activities
  const activities = [
    { title: 'Apex Robotics & AI Club', description: 'Hands-on building of VEX & FIRST Robotics competition bots, microcontrollers, Python automation, and machine vision systems.', category: 'Club', status: 'PUBLISHED' },
    { title: 'Model United Nations (MUN) & Debate Society', description: 'Honing diplomacy, parliamentary procedure, international resolution drafting, and public speaking in national MUN conferences.', category: 'Society', status: 'PUBLISHED' },
    { title: 'Youth Philharmonic Orchestra & Choir', description: 'Mastering classical and modern musical compositions across woodwind, brass, strings, percussion, and choral harmony.', category: 'Club', status: 'PUBLISHED' },
    { title: 'Eco-Warriors & Environmental Action Society', description: 'Driving campus recycling, solar power monitoring, organic greenhouse farming, and regional conservation awareness.', category: 'Society', status: 'PUBLISHED' },
  ];

  for (const a of activities) {
    const existing = await prisma.activity.findFirst({ where: { title: a.title } });
    if (!existing) {
      await prisma.activity.create({ data: a });
    }
  }
  console.log('Created activities');

  // Admission Notices
  const admissionNotices = [
    { title: 'Admissions Open 2026-2027', content: 'Applications for Grade 1 through Grade 11 are now officially open. Early bird registration ends September 15th.', status: 'PUBLISHED' },
  ];

  for (const n of admissionNotices) {
    const existing = await prisma.admissionNotice.findFirst({ where: { title: n.title } });
    if (!existing) {
      await prisma.admissionNotice.create({ data: n });
    }
  }
  console.log('Created admission notices');

  // Fee Structure
  const feeStructure = [
    { className: 'Primary (Grades 1-5)', admissionFee: 500, monthlyFee: 400, annualFee: 4800, otherCharges: 300, effectiveYear: '2026-2027', status: 'PUBLISHED' },
    { className: 'Middle School (Grades 6-8)', admissionFee: 600, monthlyFee: 483, annualFee: 5800, otherCharges: 400, effectiveYear: '2026-2027', status: 'PUBLISHED' },
    { className: 'Senior High (Grades 9-12)', admissionFee: 750, monthlyFee: 600, annualFee: 7200, otherCharges: 550, effectiveYear: '2026-2027', status: 'PUBLISHED' },
  ];

  for (const f of feeStructure) {
    const existing = await prisma.feeStructure.findFirst({ where: { className: f.className } });
    if (!existing) {
      await prisma.feeStructure.create({ data: f });
    }
  }
  console.log('Created fee structure');

  // Social Links
  const socialLinks = [
    { platform: 'Facebook', url: 'https://facebook.com/apexacademy', isActive: true, displayOrder: 1 },
    { platform: 'Instagram', url: 'https://instagram.com/apexacademy', isActive: true, displayOrder: 2 },
    { platform: 'YouTube', url: 'https://youtube.com/apexacademy', isActive: true, displayOrder: 3 },
  ];

  for (const link of socialLinks) {
    const existing = await prisma.socialLink.findFirst({ where: { platform: link.platform } });
    if (!existing) {
      await prisma.socialLink.create({ data: link });
    }
  }
  console.log('Created social links');

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
