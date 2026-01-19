export interface ServiceStatus {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'error';
  uptime: string;
  ports: string[];
  cpu?: number;
  memory?: number;
  
  // Generic Discovery Metadata
  group?: string; // e.g. "Infrastructure", "Media", "Gaming"
  icon?: string;  // generic icon name
}

export interface ServiceControlRequest {
  id: string;
  action: 'start' | 'stop' | 'restart';
}