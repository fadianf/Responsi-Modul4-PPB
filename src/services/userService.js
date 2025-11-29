const USER_PROFILE_KEY = 'user_profile';
const USER_IDENTIFIER_KEY = 'user_identifier';

export const getUserIdentifier = () => {
  let userId = localStorage.getItem(USER_IDENTIFIER_KEY);
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(USER_IDENTIFIER_KEY, userId);
  }
  return userId;
};

export const getUserProfile = () => {
  try {
    const profile = localStorage.getItem(USER_PROFILE_KEY);
    if (profile) {
      return JSON.parse(profile);
    }
    return {
      username: 'User',
      avatar: null,
      bio: '',
      userId: getUserIdentifier()
    };
  } catch (error) {
    return {
      username: 'User',
      avatar: null,
      bio: '',
      userId: getUserIdentifier()
    };
  }
};

export const saveUserProfile = (profile) => {
  try {
    const userId = getUserIdentifier();
    const profileData = {
      ...profile,
      userId,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profileData));
    return { success: true, data: profileData };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export default {
  getUserIdentifier,
  getUserProfile,
  saveUserProfile
};