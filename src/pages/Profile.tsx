import { ProfileManagement } from "@/components/profile/ProfileManagement";
import { ProgressTracking } from "@/components/progress/ProgressTracking";

const Profile = () => {
  return (
    <div className="space-y-8">
      <ProfileManagement />
      <ProgressTracking />
    </div>
  );
};

export default Profile;