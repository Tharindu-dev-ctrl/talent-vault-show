import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SkillCategory {
  name: string;
  skills: string[];
}

interface SkillsData {
  categories: SkillCategory[];
}

const Skills = () => {
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null);

  useEffect(() => {
    fetch('/src/data/skills.json')
      .then(res => res.json())
      .then(data => setSkillsData(data));
  }, []);

  if (!skillsData) return null;

  return (
    <section id="skills" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Technical <span className="gradient-text">Skills</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.categories.map((category, index) => (
            <Card
              key={index}
              className="bg-card border-border p-6 card-hover"
            >
              <h3 className="text-xl font-semibold mb-4 text-primary">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    variant="secondary"
                    className="bg-secondary hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
