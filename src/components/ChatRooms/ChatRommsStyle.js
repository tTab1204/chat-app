import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';

export const ChatListContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 500;
`;

export const PlusOutlinedStyle = styled(PlusOutlined)`
  position: absolute;
  right: 0;
  cursor: pointer;
`;
