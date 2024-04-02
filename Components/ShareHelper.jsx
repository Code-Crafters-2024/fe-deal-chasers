import { Share } from 'react-native';

const onShare = async (deal) => {
  try {
    const message = `Deal Chasers: \nTitle: ${deal.title}\nPrice: £${deal.price}\nLink: ${deal.link}`;

    const result = await Share.share({
      message: message,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log("Shared with activity type of:", result.activityType);
      } else {
        console.log("Shared");
      }
    } else if (result.action === Share.dismissedAction) {
      console.log("Dismissed");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default onShare;
