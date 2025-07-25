// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Filter } from 'lucide-react';

export default function HistoryList({
  orders,
  onBack
}) {
  return <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* 顶部导航 */}
      <header className="bg-blue-500 text-white p-4 flex items-center">
        <Button variant="ghost" size="icon" className="text-white mr-2" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">核销历史</h1>
      </header>

      {/* 筛选 */}
      <div className="p-4 border-b">
        <div className="flex space-x-2">
          <select className="flex-1 bg-gray-100 border-0 rounded-lg px-3 py-2">
            <option>今天</option>
            <option>近7天</option>
            <option>近30天</option>
            <option>自定义</option>
          </select>
          <Button size="icon" className="bg-blue-500 text-white">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 历史列表 */}
      <div className="divide-y">
        {orders.map((order, index) => <div key={index} className="p-4">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium">{order.id}</h3>
              <span className="text-sm text-gray-500">{order.time}</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{order.product} - {order.spec}</p>
            <div className="flex justify-between items-center">
              <span className="text-red-500 font-medium">¥{order.price.toFixed(2)}</span>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">已核销</span>
            </div>
          </div>)}
      </div>

      {/* 底部操作 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
        <Button className="w-full">
          返回扫码
        </Button>
      </div>
    </div>;
}