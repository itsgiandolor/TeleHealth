const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-2xl font-semibold tracking-wider text-foreground">
          TELEMEDICINE
        </a>
        <nav className="flex items-center gap-8">
          <a
            href="#about"
            className="text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium"
          >
            About us
          </a>
          <a
            href="#contact"
            className="text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
