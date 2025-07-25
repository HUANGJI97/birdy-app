// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { QrCode, ChevronLeft, ChevronRight, Calendar, Users } from 'lucide-react';
// @ts-ignore;
import { Button, Badge, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';

import TabBar from '@/components/TabBar';
export default function HomePage(props) {
  const {
    $w
  } = props;

  // 广告位轮播图数据
  const banners = [{
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500",
    link: "#promo1",
    alt: "新用户专享优惠"
  }, {
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
    link: "#promo2",
    alt: "限时特惠套餐"
  }];

  // 推荐酒水数据
  const featuredDrinks = [{
    id: 1,
    name: "莫吉托",
    price: 68,
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=500"
  }, {
    id: 2,
    name: "长岛冰茶",
    price: 78,
    image: "https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=500"
  }];

  // 日常运营活动数据
  const activities = [{
    id: 1,
    title: "周三女士之夜",
    description: "每周三女士可享特调鸡尾酒半价优惠",
    date: "每周三 20:00-23:00",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500",
    price: 88,
    status: "报名中",
    participants: [{
      id: 1,
      name: "用户A",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    }, {
      id: 2,
      name: "用户B",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    }, {
      id: 3,
      name: "用户C",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    }]
  }, {
    id: 2,
    title: "周末DJ派对",
    description: "特邀知名DJ现场表演，限量早鸟票",
    date: "每周五、六 22:00-02:00",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500",
    price: 128,
    status: "即将开始",
    participants: [{
      id: 4,
      name: "用户D",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    }, {
      id: 5,
      name: "用户E",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    }]
  }];
  const [currentBanner, setCurrentBanner] = useState(0);
  const [activeActivity, setActiveActivity] = useState(null);

  // 轮播图切换
  const nextBanner = () => {
    setCurrentBanner(prev => (prev + 1) % banners.length);
  };
  const prevBanner = () => {
    setCurrentBanner(prev => (prev - 1 + banners.length) % banners.length);
  };

  // 报名活动
  const signUpActivity = activityId => {
    $w.utils.showToast({
      title: '报名成功',
      description: `已成功报名活动 ${activityId}`,
      status: 'success'
    });
  };
  return <div className="flex flex-col h-screen bg-gray-50">
      {/* 广告位轮播图区域 */}
      <div className="relative h-48 w-full">
        <a href={banners[currentBanner].link} className="block h-full">
          <img src={banners[currentBanner].image} alt={banners[currentBanner].alt} className="w-full h-full object-cover" />
        </a>
        <button onClick={prevBanner} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full hover:bg-black/50 transition">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button onClick={nextBanner} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full hover:bg-black/50 transition">
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {banners.map((_, index) => <button key={index} onClick={() => setCurrentBanner(index)} className={`h-1 w-4 rounded-full transition ${currentBanner === index ? 'bg-white' : 'bg-white/50'}`} aria-label={`切换到第${index + 1}张广告`} />)}
        </div>
      </div>

      {/* 推荐酒水区域 */}
      <div className="px-4 mt-4">
        <h2 className="text-lg font-bold mb-2">今日特调</h2>
        <div className="flex overflow-x-auto space-x-4 pb-2">
          {featuredDrinks.map(drink => <div key={drink.id} className="flex-shrink-0 w-40 bg-white rounded-lg shadow overflow-hidden">
              <img src={drink.image} alt={drink.name} className="w-full h-24 object-cover" />
              <div className="p-2">
                <h3 className="font-medium">{drink.name}</h3>
                <p className="text-red-500 font-bold">¥{drink.price}</p>
              </div>
            </div>)}
        </div>
      </div>

      {/* 日常运营活动区域 */}
      <div className="px-4 mt-4">
        <h2 className="text-lg font-bold mb-2">BirdyHomebar 日常活动</h2>
        <div className="space-y-4">
          {activities.map(activity => <div key={activity.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img src={activity.image} alt={activity.title} className="w-full h-32 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{activity.title}</h3>
                  <Badge variant="secondary">{activity.status}</Badge>
                </div>
                <p className="text-gray-600 mb-2">{activity.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{activity.date}</span>
                </div>
                
                {/* 报名用户头像 */}
                <div className="flex items-center mb-4">
                  <div className="flex -space-x-2">
                    {activity.participants.map(user => <Avatar key={user.id} className="h-8 w-8 border-2 border-white">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>)}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    {activity.participants.length}人已报名
                  </span>
                </div>

                <Button className="w-full" onClick={() => $w.utils.navigateTo({
              pageId: 'activity-detail',
              params: {
                activityId: activity.id
              }
            })}>
                  <Users className="mr-2 h-4 w-4" />
                  立即报名 ¥{activity.price}
                </Button>
              </div>
            </div>)}
        </div>
      </div>

      {/* 底部导航 */}
      <div className="mt-auto">
        <TabBar active="home" onTabChange={tabId => $w.utils.navigateTo({
        pageId: tabId
      })} />
      </div>
    </div>;
}