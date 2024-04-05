
# Welcome to the Front End Project for Deal Chasers: A community deals exchange platform.

Deal Chasers is a dynamic Mobile Application built with React Native and Expo, serving as a central hub for community members to share, discover, and exchange deals, discounts and offers specific to their local area.


## Prerequisites

- Node.js v18.0 or higher. You can check your Node version using `node --version` in your terminal.

## Local Setup

To get the application running on your local machine, follow these steps:

1. Make sure Node.js is installed on your system. If not, you can download it from [here](https://nodejs.org/en/download/).
2. Fork the repository and clone it to your local machine:
   `git clone https://github.com/Code-Crafters-2024/fe-deal-chasers`
3. Navigate into the cloned directory:
   `cd FeDealChasers`
4. Install the necessary dependencies:
   `npm install`
5. Start the application:
   `npx expo start`

Now, the application should be accessible in your web browser.

## Using Android Notifications

Deal chasers utilises Expo Push Notifications to send local push notifications on android. To use this feature you need to provide a private key using firebase. note these notifications are not visible on android emulators or iOS devices.

1. Login to Firebase.com with a google account
2. create a project and name it deal chasers
3. Go to the project settings, found in the gear icon button next to the project overview button.
4. Go to the service accounts tab
5. under Firebase Admin SDK, select node.js configuration and click the generate new private key button
6. store the downloaded private key json to a secure location
7. add the private key .json file to the root of the deal chasers project directory, where app.js is located.
8. set the private key .json file to be git ignored in the projects .gitignore file, if you named your firebase project deal chasers it will autmatically be gitignored for you.
9. in the project, run the command `eas credentials` in the terminal, (you will need to be signed in with a expo account)
10. Select `Android` > '`production` > `Google Service Account` > `Manage your Google Service Account Key for Push Notifications (FCM V1)` > `Set up a Google Service Account Key for Push Notifications (FCM V1)`
11. You should now be able to see local push notifications when running the app on an android device.
12. in the firebase console on the project overview screen, click the android icon to create a new android app named deal.chasers
13. download the google services json
14. place the google services json into your project root directory (where the private key json is located)

You have now set up the deal chasers android push notifications.
