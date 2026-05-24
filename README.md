React Native + Expo + EAS Starter Guide
A production-ready React Native setup using Expo, EAS Build, Expo Router, permissions handling, and modern best practices.
---
Stack
React Native
Expo SDK 55
Expo Router
TypeScript
NativeWind
Zustand
MMKV
EAS Build
React Navigation
Expo Permissions APIs
---
Project Structure
```bash
app/
components/
hooks/
services/
store/
utils/
constants/
assets/
```
---
Install Dependencies
```bash
yarn install
```
or
```bash
npm install
```
---
Start Development Server
```bash
npx expo start
```
---
Run on Android
```bash
npx expo run:android
```
---
Run on iOS
```bash
npx expo run:ios
```
---
Expo Router Setup
Install Expo Router:
```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```
app.json
```json
{
  "expo": {
    "scheme": "myapp",
    "plugins": ["expo-router"]
  }
}
```
babel.config.js
```js
module.exports = function(api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"]
  };
};
```
Entry Point
```json
{
  "main": "expo-router/entry"
}
```
---
EAS Build Setup
Install EAS CLI globally:
```bash
npm install -g eas-cli
```
Login:
```bash
eas login
```
Configure EAS:
```bash
eas build:configure
```
---
eas.json Example
```json
{
  "cli": {
    "version": ">= 16.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```
---
Build Commands
Android APK Preview Build
```bash
eas build --platform android --profile preview
```
Android Production AAB
```bash
eas build --platform android --profile production
```
iOS Build
```bash
eas build --platform ios --profile production
```
---
Development Build
Use development builds when working with:
Native modules
MMKV
Camera
Notifications
Background services
Custom native code
Create development build:
```bash
eas build --profile development --platform android
```
Start project:
```bash
npx expo start --dev-client
```
---
Expo Permissions
Expo permissions should always be requested only when needed.
---
Camera Permission
Install:
```bash
npx expo install expo-camera
```
Usage:
```tsx
import { Camera } from "expo-camera";
import { useEffect, useState } from "react";

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  return null;
}
```
---
Media Library Permission
Install:
```bash
npx expo install expo-media-library
```
Usage:
```tsx
import * as MediaLibrary from "expo-media-library";

const requestPermission = async () => {
  const permission = await MediaLibrary.requestPermissionsAsync();

  if (permission.granted) {
    console.log("Permission granted");
  }
};
```
---
Location Permission
Install:
```bash
npx expo install expo-location
```
Usage:
```tsx
import * as Location from "expo-location";

const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    return;
  }

  const location = await Location.getCurrentPositionAsync({});
  console.log(location);
};
```
---
Notifications Permission
Install:
```bash
npx expo install expo-notifications
```
Usage:
```tsx
import * as Notifications from "expo-notifications";

const requestNotificationPermission = async () => {
  const settings = await Notifications.requestPermissionsAsync();

  if (settings.granted) {
    console.log("Notifications enabled");
  }
};
```
---
app.json Permissions Example
```json
{
  "expo": {
    "android": {
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "ACCESS_FINE_LOCATION"
      ]
    },
    "ios": {
      "infoPlist": {
        "NSCameraUsageDescription": "Allow access to camera",
        "NSPhotoLibraryUsageDescription": "Allow access to photos",
        "NSLocationWhenInUseUsageDescription": "Allow access to location"
      }
    }
  }
}
```
---
NativeWind Setup
Install:
```bash
npm install nativewind
```
Install Tailwind:
```bash
npm install tailwindcss --save-dev
```
Create config:
```bash
npx tailwindcss init
```
tailwind.config.js
```js
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
```
---
Zustand + MMKV Setup
Install:
```bash
npm install zustand
npx expo install react-native-mmkv
```
Example Store:
```tsx
import { create } from "zustand";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

type Store = {
  token: string;
  setToken: (token: string) => void;
};

export const useAuthStore = create<Store>((set) => ({
  token: storage.getString("token") || "",

  setToken: (token) => {
    storage.set("token", token);

    set({
      token
    });
  }
}));
```
---
Performance Tips
Use FlashList instead of FlatList for large lists
Use React.memo
Avoid unnecessary re-renders
Lazy load screens
Optimize images
Use Hermes engine
Keep bundle size small
Remove unused dependencies
Split reusable components
Use Expo Doctor regularly
Run Expo Doctor:
```bash
npx expo-doctor
```
---
Useful Commands
Clear cache:
```bash
npx expo start -c
```
Prebuild native folders:
```bash
npx expo prebuild
```
Install compatible packages:
```bash
npx expo install package-name
```
Check dependencies:
```bash
npx expo install --check
```
---
Recommended Packages
UI
NativeWind
React Native Reanimated
React Native Gesture Handler
State Management
Zustand
React Query
Storage
MMKV
Secure Store
Forms
React Hook Form
Zod
Networking
Axios
TanStack Query
---
Deployment
Android
Generate production build:
```bash
eas build --platform android --profile production
```
Submit to Google Play:
```bash
eas submit --platform android
```
iOS
Generate iOS build:
```bash
eas build --platform ios --profile production
```
Submit to App Store:
```bash
eas submit --platform ios
```
---
Best Practices
Keep environment variables secure
Use TypeScript everywhere
Separate business logic from UI
Use reusable components
Validate forms using Zod
Store sensitive data securely
Use feature-based folder structure
Test on real devices frequently
---
Useful Links
https://expo.dev
https://docs.expo.dev
https://docs.expo.dev/build/introduction/
https://docs.expo.dev/router/introduction/
https://reactnative.dev
https://docs.swmansion.com/react-native-reanimated/
---
License
MIT
