import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Terms of Service
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using HT Workout, you agree to be bound by these
              Terms of Service and all applicable laws and regulations.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials (information
              or software) on HT Workout for personal, non-commercial transitory
              viewing only.
            </p>

            <h2>3. User Account</h2>
            <p>
              To access certain features of the Service, you must register for an
              account. You agree to provide accurate information and keep it
              updated.
            </p>

            <h2>4. Privacy</h2>
            <p>
              Your use of HT Workout is also governed by our Privacy Policy. Please
              review our Privacy Policy, which also governs the Site and informs
              users of our data collection practices.
            </p>

            <h2>5. Disclaimer</h2>
            <p>
              The materials on HT Workout are provided on an 'as is' basis. HT
              Workout makes no warranties, expressed or implied, and hereby
              disclaims and negates all other warranties including, without
              limitation, implied warranties or conditions of merchantability,
              fitness for a particular purpose, or non-infringement of intellectual
              property or other violation of rights.
            </p>

            <h2>6. Limitations</h2>
            <p>
              In no event shall HT Workout or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data or
              profit, or due to business interruption) arising out of the use or
              inability to use the materials on HT Workout.
            </p>

            <h2>7. Revisions</h2>
            <p>
              The materials appearing on HT Workout could include technical,
              typographical, or photographic errors. HT Workout does not warrant
              that any of the materials on its website are accurate, complete or
              current.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;