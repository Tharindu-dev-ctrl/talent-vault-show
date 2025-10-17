import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

interface Achievement {
  title: string;
  position: string;
  description: string;
  year: string;
}

interface AchievementsData {
  achievements: Achievement[];
}

const Achievements = () => {
  const [achievementsData, setAchievementsData] = useState<AchievementsData | null>(null);

  useEffect(() => {
    fetch('/src/data/achievements.json')
      .then(res => res.json())
      .then(data => setAchievementsData(data));
  }, []);

  if (!achievementsData) return null;

  return (
    <section id="achievements" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Achievements & <span className="gradient-text">Competitions</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Recognition and awards from various technical competitions and hackathons.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {achievementsData.achievements.map((achievement, index) => (
            <Card
              key={index}
              className="bg-card border-border p-6 card-hover"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-primary flex-grow">
                      {achievement.title}
                    </h3>
                    <Badge variant="outline" className="ml-2">
                      {achievement.year}
                    </Badge>
                  </div>
                  
                  <p className="text-foreground/90 font-semibold mb-2">
                    {achievement.position}
                  </p>
                  
                  <p className="text-sm text-foreground/70">
                    {achievement.description}
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

export default Achievements;
