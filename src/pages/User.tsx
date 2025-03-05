import useMemeStore from "../store/formStore";

import UserProfile from "../components/UserProfile";
import useProfileStore from "../store/userProfile";
const User = () => {
  const { userMemes, likedMemes } = useMemeStore();
  const { userProfile, updateProfile } = useProfileStore();
  return (
    <div className="flex flex-col items-center">
      <UserProfile
        likedMemes={likedMemes}
        userMeme={userMemes}
        user={userProfile}
        updateProfile={updateProfile}
      />
    </div>
  );
};

export default User;
