// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Search, Plus, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
// @ts-ignore;
import { Button, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui';

export default function InventoryPage(props) {
  const [searchText, setSearchText] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });

  // 商品库存数据
  const [inventory, setInventory] = useState([{
    id: 1,
    name: '莫吉托',
    category: '鸡尾酒',
    stock: 15,
    price: 68,
    status: '正常'
  }, {
    id: 2,
    name: '长岛冰茶',
    category: '鸡尾酒',
    stock: 8,
    price: 78,
    status: '预警'
  }, {
    id: 3,
    name: '啤酒',
    category: '啤酒',
    stock: 32,
    price: 28,
    status: '正常'
  }]);

  // 排序函数
  const requestSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({
      key,
      direction
    });
  };

  // 排序后的数据
  const sortedInventory = [...inventory].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // 过滤搜索
  const filteredInventory = sortedInventory.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.category.toLowerCase().includes(searchText.toLowerCase()));

  // 库存状态样式
  const getStatusStyle = status => {
    switch (status) {
      case '预警':
        return 'text-yellow-500';
      case '缺货':
        return 'text-red-500';
      default:
        return 'text-green-500';
    }
  };
  return <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">商品库存管理</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          添加商品
        </Button>
      </div>

      {/* 搜索栏 */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input placeholder="搜索商品名称或分类..." className="pl-10" value={searchText} onChange={e => setSearchText(e.target.value)} />
      </div>

      {/* 库存表格 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort('name')}>
                <div className="flex items-center">
                  商品名称
                  {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort('category')}>
                <div className="flex items-center">
                  分类
                  {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => requestSort('stock')}>
                <div className="flex items-center justify-end">
                  库存
                  {sortConfig.key === 'stock' && (sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
                </div>
              </TableHead>
              <TableHead className="text-right">单价</TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort('status')}>
                <div className="flex items-center">
                  状态
                  {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
                </div>
              </TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map(item => <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">{item.stock}</TableCell>
                <TableCell className="text-right">¥{item.price}</TableCell>
                <TableCell className={getStatusStyle(item.status)}>
                  {item.status}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit2 className="h-4 w-4 mr-2" />
                        编辑
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="h-4 w-4 mr-2" />
                        删除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </div>
    </div>;
}