// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { ArrowLeft, Filter, Calendar } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export default function TicketHistoryList({
  tickets,
  onBack
}) {
  return <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* 顶部导航 */}
      <header className="bg-green-500 text-white p-4 flex items-center">
        <Button variant="ghost" size="icon" className="text-white mr-2" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">核销历史</h1>
      </header>

      {/* 筛选 */}
      <div className="p-4 border-b">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <select className="w-full bg-gray-100 border-0 rounded-lg px-3 py-2 appearance-none">
              <option>今天</option>
              <option>近7天</option>
              <option>近30天</option>
              <option>自定义</option>
            </select>
            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
          <Button size="icon" className="bg-green-500 text-white">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 历史列表 */}
      <div className="divide-y">
        {tickets.map((ticket, index) => <div key={index} className="p-4">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium">{ticket.type}</h3>
              <span className="text-sm text-gray-500">{ticket.verifyTime}</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{ticket.id}</p>
            <div className="flex justify-between items-center">
              <span className="text-green-500 font-medium">{ticket.customer}</span>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                已核销
              </span>
            </div>
          </div>)}
      </div>
    </div>;
}