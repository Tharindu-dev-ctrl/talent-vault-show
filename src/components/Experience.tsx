import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

interface Position {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

interface ExperienceData {
  positions: Position[];
}

const Experience = () => {
  const [experienceData, setExperienceData] = useState<ExperienceData | null>(null);

  useEffect(() => {
    fetch('/src/data/experience.json')
      .then(res => res.json())
      .then(data => setExperienceData(data));
  }, []);

  if (!experienceData) return null;

  return (
    <section id="experience" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Work <span className="gradient-text">Experience</span>
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {experienceData.positions.map((position, index) => (
            <Card
              key={index}
              className="bg-card border-border p-6 card-hover"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-primary mb-1">
                    {position.role}
                  </h3>
                  <p className="text-foreground/80 font-medium mb-1">
                    {position.company}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {position.period}
                  </p>
                  
                  <p className="text-foreground/80 mb-3">
                    {position.description}
                  </p>

                  <ul className="space-y-2">
                    {position.highlights.map((highlight, hIndex) => (
                      <li
                        key={hIndex}
                        className="text-sm text-foreground/70 flex items-start"
                      >
                        <span className="text-primary mr-2">▸</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
