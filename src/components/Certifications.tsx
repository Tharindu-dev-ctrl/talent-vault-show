import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Award } from 'lucide-react';

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface CertificationsData {
  certifications: Certification[];
}

const Certifications = () => {
  const [certificationsData, setCertificationsData] = useState<CertificationsData | null>(null);

  useEffect(() => {
    fetch('/src/data/certifications.json')
      .then(res => res.json())
      .then(data => setCertificationsData(data));
  }, []);

  if (!certificationsData) return null;

  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="gradient-text">Certifications</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certificationsData.certifications.map((cert, index) => (
            <Card
              key={index}
              className="bg-card border-border p-5 card-hover"
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-1">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {cert.date}
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

export default Certifications;
