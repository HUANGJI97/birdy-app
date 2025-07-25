// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { QrCode, ArrowLeft, CheckCircle, History } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export default function ScanPage(props) {
  const [scanning, setScanning] = useState(true);
  const [order, setOrder] = useState(null);
  const [verified, setVerified] = useState(false);

  // 模拟扫码成功
  const handleScanSuccess = () => {
    setOrder({
      id: '#20250724001',
      product: '招牌汉堡套餐',
      quantity: 1,
      price: 48,
      time: '2025-07-24 10:30',
      customer: '张先生',
      phone: '138****1234',
      status: '待核销'
    });
    setScanning(false);
  };

  // 模拟核销
  const handleVerify = () => {
    setVerified(true);
  };

  // 返回扫码
  const backToScan = () => {
    setScanning(true);
    setOrder(null);
    setVerified(false);
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
            <Button variant="ghost" className="text-blue-500">
              手动输入订单号
            </Button>
          </div>
          {/* 模拟扫码按钮 */}
          <div className="mt-4 text-center">
            <Button onClick={handleScanSuccess}>模拟扫码成功</Button>
          </div>
        </div>}

      {/* 订单详情 */}
      {order && !verified && <div className="p-4">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">订单号: {order.id}</h2>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                {order.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">商品名称</span>
                <span className="font-medium">{order.product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">数量</span>
                <span className="font-medium">{order.quantity}份</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">金额</span>
                <span className="font-medium text-red-500">¥{order.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">下单时间</span>
                <span className="font-medium">{order.time}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h3 className="font-bold mb-2">顾客信息</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">姓名:</span>
                <span>{order.customer}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">电话:</span>
                <span>{order.phone}</span>
              </div>
            </div>
          </div>

          {/* 底部操作 */}
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
            <Button className="w-full" onClick={handleVerify}>
              <CheckCircle className="mr-2 h-4 w-4" />
              确认核销
            </Button>
          </div>
        </div>}

      {/* 核销成功 */}
      {verified && <div className="p-8 text-center">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">核销成功</h2>
          <p className="text-gray-600 mb-6">订单 {order.id} 已成功核销</p>
          
          <div className="bg-white rounded-lg shadow p-4 mb-6 mx-auto max-w-xs">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">商品</span>
              <span className="font-medium">{order.product}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">核销时间</span>
              <span className="font-medium">{new Date().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">操作员</span>
              <span className="font-medium">王店员</span>
            </div>
          </div>

          {/* 底部操作 */}
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
            <Button className="w-full mb-2" onClick={backToScan}>
              返回扫码
            </Button>
            <Button variant="outline" className="w-full">
              <History className="mr-2 h-4 w-4" />
              查看核销历史
            </Button>
          </div>
        </div>}
    </div>;
}