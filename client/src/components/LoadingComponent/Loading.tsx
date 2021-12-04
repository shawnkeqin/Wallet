import React from 'react';
import {Space, Spin} from "antd";

export default function Loading() {
  return (
    <Space size="middle" className='fixed -loading-block'><Spin size="large"/></Space>
  )
}
