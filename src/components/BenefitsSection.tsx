const benefits = [
  {
    title: "FUNCTIONAL BENEFITS",
    description:
      "FASTER CONSULTATION TIMES AND REDUCED WAITING PERIODS. DIGITAL PRESCRIPTIONS AND MEDICAL RECORDS STORED SECURELY ONLINE. ABILITY TO SCHEDULE FOLLOW-UPS AND HEALTH MONITORING WITH EASE.",
  },
  {
    title: "EMOTIONAL BENEFITS",
    description:
      "PEACE OF MIND KNOWING MEDICAL HELP IS ALWAYS WITHIN REACH. RELIEF FROM STRESS OF TRAVELING LONG DISTANCES FOR MEDICAL CHECKUPS.",
  },
  {
    title: "SOCIAL BENEFITS",
    description:
      "GAIN RESPECT FOR USING MODERN, TECH-DRIVEN HEALTHCARE SOLUTIONS. ENCOURAGE FAMILY MEMBERS AND COMMUNITIES TO ADOPT DIGITAL HEALTH TOOLS.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="about" className="min-h-screen flex items-center py-24 relative overflow-hidden diagonal-lines">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-semibold tracking-wide text-foreground text-center mb-20 animate-fade-in">
          WHY CHOOSE US?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <h3 className="text-xl font-semibold tracking-wide text-foreground mb-6">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed tracking-wide uppercase">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
