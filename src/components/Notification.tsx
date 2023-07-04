import { useEffect } from "react";
import styled from "styled-components";

interface Props {
  notification: string;
  clearNotification: () => void;
}

const Notification = ({ notification, clearNotification }: Props) => {
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
    <Container>
      <NotificationCard notification={notification}>
        {notification}
      </NotificationCard>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
`;

const NotificationCard = styled.div<{ notification: string }>`
  text-align: center;
  padding: 1rem;
  background: #ffffff8a;
  border-radius: 0.5rem;
  z-index: 100;
  transform: translateY(
    ${({ notification }) => (notification ? "0" : "-100%")}
  );
  transition: all 0.3s ease-in-out;
`;

export default Notification;
