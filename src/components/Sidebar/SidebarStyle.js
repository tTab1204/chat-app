import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 280px;

  @media screen and (max-width: 540px) {
    z-index: 2;
    margin-top: 60px;
    position: absolute;
    transition: 0.3s ease;
    left: ${({ flag }) => (flag ? '0' : '-300px')};
  }
`;

export const SidebarWrapper = styled.div`
  background-color: #3b4956;
  padding: 2rem;
  min-height: 100vh;
  color: #eaeaea;

  @media screen and (max-width: 540px) {
    padding-top: 0.1rem;
  }
`;

export const SidebarBox = styled.div`
  margin-top: 50px;
`;
