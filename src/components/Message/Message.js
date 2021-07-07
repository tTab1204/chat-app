import React from 'react';
import moment from 'moment';
import { Avatar, Tooltip } from 'antd';
import { CommentStyle } from './MessageStyle';

const Message = ({ message, user, key }) => {
  const timeFromNow = (timeStamp) => moment(timeStamp).fromNow();

  const isImage = (message) => {
    return message.hasOwnProperty('image') && !message.hasOwnProperty('content');
  };

  const isMessageMine = (message, user) => {
    if (user) {
      return message.user.id === user.uid;
    }
  };

  return (
    <div>
      <CommentStyle
        flag={isMessageMine(message, user)}
        author={message.user.name}
        avatar={<Avatar src={message.user.image} alt={message.user.name} />}
        content={
          isImage(message) ? (
            <img src={message.image} alt={message.key} />
          ) : (
            <p>{message.content}</p>
          )
        }
        datetime={
          <Tooltip title={moment(message.timeStamp).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{timeFromNow(message.timeStamp)}</span>
          </Tooltip>
        }
      />
    </div>
  );
};

export default Message;
