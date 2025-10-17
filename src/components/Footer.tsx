const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tharindu Jayawardhana. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Built with React, Vite, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
