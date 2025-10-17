import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileImage from '@/assets/profile.jpg';

interface AboutData {
  name: string;
  title: string;
  tagline: string;
}

interface ContactData {
  email: string;
  social: {
    github: string;
    linkedin: string;
    medium: string;
  };
}

const Hero = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [contactData, setContactData] = useState<ContactData | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/src/data/about.json').then(res => res.json()),
      fetch('/src/data/contact.json').then(res => res.json())
    ]).then(([about, contact]) => {
      setAboutData(about);
      setContactData(contact);
    });
  }, []);

  if (!aboutData || !contactData) return null;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-accent opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Hi, I'm <span className="gradient-text">{aboutData.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              {aboutData.title}
            </p>
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl">
              {aboutData.tagline}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 justify-center md:justify-start mb-8">
              <Button variant="outline" size="icon" asChild className="card-hover">
                <a href={contactData.social.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild className="card-hover">
                <a href={contactData.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild className="card-hover">
                <a href={contactData.social.medium} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild className="card-hover">
                <a href={`mailto:${contactData.email}`}>
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center md:justify-start">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <a href="#projects">View Projects</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex-1 flex justify-center fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-30 rounded-full"></div>
              <img
                src={profileImage}
                alt={aboutData.name}
                className="relative rounded-full w-64 h-64 md:w-96 md:h-96 object-cover border-4 border-primary/20 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
