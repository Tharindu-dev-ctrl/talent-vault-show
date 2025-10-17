import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  tech: string[];
  github: string | null;
  website: string | null;
  status: string;
}

interface ProjectsData {
  projects: Project[];
}

const Projects = () => {
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);

  useEffect(() => {
    fetch('/src/data/projects.json')
      .then(res => res.json())
      .then(data => setProjectsData(data));
  }, []);

  if (!projectsData) return null;

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A collection of projects showcasing my expertise in full-stack development, 
          microservices architecture, DevOps, and cloud technologies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.projects.map((project, index) => (
            <Card
              key={index}
              className="bg-card border-border p-6 card-hover flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-bold text-primary">{project.name}</h3>
                <Badge variant="outline" className="ml-2">
                  {project.status}
                </Badge>
              </div>

              <p className="text-foreground/80 mb-4 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <Badge
                    key={techIndex}
                    variant="secondary"
                    className="bg-secondary/50 text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3 mt-auto">
                {project.github && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                )}
                {project.website && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1"
                  >
                    <a href={project.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
