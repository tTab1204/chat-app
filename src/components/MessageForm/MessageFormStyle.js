import styled from 'styled-components';
import { Input } from 'antd';

const { TextArea } = Input;

export const TextAreaBox = styled(TextArea)`
  font-size: 1rem;
  background-color: #40444b;
  border: none;
  border-radius: 10px;
  padding: 8px;

  @media screen and (max-width: 540px) {
    font-size: 0.8rem;
  }
`;

export const ImageUploadBox = styled.div`
  text-align: center;
  padding: 8px;
  border: none;
  border-radius: 10px;
  margin-right: 5px;
  background-color: #40444b;
  font-size: 1rem;
  cursor: pointer;
`;

export const SendButtonBox = styled.div`
  text-align: center;
  padding: 8px;
  border: none;
  border-radius: 10px;
  margin-left: 5px;
  background-color: #40444b;
  font-size: 1rem;
  /* display: none; */

  @media screen and (max-width: 540px) {
    display: inline-block;
  }
`;
