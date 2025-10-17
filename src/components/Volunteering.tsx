import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';

interface VolunteerActivity {
  role: string;
  event: string;
  organization: string;
  description: string;
  category: string;
}

interface VolunteeringData {
  activities: VolunteerActivity[];
}

const Volunteering = () => {
  const [volunteeringData, setVolunteeringData] = useState<VolunteeringData | null>(null);

  useEffect(() => {
    fetch('/src/data/volunteering.json')
      .then(res => res.json())
      .then(data => setVolunteeringData(data));
  }, []);

  if (!volunteeringData) return null;

  return (
    <section id="volunteering" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Community <span className="gradient-text">Involvement</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Giving back to the community through teaching, mentoring, and technical contributions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {volunteeringData.activities.map((activity, index) => (
            <Card
              key={index}
              className="bg-card border-border p-6 card-hover"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-primary flex-grow">
                      {activity.role}
                    </h3>
                    <Badge variant="outline" className="ml-2">
                      {activity.category}
                    </Badge>
                  </div>
                  
                  <p className="text-foreground/90 font-semibold mb-1">
                    {activity.event}
                  </p>
                  
                  <p className="text-sm text-foreground/70 mb-3">
                    {activity.organization}
                  </p>
                  
                  <p className="text-sm text-foreground/70">
                    {activity.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Volunteering;
