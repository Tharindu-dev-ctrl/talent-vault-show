import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';

interface Recommendation {
  name: string;
  role: string;
  company: string;
  relationship: string;
  date: string;
  text: string;
  linkedin: string;
}

interface RecommendationsData {
  recommendations: Recommendation[];
}

const Recommendations = () => {
  const [recommendationsData, setRecommendationsData] = useState<RecommendationsData | null>(null);

  useEffect(() => {
    fetch('/src/data/recommendations.json')
      .then(res => res.json())
      .then(data => setRecommendationsData(data));
  }, []);

  if (!recommendationsData) return null;

  return (
    <section id="recommendations" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span className="gradient-text">Recommendations</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          What colleagues and mentors say about working with me.
        </p>

        <div className="max-w-5xl mx-auto space-y-6">
          {recommendationsData.recommendations.map((rec, index) => (
            <Card
              key={index}
              className="bg-card border-border p-8 card-hover"
            >
              <div className="flex gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Quote className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {rec.name}
                  </h3>
                  <p className="text-sm text-foreground/80 mb-1">
                    {rec.role} at {rec.company}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {rec.relationship} • {rec.date}
                  </p>
                </div>
              </div>

              <div className="pl-16">
                {rec.text.split('\n\n').map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-foreground/70 leading-relaxed mb-3 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
