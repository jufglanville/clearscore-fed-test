import { useContext, useEffect } from 'react';
import { TaskContext } from '../context/IdeaContext';
import styled from 'styled-components';

const Notification = () => {
  const { state, clearNotification } = useContext(TaskContext);
  const { notification } = state;

  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => {
        clearNotification();
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [notification, clearNotification]);

  return (
    <ScContainer>
      <ScNotificationCard $notification={notification}>
        {notification}
      </ScNotificationCard>
    </ScContainer>
  );
};

const ScContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
`;

const ScNotificationCard = styled.div<{ $notification: string }>`
  text-align: center;
  padding: 1rem;
  background: #ffffff8a;
  border-radius: 0.5rem;
  z-index: 100;
  transform: translateY(
    ${({ $notification }) => ($notification ? '0' : '-100%')}
  );
  transition: all 0.3s ease-in-out;
`;

export default Notification;
