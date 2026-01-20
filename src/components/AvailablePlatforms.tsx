import { ExternalLink } from "lucide-react";

const platforms = [
  { name: "Amazon", href: "#" },
  { name: "Flipkart", href: "#" },
  { name: "Meesho", href: "#" },
  { name: "Myntra", href: "#" },
  { name: "Nykaa", href: "#" },
];

const AvailablePlatforms = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">
            Also Available At
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-background border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300"
              >
                <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {platform.name}
                </span>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailablePlatforms;
