// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Settings, Heart, Ticket, History } from 'lucide-react';
// @ts-ignore;
import { Avatar, AvatarImage, AvatarFallback, Button } from '@/components/ui';

import TabBar from '@/components/TabBar';
export default function ProfilePage(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('all');
  const user = $w.auth.currentUser || {
    name: '未登录用户',
    avatarUrl: ''
  };
  const orders = [{
    id: '20250715001',
    date: '2025-07-15',
    status: 'completed',
    items: [{
      name: '招牌汉堡套餐',
      price: 48,
      quantity: 1
    }],
    total: 48
  }, {
    id: '20250714002',
    date: '2025-07-14',
    status: 'pending',
    items: [{
      name: '经典炸鸡桶',
      price: 68,
      quantity: 1
    }],
    total: 68
  }];
  const features = [{
    id: 'favorites',
    icon: Heart,
    name: '我的收藏'
  }, {
    id: 'coupons',
    icon: Ticket,
    name: '优惠券'
  }, {
    id: 'history',
    icon: History,
    name: '浏览历史'
  }, {
    id: 'settings',
    icon: Settings,
    name: '设置'
  }];
  const viewOrderDetail = orderId => {
    $w.utils.navigateTo({
      pageId: 'order',
      params: {
        orderId
      }
    });
  };
  const handleTabChange = tabId => {
    props.$w.utils.navigateTo({
      pageId: tabId
    });
  };
  return <div className="flex flex-col h-screen bg-gray-50">
      {/* 个人信息 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 pt-12 pb-16">
        <div className="flex items-center">
          <Avatar className="h-16 w-16 border-2 border-white">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-blue-100">普通会员</p>
          </div>
        </div>
      </div>

      {/* 功能入口 */}
      <div className="bg-white rounded-lg shadow mx-4 -mt-8 p-4 grid grid-cols-4 gap-4 relative z-10">
        {features.map(feature => <button key={feature.id} className="flex flex-col items-center" onClick={() => $w.utils.navigateTo({
        pageId: feature.id
      })}>
            <feature.icon className="h-6 w-6 text-blue-500" />
            <span className="text-xs mt-1">{feature.name}</span>
          </button>)}
      </div>

      {/* 订单筛选 */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold mb-3">我的订单</h2>
        <div className="flex space-x-2 mb-4">
          <Button variant={activeTab === 'all' ? 'default' : 'secondary'} onClick={() => setActiveTab('all')}>
            全部
          </Button>
          <Button variant={activeTab === 'pending' ? 'default' : 'secondary'} onClick={() => setActiveTab('pending')}>
            待支付
          </Button>
          <Button variant={activeTab === 'completed' ? 'default' : 'secondary'} onClick={() => setActiveTab('completed')}>
            已完成
          </Button>
        </div>
      </div>

      {/* 订单列表 */}
      <div className="flex-1 overflow-y-auto px-4">
        {orders.filter(order => activeTab === 'all' || order.status === activeTab).map(order => <div key={order.id} className="bg-white rounded-lg shadow p-4 mb-3" onClick={() => viewOrderDetail(order.id)}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">订单号: #{order.id}</span>
              <span className={`text-sm ${order.status === 'completed' ? 'text-green-500' : 'text-orange-500'}`}>
                {order.status === 'completed' ? '已完成' : '待支付'}
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-2">{order.date}</p>
            <div className="border-t pt-2">
              {order.items.map((item, index) => <div key={index} className="flex justify-between text-sm mb-1">
                  <span>{item.name} ×{item.quantity}</span>
                  <span>¥{item.price * item.quantity}</span>
                </div>)}
            </div>
            <div className="border-t mt-2 pt-2 flex justify-between">
              <span>合计:</span>
              <span className="font-bold">¥{order.total}</span>
            </div>
          </div>)}
      </div>

      {/* 底部导航 */}
      <TabBar active="profile" onTabChange={handleTabChange} />
    </div>;
}