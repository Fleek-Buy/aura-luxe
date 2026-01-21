import {
  Instagram,
  Facebook,
  Youtube,
  Heart,
  Mail,
  Phone,
} from "lucide-react";
import PaymentIcon from "react-payment-icons-inline";
import logo from "/FullLogo.png";

const footerLinks = [
  { label: "About Us", href: "#" },
  { label: "We Are Eco-friendly", href: "#" },
  { label: "We Care", href: "#" },
  { label: "Blog", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Shipping Policy", href: "#" },
  { label: "Refund Policy", href: "#" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const paymentMethods = [
  { icon: "amex", label: "AMEX" },
  { icon: "diners", label: "Diners" },
  { icon: "googlepay", label: "GPay" },
  { icon: "maestro", label: "Maestro" },
  { icon: "mastercard", label: "Mastercard" },
  { icon: "paypal", label: "PayPal" },
  { icon: "visa", label: "Visa" },
];

const Footer = () => {
  return (
    <footer className="relative bg-primary text-primary-foreground">
      {/* Wave SVG Divider - matching the reference style */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%] overflow-hidden">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 65C480 50 600 40 720 45C840 50 960 70 1080 80C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-primary"
          />
        </svg>
      </div>

      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-3 items-start">
          {/* Left Column - Social & Contact */}
          <div className="space-y-6">
            <div className="flex items-center gap-1 text-sm font-medium uppercase tracking-wide">
              <span>Show us some</span>
              <Heart className="h-4 w-4 fill-destructive text-destructive" />
              <span>on social media</span>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 transition-all duration-300 hover:bg-primary-foreground/20 hover:scale-110"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@fleekbuy.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 7539987773</span>
              </div>
            </div>
          </div>

          {/* Center Column - Logo */}
          <div className="flex flex-col items-center justify-center text-center">
            <img src={logo} alt="Fleek Buy" className="h-[180px] w-auto mb-3" />
            <p className="text-sm font-medium tracking-wider uppercase text-primary-foreground/80">
              Shop Smart, Live Better!
            </p>
          </div>

          {/* Right Column - Navigation Links */}
          <div className="flex flex-col items-start md:items-end gap-3">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 space-y-6">
          {/* Copyright and Legal Links */}
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-primary-foreground/70">
              Copyright © Fleek Buy Private Limited 2026 |
            </p>
            <div className="flex gap-4 text-sm">
              <a
                href="#"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                Terms of Service
              </a>
              <span className="text-primary-foreground/50">|</span>
              <a
                href="#"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-wrap justify-center gap-3">
            {paymentMethods.map((method) => (
              <div
                key={method.icon}
                className="px-2 py-1.5 bg-primary-foreground rounded-md flex items-center justify-center"
              >
                <PaymentIcon 
                  icon={method.icon} 
                  style={{ width: 40, height: 25 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
