// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { QrCode } from 'lucide-react';

import { View, Text, Button, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './scan.scss';
export default function ScanPage() {
  const [scanning, setScanning] = useState(true);
  const [order, setOrder] = useState(null);
  const [verified, setVerified] = useState(false);

  // 扫码功能
  const handleScan = () => {
    Taro.scanCode({
      success: res => {
        console.log('扫码结果:', res);
        setOrder({
          id: res.result,
          product: '示例商品',
          price: 99,
          time: new Date().toLocaleString()
        });
        setScanning(false);
      },
      fail: err => {
        console.error('扫码失败:', err);
        Taro.showToast({
          title: '扫码失败',
          icon: 'none'
        });
      }
    });
  };

  // 核销功能
  const handleVerify = () => {
    Taro.showLoading({
      title: '核销中...'
    });
    setTimeout(() => {
      Taro.hideLoading();
      setVerified(true);
      Taro.showToast({
        title: '核销成功',
        icon: 'success'
      });
    }, 1500);
  };
  return <View className='scan-container'>
      {scanning && <View className='scan-area'>
          <View className='scan-box'>
            <View className='scan-line'></View>
            <QrCode className='scan-icon' />
          </View>
          <Button className='scan-btn' onClick={handleScan}>
            开始扫码
          </Button>
        </View>}

      {order && !verified && <View className='order-detail'>
          <View className='order-header'>
            <Text className='order-id'>订单号: {order.id}</Text>
          </View>
          
          <View className='order-info'>
            <View className='info-row'>
              <Text>商品名称</Text>
              <Text>{order.product}</Text>
            </View>
            <View className='info-row'>
              <Text>金额</Text>
              <Text className='price'>¥{order.price}</Text>
            </View>
            <View className='info-row'>
              <Text>下单时间</Text>
              <Text>{order.time}</Text>
            </View>
          </View>

          <Button className='verify-btn' onClick={handleVerify}>
            确认核销
          </Button>
        </View>}

      {verified && <View className='verify-success'>
          <View className='success-icon'>
            <Image src='../../assets/success.png' />
          </View>
          <Text className='success-text'>核销成功</Text>
          <Text className='order-id'>订单号: {order.id}</Text>
          
          <Button className='back-btn' onClick={() => setScanning(true)}>
            返回扫码
          </Button>
        </View>}
    </View>;
}