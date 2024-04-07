# greenthumb

Greenthumb React Native Application for plant lovers

#IMPORTANT NOTE 
Create an account to receive a token for following api directory
https://docs.trefle.io/docs/guides/getting-started

replace the token in /src/network/plant-service.ts
to succesfully make api calls.

#Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js installed on your machine (version 10 or later): Node.js is required to run JavaScript-based applications. React Native applications are built on top of Node.js.

npm (Node Package Manager) installed with Node.js: npm is a package manager for Node.js, used to install and manage dependencies for the application.

Git installed on your machine (optional, if cloning the repository): Git is a version control system used for tracking changes in source code during development. It's optional if you're cloning the repository directly.

This section lists the prerequisites necessary for setting up and running the React Native application.

#Installation
To install the application and its dependencies, follow these steps:

Clone the repository to your local machine: This step involves making a copy of the application's source code from https://github.com/MrShubhamSingh/greenthumb.git remote repository (e.g., GitHub) to your local machine. 

Navigate to the project directory: Change your current working directory to the directory where you've cloned the repository.

Install npm dependencies: Use npm to install all the required dependencies specified in the package.json file. This ensures that the application has all the necessary libraries and modules to run correctly.

#Execution

Start the Metro Bundler: Metro is the JavaScript bundler used by React Native to package and bundle the application's source code. Running npx react-native start starts the Metro Bundler, which bundles the JavaScript code and provides a development server.

Run the application on Android: This command (npx react-native run-android) builds the Android version of the application and deploys it on a connected Android device or emulator.

Run the application on iOS: Similarly, this command (npx react-native run-ios) builds the iOS version of the application and deploys it on a connected iOS device or simulator.

#Additional Commands
This section lists some additional commands that can be useful during development:

View Android logs: Use npx react-native log-android to view logs specific to the Android platform.

View iOS logs: Use npx react-native log-ios to view logs specific to the iOS platform.

Run with a specific build variant for Android: This command (npx react-native run-android --variant=<variant>) allows you to specify a particular build variant (e.g., debug or release) when running the Android version of the application.

Run on a specific iOS simulator: This command (npx react-native run-ios --simulator="<simulator name>") allows you to specify a particular iOS simulator to run the application on.

Troubleshooting

Find fixes for follwing issues : (Feel free to add more)

1. “react-native” not found : 

add "compilerOptions": {
    "moduleResolution": "node"
  } in tsconfig.json


2. RNScreens not found : npm install react-native-screens Add in android/settings.gradle :  
 include ':react-native-screens'
      project(':react-native-screens').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-screens/android') 
cd android && ./gradlew clean
cd .. && npx react-native run-android   

3. Invariant Violation: requireNativeComponent: "RNCSafeAreaProvider" was not found in the UIManager.  	npm install react-native-safe-area-context 	cd android && ./gradlew clean 	cd .. && npx react-native run-android   
4. react-native-vector-icons not found or icon not working  :  	
  npm install --save-dev @types/react-native-vector-icons
	go to android/app/build.gradle ( NOT android/build.gradle) and add the following:
	apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
	cd android && ./gradlew clean 	cd .. && npx react-native run-android 
 
5. npm i @react-navigation/stack npm install @react-native-community/masked-view
	npm install react-native-gesture-handler
 

Feedback
Open an issue on GitHub or contacting the developers directly over shubhamitd237@gmail.com.

Feel free to customize this README file further to suit the specific details and requirements of your React Native application. You can include additional sections or provide more detailed instructions as needed.

