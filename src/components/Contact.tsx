import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Github, Linkedin, FileText } from 'lucide-react';

interface ContactData {
  email: string;
  phone: string;
  social: {
    github: string;
    linkedin: string;
    medium: string;
  };
}

const Contact = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);

  useEffect(() => {
    fetch('/src/data/contact.json')
      .then(res => res.json())
      .then(data => setContactData(data));
  }, []);

  if (!contactData) return null;

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          I'm always open to discussing new projects, opportunities, or collaborations.
          Feel free to reach out!
        </p>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-card border-border p-8">
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a
                    href={`mailto:${contactData.email}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {contactData.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <a
                    href={`tel:${contactData.phone}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {contactData.phone}
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="flex-1 card-hover"
                  >
                    <a
                      href={contactData.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-5 w-5" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="flex-1 card-hover"
                  >
                    <a
                      href={contactData.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="mr-2 h-5 w-5" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="flex-1 card-hover"
                  >
                    <a
                      href={contactData.social.medium}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="mr-2 h-5 w-5" />
                      Medium
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
