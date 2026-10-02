# CampusShuttle Tracker

CampusShuttle Tracker is a production-ready cross-platform React Native application for live campus shuttle tracking, route planning, and schedule management for Nigerian universities.

## Features

- Student login and registration
- Real-time bus tracking on Google Maps
- ETA and route planning
- Schedule and bus stop views with offline caching
- Driver trip controls and location updates
- Admin schedule and route management
- Push notifications for approaching buses and delays
- Role-based access control using Firebase Authentication
- Strong performance-minded UI optimized for low data usage

## Tech Stack

- React Native + Expo
- React Navigation
- Firebase Authentication + Firestore + FCM
- React Native Maps
- Expo Location + Expo Notifications
- AsyncStorage for offline caching
- Context API for state management

## Project Structure

- `src/screens` — app screens
- `src/components` — reusable UI components
- `src/context` — app state and auth providers
- `src/config` — Firebase initialization
- `src/navigation` — app navigation
- `src/services` — firebase and data service logic
- `src/utils` — local utilities and cache helpers

## Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- Firebase project
- Google Cloud project with Maps SDK and Firebase Cloud Messaging configured
- iOS/Android simulator or real device

## Installation

1. Clone the project:
   ```bash
   git clone https://github.com/ododovinx/CampusShuttle-Tracker.git
   cd CampusShuttle-Tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Firebase project and enable:
   - Authentication (Email/Password)
   - Firestore
   - Cloud Messaging

4. Add your configuration values to `app.json` or `.env`:
   ```bash
   cp .env.example .env
   ```

5. Start the app:
   ```bash
   npm start
   ```

## Firebase Setup

Add your Firebase config in `app.json` under `expo.extra` or expose them through environment variables if you extend the config loader.

Example:

```json
"extra": {
  "firebaseApiKey": "YOUR_API_KEY",
  "firebaseAuthDomain": "YOUR_AUTH_DOMAIN",
  "firebaseProjectId": "YOUR_PROJECT_ID",
  "firebaseStorageBucket": "YOUR_STORAGE_BUCKET",
  "firebaseMessagingSenderId": "YOUR_MESSAGING_SENDER_ID",
  "firebaseAppId": "YOUR_APP_ID",
  "googleMapsApiKey": "YOUR_GOOGLE_MAPS_KEY"
}
```

## Firestore Collections

Suggested collections:

- `users`
- `buses`
- `routes`
- `stops`
- `schedules`
- `driverLocations`
- `announcements`

Example document shapes:

```js
// users
{
  uid: 'abc123',
  email: 'student@university.edu.ng',
  name: 'Ada Okafor',
  role: 'student'
}
```

## Google Maps Setup

1. Enable Maps SDK for Android and iOS.
2. Create an API key in Google Cloud Console.
3. Restrict it to Android/iOS if needed.
4. Add the key to `app.json` or environment variables.
5. Add the proper iOS / Android permissions in the platform config.

## Push Notifications

FCM setup for Expo requires adding the Firebase messaging config and registering for notification permission on app startup. The project includes the integration hooks in the Firebase config and permission helpers.

## Offline Support

The app uses:

- `AsyncStorage` for local caching of routes and schedules
- Firestore listeners when available
- graceful fallback data when there is no network

## Role-Based Access

This app supports three roles:

- Student
- Driver
- Admin

User role is stored on the Firestore profile and checked before routes are rendered.

## Demo Accounts

The app includes demo fallback sign-in so the interface can be previewed without Firebase setup:

- Student: `student@campus.edu.ng` / `password123`
- Driver: `driver@campus.edu.ng` / `password123`
- Admin: `admin@campus.edu.ng` / `password123`

## Contributing

Pull requests are welcome. Please keep the code modular, documented, and production-focused.

## License

MIT
