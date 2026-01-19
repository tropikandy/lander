'use client';

import useSWR from 'swr';
import { ServiceStatus } from '@/lib/types/services';
import { ServiceCard } from './ServiceCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Server, Layers } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ServiceDeckProps {
  filter?: string;
}

export function ServiceDeck({ filter = "" }: ServiceDeckProps) {
  const { data, isLoading } = useSWR('/api/services/list', fetcher);
  
  const services: ServiceStatus[] = data?.services || [];

  // Filter services
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Group services dynamically
  const grouped = filteredServices.reduce((acc, service) => {
    const group = service.group || 'Other';
    if (!acc[group]) acc[group] = [];
    acc[group].push(service);
    return acc;
  }, {} as Record<string, ServiceStatus[]>);

  // Sort groups: Core first, then others alphabetically
  const groupNames = Object.keys(grouped).sort((a, b) => {
    if (a === 'Core') return -1;
    if (b === 'Core') return 1;
    return a.localeCompare(b);
  });

  return (
    <Card className="col-span-1 md:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="w-4 h-4 text-text-dim" /> SERVICE DECK
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="text-xs text-text-muted px-2">Scanning infrastructure...</div>
        ) : groupNames.length === 0 ? (
          <div className="text-xs text-text-muted px-2 py-4 text-center">No services found matching "{filter}"</div>
        ) : (
          groupNames.map((group) => (
            <div key={group} className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                    <Layers className="w-3 h-3 text-text-muted" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{group}</h4>
                    <div className="h-px bg-border flex-1"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {grouped[group].map((service) => (
                    <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
