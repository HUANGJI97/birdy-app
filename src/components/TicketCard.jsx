// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Plus, Minus } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export default function TicketCard({
  ticket
}) {
  const [quantity, setQuantity] = useState(0);
  return <div className="bg-gradient-to-br from-gray-50 to-gray-200 rounded-lg shadow p-4">
      <h3 className="font-bold text-lg mb-2">{ticket.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{ticket.date} · {ticket.venue}</p>
      <div className="flex justify-between items-center">
        <span className="font-bold text-red-500">¥{ticket.price}</span>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" size="icon" className="rounded-full h-8 w-8" onClick={() => setQuantity(q => Math.max(0, q - 1))}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-6 text-center">{quantity}</span>
          <Button variant="secondary" size="icon" className="rounded-full h-8 w-8" onClick={() => setQuantity(q => q + 1)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>;
}