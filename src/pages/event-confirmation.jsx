// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { CheckCircle2, XCircle } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export default function EventConfirmation(props) {
  const {
    $w
  } = props;
  const eventData = {
    title: '周末户外徒步活动',
    date: '2023-11-25',
    time: '09:00 - 17:00',
    location: '西湖风景区',
    organizer: '户外探险俱乐部',
    price: '¥150',
    participants: 12,
    maxParticipants: 20
  };
  const handleConfirm = () => {
    $w.utils.navigateTo({
      pageId: 'event-detail',
      params: {
        id: '123'
      }
    });
  };
  const handleCancel = () => {
    $w.utils.navigateBack();
  };
  return <div className="p-6 max-w-md mx-auto">
      <div className="text-center mb-8">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">报名成功</h1>
        <p className="text-gray-500">您已成功报名以下活动</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{eventData.title}</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">日期</span>
            <span>{eventData.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">时间</span>
            <span>{eventData.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">地点</span>
            <span>{eventData.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">主办方</span>
            <span>{eventData.organizer}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">费用</span>
            <span className="font-medium">{eventData.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">报名人数</span>
            <span>{eventData.participants}/{eventData.maxParticipants}</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" className="flex-1" onClick={handleCancel}>
          返回
        </Button>
        <Button className="flex-1" onClick={handleConfirm}>
          查看活动详情
        </Button>
      </div>
    </div>;
}