import styled from 'styled-components';

export const MainPageContainer = styled.div`
  display: flex;
`;

export const SidebarContainer = styled.div`
  width: 240px;

  @media screen and (max-width: 540px) {
    display: none;
  }
`;

export const MainPanelContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  color: #eaeaea;
  background-color: #202225;
`;
