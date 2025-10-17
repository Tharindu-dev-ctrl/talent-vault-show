import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface AboutData {
  fullBio: string;
}

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  useEffect(() => {
    fetch('/src/data/about.json')
      .then(res => res.json())
      .then(data => setAboutData(data));
  }, []);

  if (!aboutData) return null;

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          About <span className="gradient-text">Me</span>
        </h2>

        <Card className="bg-card border-border p-8 md:p-12 card-hover">
          <div className="prose prose-invert max-w-none">
            {aboutData.fullBio.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-foreground/80 text-lg leading-relaxed mb-6 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default About;
