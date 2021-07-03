import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SearchContainer = styled.section`
  z-index: 1;
  width: 100%;
  height: 60px;
  display: flex;
  position: fixed;
  justify-content: flex-start;
  background-color: #1a2634;
  box-shadow: 5px 2px 10px -2px rgb(0 0 0 / 19%);

  & > a > img {
    cursor: pointer;
    margin-left: 1rem;
    margin-top: 0.4rem;
    width: 3.2rem;
  }

  & > img {
    z-index: 1;
    cursor: pointer;
    margin-top: 1.2em;
    margin-left: 3em;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const LogoLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const Searchbox = styled.input`
  border: 0;
  left: -42px;
  margin: 11px;
  width: 170px;
  color: hsla(0, 0%, 91.8%, 0.6549019607843137);
  position: relative;
  border-radius: 15px;
  padding: 0 10px 0 45px;
  background-color: inherit;
  transition: 0.3s ease-in-out;
  outline: 0 !important;

  &: hover {
    width: 240px;
    color: #1a2634;
    background-color: #c9cdd0;
  }
`;
