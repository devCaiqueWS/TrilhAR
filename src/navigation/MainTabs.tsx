import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { TabsParamList } from './types';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { TracksScreen } from '../screens/Tracks/TracksScreen';
import { QuizScreen } from '../screens/Quiz/QuizScreen';
import { ExploreScreen } from '../screens/Explore/ExploreScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator<TabsParamList>();

export const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let icon = 'ellipse-outline' as keyof typeof Ionicons.glyphMap;
        switch (route.name) {
          case 'Home':
            icon = 'home-outline';
            break;
          case 'Tracks':
            icon = 'map-outline';
            break;
          case 'Quiz':
            icon = 'help-circle-outline';
            break;
          case 'Explore':
            icon = 'search-outline';
            break;
          case 'Profile':
            icon = 'person-outline';
            break;
        }
        return <Ionicons name={icon} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Tracks" component={TracksScreen} />
    <Tab.Screen name="Quiz" component={QuizScreen} />
    <Tab.Screen name="Explore" component={ExploreScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
