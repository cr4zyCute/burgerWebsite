import React, { useState } from 'react';
import { Search, Filter, Printer, RefreshCw, Eye, CheckCircle, XCircle } from 'lucide-react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { useOrderStore } from '../../stores/useOrderStore';
import { formatMoney, formatDateTime } from '../../lib/utils';
import { Order, OrderStatus } from '../../types';
import { Modal } from '../../components/ui/Modal';

export const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus, refundOrder } = useOrderStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [refundReason, setRefundReason] = useState('');
  const [showRefundInput, setShowRefundInput] = useState(false);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (status: OrderStatus) => {
    if (!selectedOrder) return;
    updateOrderStatus(selectedOrder.id, status);
    setSelectedOrder({ ...selectedOrder, status });
  };

  const handleRefund = () => {
    if (!selectedOrder || !refundReason) return;
    refundOrder(selectedOrder.id, refundReason);
    setSelectedOrder({ ...selectedOrder, status: 'refunded', paymentStatus: 'refunded' });
    setShowRefundInput(false);
    setRefundReason('');
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <AdminHeader
        title="Kitchen & Courier Orders Management"
        subtitle="Live ticket dispatch, status workflows, receipt printing, and refund processing."
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1 max-w-7xl mx-auto w-full">
        {/* Filters */}
        <div className="bg-white border-2 border-[#171717] p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#77736E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by order #, customer, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-[#171717] text-xs font-display font-bold uppercase cursor-pointer"
            >
              <option value="all">All Statuses ({orders.length})</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">On Cast Iron</option>
              <option value="ready">Ready</option>
              <option value="completed">Completed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white border-4 border-[#171717] shadow-[6px_6px_0px_0px_#171717] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-body">
              <thead>
                <tr className="bg-[#171717] text-white uppercase font-display font-bold text-sm tracking-wider">
                  <th className="py-3 px-4">Order #</th>
                  <th className="py-3 px-4">Customer Details</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Items Summary</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD3]">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#77736E]">
                      No orders match the selected search or status criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FAF8F3] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-sm text-[#171717]">
                        #{ord.orderNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#171717]">{ord.customerName}</div>
                        <div className="text-[11px] text-[#77736E]">{ord.customerPhone}</div>
                      </td>
                      <td className="py-3.5 px-4 font-display font-bold text-xs uppercase">
                        {ord.fulfillmentType}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate text-[#77736E]">
                        {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                      </td>
                      <td className="py-3.5 px-4 font-display font-black text-base text-[#171717]">
                        {formatMoney(ord.total)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-bold uppercase font-display px-2 py-0.5 border ${
                            ord.status === 'completed'
                              ? 'bg-green-100 text-green-900 border-green-300'
                              : ord.status === 'preparing'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : ord.status === 'refunded'
                              ? 'bg-red-100 text-red-900 border-red-300'
                              : 'bg-[#F5F0E6] text-[#A82D24] border-[#E5DFD3]'
                          }`}
                        >
                          {ord.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-3 py-1 bg-[#171717] hover:bg-[#A82D24] text-white font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Inspect Ticket
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details & Workflow Modal */}
      {selectedOrder && (
        <Modal
          isOpen={!!selectedOrder}
          onClose={() => {
            setSelectedOrder(null);
            setShowRefundInput(false);
          }}
          title={`Order Ticket #${selectedOrder.orderNumber}`}
          maxWidth="lg"
        >
          <div className="space-y-6">
            {/* Status Workflow Progression Buttons */}
            <div className="bg-[#171717] text-white p-4 space-y-2">
              <span className="text-[10px] font-display font-bold uppercase tracking-wider text-[#E9B949]">
                Update Kitchen Workflow Status
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {(['confirmed', 'preparing', 'ready', 'completed'] as OrderStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(st)}
                    className={`px-3 py-1.5 font-display font-black text-xs uppercase tracking-wider border cursor-pointer ${
                      selectedOrder.status === st
                        ? 'bg-[#A82D24] text-white border-white'
                        : 'bg-[#2A2A2A] text-white hover:bg-[#383838] border-[#444444]'
                    }`}
                  >
                    Mark {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2">
              <h4 className="font-display font-black text-lg uppercase text-[#171717]">
                Ordered Items
              </h4>
              <div className="divide-y divide-[#E5DFD3] border border-[#E5DFD3] bg-white p-3 space-y-2">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="pt-2 first:pt-0 flex justify-between items-start text-xs">
                    <div>
                      <strong className="text-sm font-display uppercase block">
                        {item.quantity}x {item.name}
                      </strong>
                      {item.modifiers && item.modifiers.length > 0 && (
                        <div className="text-[11px] text-[#77736E]">
                          {item.modifiers.map((m) => m.optionName).join(', ')}
                        </div>
                      )}
                      {item.specialInstructions && (
                        <div className="text-[11px] text-[#A82D24] italic">
                          Special Note: {item.specialInstructions}
                        </div>
                      )}
                    </div>
                    <span className="font-bold font-display text-sm">
                      {formatMoney(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer & Fulfillment Info */}
            <div className="grid grid-cols-2 gap-4 text-xs font-body bg-[#F5F0E6] p-4 border border-[#E5DFD3]">
              <div>
                <strong className="uppercase font-display block mb-1">
                  Customer Information
                </strong>
                <p>{selectedOrder.customerName}</p>
                <p>{selectedOrder.customerPhone}</p>
                <p>{selectedOrder.customerEmail}</p>
              </div>
              <div>
                <strong className="uppercase font-display block mb-1">
                  Fulfillment Information
                </strong>
                <p className="uppercase font-bold text-[#A82D24]">
                  {selectedOrder.fulfillmentType}
                </p>
                {selectedOrder.deliveryAddress && (
                  <p>
                    {selectedOrder.deliveryAddress.street}, {selectedOrder.deliveryAddress.city}
                  </p>
                )}
                {selectedOrder.pickupBranch && <p>Branch: {selectedOrder.pickupBranch}</p>}
              </div>
            </div>

            {/* Refund Action */}
            <div className="pt-4 border-t border-[#E5DFD3] flex items-center justify-between">
              {showRefundInput ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter reason for refund..."
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#171717]"
                  />
                  <button
                    onClick={handleRefund}
                    className="px-3 py-1.5 bg-[#A82D24] text-white text-xs font-display font-bold uppercase"
                  >
                    Confirm Refund
                  </button>
                  <button
                    onClick={() => setShowRefundInput(false)}
                    className="px-3 py-1.5 bg-gray-200 text-xs font-bold font-display uppercase"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowRefundInput(true)}
                    disabled={selectedOrder.status === 'refunded'}
                    className="text-xs font-display font-bold uppercase text-[#A82D24] hover:underline disabled:opacity-30 cursor-pointer"
                  >
                    Issue Permitted Refund
                  </button>
                  <span className="font-display font-black text-xl text-[#171717]">
                    Total: {formatMoney(selectedOrder.total)}
                  </span>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
