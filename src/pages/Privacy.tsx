import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Lock className="w-6 h-6" />
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including when
              you create an account, use our services, or communicate with us.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve
              our services, to develop new ones, and to protect HT Workout and our
              users.
            </p>

            <h2>3. Information Sharing and Disclosure</h2>
            <p>
              We do not share your personal information with companies,
              organizations, or individuals outside of HT Workout except in the
              following cases:
            </p>
            <ul>
              <li>With your consent</li>
              <li>For legal reasons</li>
              <li>
                With our service providers who assist in providing our services
              </li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We work hard to protect HT Workout and our users from unauthorized
              access to or unauthorized alteration, disclosure, or destruction of
              information we hold.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
            </ul>

            <h2>6. Cookies</h2>
            <p>
              We use cookies and similar technologies to provide and support our
              services and each of the uses outlined and described in this Privacy
              Policy.
            </p>

            <h2>7. Changes to This Policy</h2>
            <p>
              We may change this privacy policy from time to time. We will post any
              privacy policy changes on this page and, if the changes are
              significant, we will provide a more prominent notice.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;