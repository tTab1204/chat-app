import styled from 'styled-components';
import { CaretDownOutlined, LockFilled } from '@ant-design/icons';
import { Input } from 'antd';

export const DirectMessageContainer = styled.div`
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

export const LockFilledStyle = styled(LockFilled)`
  position: absolute;
  right: 0;
  font-weight: 600;

  &:hover {
    color: white;
  }
`;

export const DirectMessagesList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const DirectMessageUser = styled.li`
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
