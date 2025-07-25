// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, ShoppingCart, Ticket, User } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export default function TabBar({
  active,
  onTabChange
}) {
  const tabs = [{
    id: 'home',
    icon: Home,
    label: '首页'
  }, {
    id: 'shop',
    icon: ShoppingCart,
    label: '点单'
  }, {
    id: 'ticket',
    icon: Ticket,
    label: '门票'
  }, {
    id: 'profile',
    icon: User,
    label: '我的'
  }];
  return <div className="flex justify-around items-center p-2 border-t bg-white">
      {tabs.map(tab => <Button key={tab.id} variant={active === tab.id ? 'default' : 'ghost'} className="flex-col h-auto p-2" onClick={() => onTabChange(tab.id)}>
          <tab.icon className="h-5 w-5" />
          <span className="text-xs mt-1">{tab.label}</span>
        </Button>)}
    </div>;
}