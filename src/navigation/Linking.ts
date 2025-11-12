import * as Linking from 'expo-linking';

// Keep types loose to avoid TS noise for nested linking on RN v7
export const linking: any = {
  prefixes: [Linking.createURL('/'), 'trilhar://'],
  config: {
    screens: {
      // Onboarding nested screens
      Onboarding: {
        screens: {
          Welcome: 'welcome', // /welcome
          Login: 'auth/login', // /auth/login
          Signup: 'auth/signup', // /auth/signup
          Preferences: 'onboarding/preferences', // /onboarding/preferences
        },
      },
      // Main tabs
      MainTabs: {
        screens: {
          Home: 'home', // /home
          Tracks: 'tracks', // /tracks
          Quiz: 'quiz', // /quiz
          Explore: 'explore', // /explore
          Profile: 'profile', // /profile
        },
      },
      // Root-level secondary screens
      TrackDetail: 'tracks/:id', // /tracks/:id
      TrackBuilder: 'tracks/new', // /tracks/new
      QuizResult: 'quiz/result', // /quiz/result
      Goals: 'goals', // /goals
      Settings: 'settings', // /settings
      Certifications: 'certs', // /certs
    },
  },
};
