import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "STARTER PLAN",
    price: null,
    description: "For individuals who need occasional online consultations.",
    features: [
      "1 free consultation per month",
      "Basic chat support",
      "Digital prescription access",
      "Appointment scheduling",
    ],
  },
  {
    name: "DESPERATE PLAN",
    price: "₱499/month",
    description: "For users with ongoing health needs who want unlimited access.",
    features: [
      "Unlimited consultations",
      "24/7 doctor availability",
      "Personalized care monitoring",
      "Medicine delivery coordination and reminders",
    ],
    highlighted: true,
  },
  {
    name: "PRO PLAN",
    price: "₱249/month",
    description: "For busy professionals who need frequent access to doctors.",
    features: [
      "Up to 3 consultations per month",
      "Priority scheduling",
      "Video or chat consultations",
      "Access to medical records and health tracking",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden diagonal-lines">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl lg:text-5xl font-semibold tracking-wide text-foreground text-center mb-20 animate-fade-in">
          CHOOSE THE PLAN THAT FITS YOUR NEEDS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`glass-card p-8 flex flex-col animate-fade-in ${
                plan.highlighted ? "ring-1 ring-accent/50" : ""
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <h3 className="text-xl font-semibold tracking-wide text-foreground mb-4">
                {plan.name}
              </h3>
              
              {plan.price && (
                <p className="text-muted-foreground text-sm mb-2">{plan.price}</p>
              )}
              
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {plan.description}
              </p>
              
              <p className="text-muted-foreground text-sm mb-3">Includes:</p>
              
              <ul className="space-y-2 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="text-sm text-foreground/90 flex items-start gap-2"
                  >
                    <span className="text-accent mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "hero" : "outline"}
                className="w-full mt-auto"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
