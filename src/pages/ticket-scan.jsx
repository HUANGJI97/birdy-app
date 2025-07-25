// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Camera, CheckCircle, ArrowLeft, Keyboard, User, History } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export default function TicketScanPage(props) {
  const [scanning, setScanning] = useState(true);
  const [ticket, setTicket] = useState(null);
  const [verified, setVerified] = useState(false);
  const handleScanSuccess = () => {
    setTicket({
      id: 'T20250724123456',
      type: 'VIP入场券',
      event: 'BirdyHomebar 周末派对',
      customer: '张伟',
      phone: '186****1234',
      date: '2025-08-15',
      time: '22:00-02:00',
      seat: '吧台区',
      status: '未使用'
    });
    setScanning(false);
  };
  const handleVerify = () => {
    setVerified(true);
    setTicket(prev => ({
      ...prev,
      status: '已核销',
      verifyTime: new Date().toLocaleString()
    }));
  };
  const backToScan = () => {
    setScanning(true);
    setTicket(null);
    setVerified(false);
  };
  return <div className="max-w-md mx-auto bg-white min-h-screen">
      <header className="bg-green-500 text-white p-4">
        <h1 className="text-xl font-bold">
          {scanning ? 'BirdyHomebar 入场核销' : verified ? '核销成功' : '门票详情'}
        </h1>
      </header>

      {scanning && <div className="p-4">
          <div className="text-center mb-4">
            <p className="text-gray-600">请对准BirdyHomebar活动门票二维码</p>
          </div>
          <div className="flex justify-center">
            <div className="w-72 h-72 border-2 border-dashed border-green-500 rounded-lg relative overflow-hidden">
              <div className="absolute w-full h-0.5 bg-green-500 animate-scan" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="h-16 w-16 text-green-200 opacity-50" />
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Button variant="ghost" className="text-green-500">
              <Keyboard className="mr-2 h-4 w-4" />
              手动输入票号
            </Button>
          </div>
          <div className="mt-4 text-center">
            <Button onClick={handleScanSuccess}>模拟扫码成功</Button>
          </div>
        </div>}

      {ticket && !verified && <div className="p-4">
          <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
            <div className="bg-green-500 p-4 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{ticket.type}</h2>
                <span className="bg-white text-green-500 px-3 py-1 rounded-full text-sm font-semibold">
                  {ticket.status}
                </span>
              </div>
              <p className="text-sm opacity-90">{ticket.event}</p>
            </div>

            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">{ticket.customer}</p>
                  <p className="text-sm text-gray-500">{ticket.phone}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">票号</span>
                  <span className="font-medium">{ticket.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">活动日期</span>
                  <span className="font-medium">{ticket.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">入场时间</span>
                  <span className="font-medium">{ticket.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">区域</span>
                  <span className="font-medium">{ticket.seat}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
            <Button className="w-full" onClick={handleVerify}>
              <CheckCircle className="mr-2 h-4 w-4" />
              确认核销
            </Button>
          </div>
        </div>}

      {verified && <div className="p-8 text-center">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">BirdyHomebar 核销成功</h2>
          <p className="text-gray-600 mb-6">门票 {ticket.id} 已成功核销</p>
          
          <div className="bg-white rounded-lg shadow p-4 mb-6 mx-auto max-w-xs">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">门票类型</span>
              <span className="font-medium">{ticket.type}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">核销时间</span>
              <span className="font-medium">{ticket.verifyTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">调酒师</span>
              <span className="font-medium">王调酒师</span>
            </div>
          </div>

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