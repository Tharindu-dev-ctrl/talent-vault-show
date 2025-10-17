import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

interface Education {
  institution: string;
  degree: string;
  specialization?: string;
  gpa?: string;
  results?: string;
  period: string;
}

interface EducationData {
  education: Education[];
}

const Education = () => {
  const [educationData, setEducationData] = useState<EducationData | null>(null);

  useEffect(() => {
    fetch('/src/data/education.json')
      .then(res => res.json())
      .then(data => setEducationData(data));
  }, []);

  if (!educationData) return null;

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="gradient-text">Education</span>
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {educationData.education.map((edu, index) => (
            <Card
              key={index}
              className="bg-card border-border p-6 card-hover"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-primary mb-1">
                    {edu.degree}
                  </h3>
                  {edu.specialization && (
                    <p className="text-foreground/90 mb-1">
                      Specialized in {edu.specialization}
                    </p>
                  )}
                  <p className="text-foreground/80 font-medium mb-1">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {edu.period}
                  </p>
                  
                  {edu.gpa && (
                    <p className="text-sm text-foreground/70">
                      <span className="font-semibold">GPA:</span> {edu.gpa}
                    </p>
                  )}
                  {edu.results && (
                    <p className="text-sm text-foreground/70">
                      <span className="font-semibold">Results:</span> {edu.results}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
