import React from 'react';
import { Spin } from 'antd';

const loadingStyle = {
  display: 'flex',
  height: '600px',
  justifyContent: 'center',
  alignItems: 'center',
};

const Loading = () => {
  return (
    <div style={loadingStyle}>
      <Spin size='large' />
    </div>
  );
};

export default Loading;
