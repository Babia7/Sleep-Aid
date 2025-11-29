export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface SleepStat {
  day: string;
  hours: number;
  quality: number; // 1-10
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  ROADMAP = 'ROADMAP',
  BREATHE = 'BREATHE',
  STORY = 'STORY'
}