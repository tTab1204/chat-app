import styled from 'styled-components';
import { Input, Badge } from 'antd';
import { PlusOutlined, CaretDownOutlined } from '@ant-design/icons';

export const ChatListContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-bottom: 5px;
`;

export const CaretDownOutlinedStyle = styled(CaretDownOutlined)`
  margin-right: 5px;
  transition: all 0.2s ease-in-out;
  transform: ${({ flag }) => (flag ? '' : 'rotate(-90deg)')};
`;

export const PlusOutlinedStyle = styled(PlusOutlined)`
  position: absolute;
  right: 0;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    color: white;
  }
`;

export const ChatLists = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ChatRoom = styled.li`
  padding: 5px 5px 5px 10px;
  cursor: pointer;
  border-radius: 20px;
  background-color: ${({ flag }) => (flag ? '#ffffff45' : '')};
  font-weight: ${({ flag }) => (flag ? '500' : '')};
  color: ${({ flag }) => (flag ? 'white' : '')};

  &:hover {
    font-weight: 500;
    color: white;
  }
`;

export const InputStyle = styled(Input)`
  margin-bottom: 10px;
`;

export const BadgeStyle = {
  marginBottom: '3px',
  background: '#ff4d4f',
  boxShadow: 'none',
};

export const floatRight = {
  float: 'right',
};
