// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Filter, Calendar, Ticket as TicketIcon, Gift, ShoppingCart } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

import TabBar from '@/components/TabBar';
import TicketCard from '@/components/TicketCard';
export default function TicketPage(props) {
  const {
    $w
  } = props;
  const [activeFilter, setActiveFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const ticketTypes = [{
    id: 'all',
    name: '全部'
  }, {
    id: 'concert',
    name: '音乐会'
  }, {
    id: 'exhibition',
    name: '展览'
  }, {
    id: 'sports',
    name: '体育赛事'
  }, {
    id: 'multi-pass',
    name: '次卡'
  }];
  const dateOptions = [{
    id: 'all',
    name: '全部日期'
  }, {
    id: 'today',
    name: '今天'
  }, {
    id: 'weekend',
    name: '本周末'
  }, {
    id: 'month',
    name: '本月'
  }];
  const tickets = [{
    id: 1,
    name: '夏季音乐会',
    type: 'concert',
    price: 180,
    date: '2025-07-20 19:30',
    venue: '城市音乐厅',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500'
  }, {
    id: 2,
    name: '现代艺术展',
    type: 'exhibition',
    price: 80,
    date: '2025-07-15 10:00',
    venue: '艺术博物馆',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500'
  }, {
    id: 3,
    name: '足球联赛',
    type: 'sports',
    price: 120,
    date: '2025-07-25 20:00',
    venue: '体育中心',
    image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=500'
  }, {
    id: 4,
    name: 'BirdyHomebar 3次卡',
    type: 'multi-pass',
    price: 288,
    date: '2025-07-01 18:00',
    venue: 'BirdyHomebar',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc1c17d5453?w=500',
    usageLimit: 3,
    validityDays: 30
  }, {
    id: 5,
    name: 'BirdyHomebar 5次卡',
    type: 'multi-pass',
    price: 388,
    date: '2025-07-01 18:00',
    venue: 'BirdyHomebar',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc1c17d5453?w=500',
    usageLimit: 5,
    validityDays: 60
  }];
  const handleTabChange = tabId => {
    props.$w.utils.navigateTo({
      pageId: tabId
    });
  };
  const filteredTickets = tickets.filter(ticket => {
    const typeMatch = activeFilter === 'all' || ticket.type === activeFilter;
    return typeMatch;
  });
  const handleBuy = ticketId => {
    $w.utils.navigateTo({
      pageId: 'ticket-purchase',
      params: {
        ticketId: ticketId
      }
    });
  };
  const handleGift = ticketId => {
    $w.utils.navigateTo({
      pageId: 'ticket-gift',
      params: {
        ticketId: ticketId
      }
    });
  };
  return <div className="flex flex-col h-screen bg-gray-50">
      {/* 顶部筛选 */}
      <div className="bg-white sticky top-0 z-10 p-4 shadow-sm">
        <div className="flex items-center mb-4">
          <Filter className="text-gray-500 mr-2" />
          <div className="flex overflow-x-auto space-x-2">
            {ticketTypes.map(type => <Button key={type.id} variant={activeFilter === type.id ? 'default' : 'secondary'} className="rounded-full px-3" onClick={() => setActiveFilter(type.id)}>
                {type.name}
              </Button>)}
          </div>
        </div>
        
        <div className="flex items-center">
          <Calendar className="text-gray-500 mr-2" />
          <div className="flex overflow-x-auto space-x-2">
            {dateOptions.map(date => <Button key={date.id} variant={dateFilter === date.id ? 'default' : 'secondary'} className="rounded-full px-3" onClick={() => setDateFilter(date.id)}>
                {date.name}
              </Button>)}
          </div>
        </div>
      </div>
      
      {/* 门票列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {filteredTickets.map(ticket => <div key={ticket.id} className="bg-white rounded-lg shadow overflow-hidden">
              <TicketCard ticket={ticket} onSelect={() => {
            $w.utils.navigateTo({
              pageId: 'ticket-detail',
              params: {
                ticketId: ticket.id
              }
            });
          }} />
              <div className="p-4 flex space-x-2">
                <Button variant="outline" className="flex-1" onClick={() => handleGift(ticket.id)}>
                  <Gift className="h-4 w-4 mr-2" />
                  赠送
                </Button>
                <Button className="flex-1" onClick={() => handleBuy(ticket.id)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  购买
                </Button>
              </div>
            </div>)}
        </div>
      </div>
      
      {/* 底部导航 */}
      <TabBar active="ticket" onTabChange={handleTabChange} />
    </div>;
}