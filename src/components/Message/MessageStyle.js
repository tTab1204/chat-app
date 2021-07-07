import styled from 'styled-components';
import { Comment } from 'antd';

export const CommentStyle = styled(Comment)`
  font-weight: 500;
  font-size: 1.3rem;
  letter-spacing: 0.7px;

  &
    > .ant-comment-inner
    > .ant-comment-content
    > .ant-comment-content-author
    > .ant-comment-content-author-name {
    color: ${({ flag }) => (flag ? '#52c41a' : '')};
  }

  & > .ant-comment-inner > .ant-comment-content > .ant-comment-content-detail > img {
    max-width: 30%;

    @media screen and (max-width: 540px) {
      max-width: 60%;
    }
  }
`;
