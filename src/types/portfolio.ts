export type CharacterPose = 'center' | 'left' | 'right' | 'typing' | 'pointing';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
  interactiveType?: 'paynest' | 'echomind' | 'tracker';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  duration?: string;
  description: string[];
  badge?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'AI & ML' | 'Data Analytics' | 'Web & Cloud' | 'Competitive';
}
