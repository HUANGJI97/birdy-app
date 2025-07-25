// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Package, Ticket, Calendar, QrCode, User } from 'lucide-react';
// @ts-ignore;
import { Tabs, TabsList, TabsTrigger, TabsContent, Button } from '@/components/ui';

export default function StaffProfile(props) {
  const {
    $w
  } = props;

  // 商品库存数据
  const inventoryItems = [{
    id: 1,
    name: '莫吉托',
    stock: 42,
    price: 68
  }, {
    id: 2,
    name: '长岛冰茶',
    stock: 28,
    price: 78
  }, {
    id: 3,
    name: '威士忌',
    stock: 15,
    price: 98
  }];

  // 门票数据
  const tickets = [{
    id: 1,
    name: '周末DJ派对',
    sold: 42,
    total: 100
  }, {
    id: 2,
    name: '周三女士之夜',
    sold: 28,
    total: 80
  }];

  // 活动数据
  const activities = [{
    id: 1,
    name: '夏季音乐会',
    date: '2025-07-20',
    status: '进行中'
  }, {
    id: 2,
    name: '艺术展览',
    date: '2025-07-25',
    status: '筹备中'
  }];
  return <div className="flex flex-col h-screen bg-gray-50">
      {/* 顶部个人信息 */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <div className="bg-gray-200 rounded-full p-2 mr-3">
            <User className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h2 className="font-bold">店员账号</h2>
            <p className="text-sm text-gray-500">ID: STAFF001</p>
          </div>
        </div>
      </div>

      {/* 功能导航 */}
      <div className="p-4">
        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inventory">
              <Package className="h-4 w-4 mr-1" />
              库存
            </TabsTrigger>
            <TabsTrigger value="verify">
              <QrCode className="h-4 w-4 mr-1" />
              核销
            </TabsTrigger>
            <TabsTrigger value="tickets">
              <Ticket className="h-4 w-4 mr-1" />
              门票
            </TabsTrigger>
            <TabsTrigger value="activities">
              <Calendar className="h-4 w-4 mr-1" />
              活动
            </TabsTrigger>
          </TabsList>

          {/* 库存管理 */}
          <TabsContent value="inventory" className="mt-4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-bold">商品库存</h3>
              </div>
              <div className="divide-y">
                {inventoryItems.map(item => <div key={item.id} className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">¥{item.price}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${item.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        库存: {item.stock}
                      </span>
                      <Button variant="ghost" size="sm" className="ml-2" onClick={() => $w.utils.navigateTo({
                    pageId: 'inventory-edit',
                    params: {
                      itemId: item.id
                    }
                  })}>
                        管理
                      </Button>
                    </div>
                  </div>)}
              </div>
            </div>
          </TabsContent>

          {/* 核销功能 */}
          <TabsContent value="verify" className="mt-4">
            <div className="bg-white rounded-lg shadow overflow-hidden p-4">
              <Button className="w-full" onClick={() => $w.utils.navigateTo({
              pageId: 'verify-scan'
            })}>
                <QrCode className="h-4 w-4 mr-2" />
                扫描核销
              </Button>
            </div>
          </TabsContent>

          {/* 门票管理 */}
          <TabsContent value="tickets" className="mt-4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-bold">门票管理</h3>
              </div>
              <div className="divide-y">
                {tickets.map(ticket => <div key={ticket.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{ticket.name}</p>
                      <div className="text-sm text-gray-500">
                        已售: {ticket.sold}/{ticket.total}
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button variant="ghost" size="sm" onClick={() => $w.utils.navigateTo({
                    pageId: 'ticket-manage',
                    params: {
                      ticketId: ticket.id
                    }
                  })}>
                        管理
                      </Button>
                    </div>
                  </div>)}
              </div>
            </div>
          </TabsContent>

          {/* 活动管理 */}
          <TabsContent value="activities" className="mt-4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-bold">活动管理</h3>
              </div>
              <div className="divide-y">
                {activities.map(activity => <div key={activity.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{activity.name}</p>
                      <span className={`px-2 py-1 rounded-full text-xs ${activity.status === '进行中' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{activity.date}</p>
                    <div className="mt-2 flex justify-end">
                      <Button variant="ghost" size="sm" onClick={() => $w.utils.navigateTo({
                    pageId: 'activity-manage',
                    params: {
                      activityId: activity.id
                    }
                  })}>
                        管理
                      </Button>
                    </div>
                  </div>)}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}