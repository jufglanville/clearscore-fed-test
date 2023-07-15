import { useEffect } from 'react';
import * as Sc from './styles';

interface Props {
  notification: string;
  clearNotification: () => void;
}

const Notification = ({ notification, clearNotification }: Props) => {
  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => {
        clearNotification();
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [notification, clearNotification]);

  return (
    <Sc.Container>
      <Sc.NotificationCard $notification={notification}>
        {notification}
      </Sc.NotificationCard>
    </Sc.Container>
  );
};

export default Notification;
