export interface AutomationIntent {
  id: string;
  name: string;
  icon: 'sun' | 'moon' | 'film' | 'zap';
  color: string;
  description: string;
  webhookUrl?: string; // Optional: If direct trigger is available
}

export const AVAILABLE_INTENTS: AutomationIntent[] = [
  { id: 'focus_mode', name: 'Focus', icon: 'zap', color: 'text-yellow-400', description: 'Lighting: Cool White' },
  { id: 'sleep_routine', name: 'Sleep', icon: 'moon', color: 'text-indigo-400', description: 'All systems: Idle' },
  { id: 'movie_time', name: 'Cinema', icon: 'film', color: 'text-red-400', description: 'Lights: Dim, TV: On' },
  { id: 'morning_rise', name: 'Morning', icon: 'sun', color: 'text-orange-400', description: 'Blinds: Open, News: On' },
];
