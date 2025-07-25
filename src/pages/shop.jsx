// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ShoppingCart, Heart } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

import ProductCard from '@/components/ProductCard';
export default function ShopPage(props) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);

  // 分类数据
  const categories = [{
    id: 'all',
    name: '全部'
  }, {
    id: 'electronics',
    name: '电子产品'
  }, {
    id: 'clothing',
    name: '服装'
  }, {
    id: 'food',
    name: '食品'
  }, {
    id: 'home',
    name: '家居'
  }];

  // 商品数据
  const products = {
    all: [{
      id: 1,
      name: '无线蓝牙耳机',
      price: 199,
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    }, {
      id: 2,
      name: '智能手表',
      price: 599,
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500'
    }, {
      id: 3,
      name: '纯棉T恤',
      price: 99,
      category: 'clothing',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
    }],
    electronics: [{
      id: 1,
      name: '无线蓝牙耳机',
      price: 199,
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    }, {
      id: 2,
      name: '智能手表',
      price: 599,
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500'
    }],
    clothing: [{
      id: 3,
      name: '纯棉T恤',
      price: 99,
      category: 'clothing',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
    }],
    food: [],
    home: []
  };
  const toggleFavorite = productId => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };
  return <div className="flex flex-col h-screen">
      <div className="p-4 flex-1 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">BirdyHomebar 点单</h1>
        
        {/* 分类导航 - 隐藏滚动条 */}
        <div className="mb-4 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 pb-2">
            {categories.map(category => <Button key={category.id} variant={activeCategory === category.id ? 'default' : 'outline'} className="whitespace-nowrap rounded-full" onClick={() => setActiveCategory(category.id)}>
                {category.name}
              </Button>)}
          </div>
        </div>

        {/* 商品列表 */}
        <div className="grid grid-cols-2 gap-4">
          {products[activeCategory].map(product => <ProductCard key={product.id} product={product} isFavorite={favorites.includes(product.id)} onFavoriteToggle={toggleFavorite} />)}
        </div>
      </div>

      {/* 底部购物车栏 */}
      <div className="bg-white border-t border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {props.$w.cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {props.$w.cartCount}
              </span>}
          </Button>
          <span className="ml-2 font-bold">¥{props.$w.cartTotal}</span>
          <Button disabled={props.$w.cartCount === 0}>
            下单
          </Button>
        </div>
      </div>
    </div>;
}