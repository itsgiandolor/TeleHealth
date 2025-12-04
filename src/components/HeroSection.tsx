import { Button } from "@/components/ui/button";
import medicalTeam from "@/assets/medical-team.jpg";

const HeroSection = () => {
  return (
    <section className="flex min-h-screen items-center pt-24 pb-16 relative overflow-hidden diagonal-lines">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-wide text-foreground mb-6">
              TELEMEDICINE
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Secure online consultations, prescriptions, and digital health records.
            </p>
            <Button variant="default" size="lg" className="text-lg px-10">
              Sign in
            </Button>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={medicalTeam}
                alt="Professional medical team of doctors and nurses"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/20 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
