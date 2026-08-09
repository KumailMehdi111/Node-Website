import { Sport } from '@/types';

export const sportsData: Sport[] = [
  {
    id: 'sp-1',
    name: 'Basketball',
    category: 'Indoor',
    coach: 'Coach David Rossi',
    achievements: ['State High School Champions 2025', 'Regional Inter-Academy Gold Medalists'],
    description: 'Full-size wooden maple indoor basketball court equipped with digital scoreboards and spectator seating.',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sp-2',
    name: 'Competitive Aquatics & Swimming',
    category: 'Aquatics',
    coach: 'Coach Brenda Taylor',
    achievements: ['14 Individual State Swimming Medals', 'Top Aquatic Program Trophy 2026'],
    description: 'Heated 8-lane 50m Olympic pool with automated timing touchpads and diving facility.',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sp-3',
    name: 'Soccer & Track Athletics',
    category: 'Outdoor',
    coach: 'Coach Fernando Silva',
    achievements: ['Inter-District Soccer Runners-Up', '400m Relay Record Holders'],
    description: 'FIFA-standard synthetic turf soccer pitch surrounded by a 400m 8-lane polyurethane running track.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sp-4',
    name: 'Lawn Tennis & Badminton',
    category: 'Outdoor',
    coach: 'Coach Anita Roy',
    achievements: ['Junior State Tennis Singles Winner'],
    description: '4 acrylic hard tennis courts and 6 indoor badminton courts with professional LED illumination.',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=80',
  },
];
