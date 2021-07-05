import styled from 'styled-components';
import { Input, Form } from 'antd';

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

  & > span {
    color: #058569;
  }

  @media screen and (max-width: 540px) {
    display: inline-block;
  }
`;

export const ErrorMsgBox = styled.p`
  color: #e82323;
`;

export const FileUploadInput = styled.input`
  display: none;
`;

export const FormStyle = styled(Form)`
  display: flex;
`;
