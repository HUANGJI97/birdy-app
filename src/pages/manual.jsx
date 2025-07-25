// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Keyboard, ArrowLeft } from 'lucide-react';
// @ts-ignore;
import { Button, Input } from '@/components/ui';

export default function ManualPage(props) {
  const [ticketNumber, setTicketNumber] = useState('');
  const handleSubmit = () => {
    if (ticketNumber.length >= 6) {
      // 模拟查询成功
      props.$w.utils.navigateTo({
        pageId: 'scan',
        params: {
          ticketNumber
        }
      });
    } else {
      alert('请输入有效的票号');
    }
  };
  return <div className="max-w-md mx-auto bg-white min-h-screen">
      <header className="bg-green-500 text-white p-4 flex items-center">
        <Button variant="ghost" size="icon" className="text-white mr-2" onClick={() => props.$w.utils.navigateBack()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">手动输入票号</h1>
      </header>

      <div className="p-4">
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="mb-4">
            <Input id="ticketNumber" placeholder="例如: T202507241234" value={ticketNumber} onChange={e => setTicketNumber(e.target.value)} />
          </div>
        </div>

        <div className="flex space-x-4">
          <Button variant="outline" className="flex-1" onClick={() => props.$w.utils.navigateBack()}>
            取消
          </Button>
          <Button className="flex-1" onClick={handleSubmit}>
            查询
          </Button>
        </div>
      </div>
    </div>;
}