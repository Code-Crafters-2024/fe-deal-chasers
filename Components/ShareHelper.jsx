import { Share } from 'react-native';

const url = "https://www.amazon.co.uk/Shark-NZ690UK-Lift-Away-Anti-Allergen-Turquoise/dp/B0B3RY7Y8L?ref_=Oct_DLandingS_D_3bc4d327_3&th=1"; //placeholder sharing url

const onShare = async () => {
  try {
    const result = await Share.share({
      message: "Deal Chasers: " + "\n" + url,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log("shared with activity type of: ", result.activityType);
      } else {
        console.log("shared");
      }
    } else if (result.action === Share.dismissedAction) {
      console.log("dismissed");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default onShare;
