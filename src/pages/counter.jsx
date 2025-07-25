// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Check, Clock, Utensils, Truck, CheckCircle, Archive, User } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardHeader, CardTitle, CardContent, CardFooter, Badge, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';

export default function CounterPage(props) {
  const {
    $w
  } = props;

  // 订单状态枚举(中文)
  const ORDER_STATUS = {
    PENDING: '待处理',
    PREPARING: '备餐中',
    READY: '已备好',
    SERVED: '已上菜',
    COMPLETED: '已完成'
  };

  // 订单数据（包含用户信息）
  const [orders, setOrders] = useState([{
    id: '1',
    tableNumber: 'A1',
    customer: {
      name: '张三',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      phone: '138****1234'
    },
    items: [{
      name: '招牌汉堡',
      quantity: 1
    }, {
      name: '可乐',
      quantity: 2
    }],
    status: ORDER_STATUS.PENDING,
    createdAt: new Date()
  }, {
    id: '2',
    tableNumber: 'B3',
    customer: {
      name: '李四',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      phone: '139****5678'
    },
    items: [{
      name: '薯条',
      quantity: 1
    }, {
      name: '橙汁',
      quantity: 1
    }],
    status: ORDER_STATUS.PREPARING,
    createdAt: new Date(Date.now() - 1000 * 60 * 5)
  }, {
    id: '3',
    tableNumber: 'C2',
    customer: {
      name: '王五',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      phone: '137****9012'
    },
    items: [{
      name: '沙拉',
      quantity: 1
    }],
    status: ORDER_STATUS.COMPLETED,
    createdAt: new Date(Date.now() - 1000 * 60 * 30)
  }]);

  // 更新订单状态
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders => prevOrders.map(order => order.id === orderId ? {
      ...order,
      status: newStatus
    } : order));
  };

  // 获取状态图标
  const getStatusIcon = status => {
    switch (status) {
      case ORDER_STATUS.PENDING:
        return <Clock className="h-4 w-4" />;
      case ORDER_STATUS.PREPARING:
        return <Utensils className="h-4 w-4" />;
      case ORDER_STATUS.READY:
        return <Truck className="h-4 w-4" />;
      case ORDER_STATUS.SERVED:
        return <Check className="h-4 w-4" />;
      case ORDER_STATUS.COMPLETED:
        return <Archive className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // 获取状态颜色
  const getStatusColor = status => {
    switch (status) {
      case ORDER_STATUS.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case ORDER_STATUS.PREPARING:
        return 'bg-blue-100 text-blue-800';
      case ORDER_STATUS.READY:
        return 'bg-green-100 text-green-800';
      case ORDER_STATUS.SERVED:
        return 'bg-purple-100 text-purple-800';
      case ORDER_STATUS.COMPLETED:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">当前订单</h1>
      
      <div className="space-y-4">
        {orders.map(order => <Card key={order.id} className="border rounded-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>桌号: {order.tableNumber}</CardTitle>
                  <div className="flex items-center mt-2 space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={order.customer.avatar} />
                      <AvatarFallback>
                        <User className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{order.customer.name}</p>
                      <p className="text-xs text-gray-500">{order.customer.phone}</p>
                    </div>
                  </div>
                </div>
                <Badge className={`${getStatusColor(order.status)} px-3 py-1 rounded-full text-xs`}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2">
                {order.items.map((item, index) => <div key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="font-medium">x{item.quantity}</span>
                  </div>)}
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end space-x-2">
              {order.status === ORDER_STATUS.PENDING && <Button onClick={() => updateOrderStatus(order.id, ORDER_STATUS.PREPARING)}>
                  开始备餐
                </Button>}
              
              {order.status === ORDER_STATUS.PREPARING && <Button onClick={() => updateOrderStatus(order.id, ORDER_STATUS.READY)}>
                  备餐完成
                </Button>}
              
              {order.status === ORDER_STATUS.READY && <Button onClick={() => updateOrderStatus(order.id, ORDER_STATUS.SERVED)}>
                  已上菜
                </Button>}
              
              {order.status === ORDER_STATUS.SERVED && <Button onClick={() => updateOrderStatus(order.id, ORDER_STATUS.COMPLETED)}>
                  完成订单
                </Button>}
            </CardFooter>
          </Card>)}
      </div>
    </div>;
}