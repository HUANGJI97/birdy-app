// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { QrCode, CheckCircle, History } from 'lucide-react';

export default function ScanPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [scanning, setScanning] = useState(true);
  const [order, setOrder] = useState(null);
  const [verified, setVerified] = useState(false);

  // 扫码功能
  const handleScan = async () => {
    try {
      const result = await $w.cloud.callFunction({
        name: 'scanCode',
        data: {}
      });
      if (result.code === 0) {
        setOrder({
          id: result.data.result,
          product: '示例商品',
          price: 99,
          time: new Date().toLocaleString()
        });
        setScanning(false);
      } else {
        toast({
          title: '扫码失败',
          description: result.message,
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: '扫码出错',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  // 核销功能
  const handleVerify = async () => {
    try {
      const result = await $w.cloud.callFunction({
        name: 'verifyOrder',
        data: {
          orderId: order.id
        }
      });
      if (result.code === 0) {
        setVerified(true);
        toast({
          title: '核销成功',
          description: `订单 ${order.id} 已成功核销`
        });
      } else {
        toast({
          title: '核销失败',
          description: result.message,
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: '核销出错',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  return <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* 顶部导航 */}
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-xl font-bold">
          {scanning && '扫码点单'}
          {order && !verified && '订单详情'}
          {verified && '核销成功'}
        </h1>
      </header>

      {/* 扫码区域 */}
      {scanning && <div className="p-4">
          <div className="text-center mb-4">
            <p className="text-gray-600">请对准顾客订单二维码进行扫描</p>
          </div>
          <div className="flex justify-center">
            <div className="w-72 h-72 border-2 border-dashed border-blue-500 rounded-lg relative overflow-hidden">
              <div className="absolute w-full h-0.5 bg-blue-500 animate-scan" />
              <div className="absolute inset-0 flex items-center justify-center">
                <QrCode className="h-16 w-16 text-blue-200 opacity-50" />
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Button onClick={handleScan} className="w-full">
              开始扫码
            </Button>
          </div>
        </div>}

      {/* 订单详情 */}
      {order && !verified && <div className="p-4">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">订单号: {order.id}</h2>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                待核销
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">商品名称</span>
                <span className="font-medium">{order.product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">金额</span>
                <span className="font-medium text-red-500">¥{order.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">下单时间</span>
                <span className="font-medium">{order.time}</span>
              </div>
            </div>
          </div>

          <Button onClick={handleVerify} className="w-full mt-4">
            <CheckCircle className="mr-2 h-4 w-4" />
            确认核销
          </Button>
        </div>}

      {/* 核销成功 */}
      {verified && <div className="p-8 text-center">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">核销成功</h2>
          <p className="text-gray-600 mb-6">订单 {order.id} 已成功核销</p>
          
          <Button onClick={() => {
        setScanning(true);
        setOrder(null);
        setVerified(false);
      }} className="w-full">
            返回扫码
          </Button>
        </div>}
    </div>;
}