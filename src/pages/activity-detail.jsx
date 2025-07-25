// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { ChevronLeft, MapPin, Clock, Users } from 'lucide-react';
// @ts-ignore;
import { Button, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';

export default function ActivityDetail(props) {
  const {
    $w
  } = props;
  const activityId = $w.page.dataset.params.activityId;

  // 活动数据
  const activity = {
    id: activityId,
    title: "周末DJ派对",
    description: "特邀知名DJ现场表演，限量早鸟票。活动包含酒水无限畅饮和专业摄影师跟拍。请穿着时尚休闲装出席。",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500",
    location: "BirdyHomebar 旗舰店",
    date: "每周五、六 22:00-02:00",
    price: 128,
    participants: [{
      id: 1,
      name: "用户A",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }, {
      id: 2,
      name: "用户B",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }]
  };
  const handleSignUp = () => {
    $w.utils.navigateTo({
      pageId: 'activity-signup',
      params: {
        activityId: activity.id
      }
    });
  };
  return <div className="flex flex-col h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => $w.utils.navigateBack()}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-center flex-grow">活动详情</h1>
        </div>
      </div>

      {/* 活动主图 */}
      <div className="relative">
        <img src={activity.image} alt={activity.title} className="w-full h-48 object-cover" />
      </div>

      {/* 活动信息 */}
      <div className="bg-white p-4 shadow-sm">
        <h2 className="text-xl font-bold mb-2">{activity.title}</h2>
        
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{activity.location}</span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>{activity.date}</span>
        </div>
        
        <p className="text-gray-600 mb-4">{activity.description}</p>
        
        {/* 已报名用户 */}
        <div className="border-t border-gray-100 pt-4">
          <h3 className="font-semibold mb-2">已报名({activity.participants.length}人)</h3>
          <div className="flex -space-x-2">
            {activity.participants.map(user => <Avatar key={user.id} className="h-8 w-8 border-2 border-white">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>)}
          </div>
        </div>
      </div>

      {/* 报名按钮 */}
      <div className="mt-auto bg-white p-4 shadow-lg">
        <Button className="w-full" onClick={handleSignUp}>
          <Users className="mr-2 h-4 w-4" />
          立即报名 ¥{activity.price}
        </Button>
      </div>
    </div>;
}