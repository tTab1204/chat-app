import React from 'react';
import { Spin } from 'antd';

const loadingStyle = {
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#24323f',
};

const Loading = () => {
  return (
    <div style={loadingStyle}>
      <Spin size='large' />
    </div>
  );
};

export default Loading;
