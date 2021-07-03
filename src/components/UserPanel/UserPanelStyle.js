import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const UserPanelContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  padding: 0.3rem;
`;

export const ImgBox = styled.div`
  background: #bdbdbd;
  width: 30px;
  height: 30px;
  border-radius: 70%;
  overflow: hidden;
  margin-right: 10px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
