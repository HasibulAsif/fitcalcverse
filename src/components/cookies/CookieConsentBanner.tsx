import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const checkConsent = async () => {
      if (user) {
        // For authenticated users, check database
        const { data, error } = await supabase
          .from('cookie_consents')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        setShowBanner(!data?.[0]);
      } else {
        // For non-authenticated users, check localStorage
        const hasConsented = localStorage.getItem('cookieConsent');
        setShowBanner(!hasConsented);
      }
    };

    checkConsent();
  }, [user]);

  const handleAcceptAll = async () => {
    if (user) {
      // Delete any existing consents for this user
      await supabase
        .from('cookie_consents')
        .delete()
        .eq('user_id', user.id);

      // Insert new consent
      const { error } = await supabase
        .from('cookie_consents')
        .insert({
          user_id: user.id,
          essential: true,
          functional: true,
          analytics: true,
          advertising: true
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save cookie preferences",
          variant: "destructive",
        });
        return;
      }
    } else {
      localStorage.setItem('cookieConsent', 'all');
    }

    setShowBanner(false);
    toast({
      title: "Preferences Saved",
      description: "Your cookie preferences have been saved.",
    });
  };

  const handleAcceptEssential = async () => {
    if (user) {
      // Delete any existing consents for this user
      await supabase
        .from('cookie_consents')
        .delete()
        .eq('user_id', user.id);

      // Insert new consent
      const { error } = await supabase
        .from('cookie_consents')
        .insert({
          user_id: user.id,
          essential: true,
          functional: false,
          analytics: false,
          advertising: false
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save cookie preferences",
          variant: "destructive",
        });
        return;
      }
    } else {
      localStorage.setItem('cookieConsent', 'essential');
    }

    setShowBanner(false);
    toast({
      title: "Preferences Saved",
      description: "Essential cookies have been enabled.",
    });
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 text-white p-4 shadow-lg z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Cookie Preferences</h3>
          <p className="text-sm text-gray-300">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            Please select your cookie preferences.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleAcceptEssential}
            className="whitespace-nowrap"
          >
            Essential Only
          </Button>
          <Button
            onClick={handleAcceptAll}
            className="whitespace-nowrap bg-primary hover:bg-primary/90"
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
};