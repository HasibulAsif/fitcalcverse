import { Building, Users } from "lucide-react";

export const AboutSection = () => {
  return (
    <div className="relative z-10 py-24 w-full bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Users className="w-12 h-12 text-primary mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 mb-6">
              Our Vision
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              At Healthy Thako, we believe that everyone deserves access to quality fitness guidance and support. Our mission is to make health and fitness accessible, affordable, and simple for everyone.
            </p>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              We understand the unique challenges and preferences of our community, which is why we've created a platform that combines technology with cultural understanding to deliver the best possible fitness experience.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                <h3 className="text-3xl font-bold text-primary mb-2">10K+</h3>
                <p className="text-gray-400">Active Users</p>
              </div>
              <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                <h3 className="text-3xl font-bold text-primary mb-2">95%</h3>
                <p className="text-gray-400">Success Rate</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
              <Building className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Our Commitment</h3>
              <p className="text-gray-400">
                We're committed to providing personalized fitness solutions that respect and incorporate local cultural elements while maintaining international standards of health and wellness.
              </p>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-3">Our Values</h3>
              <ul className="text-gray-400 space-y-2">
                <li>✓ Accessibility for all</li>
                <li>✓ Cultural sensitivity</li>
                <li>✓ Scientific approach</li>
                <li>✓ Continuous innovation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};