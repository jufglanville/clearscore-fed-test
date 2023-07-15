import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
`;

export const NotificationCard = styled.div<{ $notification: string }>`
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
