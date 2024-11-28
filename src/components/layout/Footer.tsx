import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/healthythako/", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/healthythako", label: "Twitter" },
    { icon: Linkedin, href: "https://bd.linkedin.com/company/healthy-thako", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/healthythako/", label: "Instagram" },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">HT Workout</h3>
            <p className="text-gray-400">A portfolio of Healthy Thako Inc.</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="text-gray-400 hover:text-primary transition-colors">Dashboard</a></li>
              <li><a href="/calculators" className="text-gray-400 hover:text-primary transition-colors">Calculators</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-400">Join our newsletter for fitness tips and updates.</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Healthy Thako Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;