import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export function useWeeklyGoalsNotifications() {
  useEffect(() => {
    (async () => {
      await Notifications.requestPermissionsAsync();
      await Notifications.setNotificationChannelAsync('weekly', {
        name: 'Weekly',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    })();
  }, []);
}

