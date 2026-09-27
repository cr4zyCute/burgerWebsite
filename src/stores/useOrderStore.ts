import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderStatus } from '../types';

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'BC-849201',
    customerName: 'Marcus Vance',
    customerEmail: 'admin@burgercraft.com',
    customerPhone: '+1 (555) 234-8901',
    fulfillmentType: 'delivery',
    deliveryAddress: {
      street: '725 5th Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10022',
    },
    items: [
      {
        id: 'oi-1',
        productId: 'prod-1',
        name: 'The Double Smash King',
        quantity: 2,
        unitPrice: 1450,
        totalPrice: 2900,
        modifiers: [
          { groupId: 'bun-choice', groupName: 'Bun Style', optionId: 'opt-brioche', optionName: 'Classic Butter Toasted Brioche', price: 0 },
        ],
      },
      {
        id: 'oi-2',
        productId: 'prod-5',
        name: 'Hand-Cut Parmesan Truffle Fries',
        quantity: 1,
        unitPrice: 675,
        totalPrice: 675,
        modifiers: [],
      },
    ],
    subtotal: 3575,
    discount: 500,
    couponCode: 'FEAST5',
    deliveryFee: 0,
    tax: 254,
    tip: 400,
    total: 3729, // $37.29
    status: 'completed',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(), note: 'Order placed' },
      { status: 'confirmed', timestamp: new Date(Date.now() - 3600000 * 24 * 2 + 120000).toISOString(), note: 'Kitchen accepted' },
      { status: 'completed', timestamp: new Date(Date.now() - 3600000 * 24 * 2 + 1800000).toISOString(), note: 'Delivered by courier' },
    ],
  },
  {
    id: 'ord-102',
    orderNumber: 'BC-938210',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '+1 (555) 345-6789',
    fulfillmentType: 'pickup',
    pickupBranch: 'Downtown Flagship & Grill',
    items: [
      {
        id: 'oi-3',
        productId: 'prod-2',
        name: 'Smoked Bourbon Bacon Burger',
        quantity: 1,
        unitPrice: 1575,
        totalPrice: 1575,
        modifiers: [],
      },
      {
        id: 'oi-4',
        productId: 'prod-8',
        name: 'Madagascar Vanilla Bean Shake',
        quantity: 1,
        unitPrice: 650,
        totalPrice: 650,
        modifiers: [],
      },
    ],
    subtotal: 2225,
    discount: 0,
    deliveryFee: 0,
    tax: 184,
    tip: 300,
    total: 2709,
    status: 'preparing',
    paymentMethod: 'apple_pay',
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
    updatedAt: new Date(Date.now() - 1200000).toISOString(),
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 1800000).toISOString() },
      { status: 'confirmed', timestamp: new Date(Date.now() - 1500000).toISOString() },
      { status: 'preparing', timestamp: new Date(Date.now() - 1200000).toISOString(), note: 'Patties searing on grill' },
    ],
  },
  {
    id: 'ord-103',
    orderNumber: 'BC-472911',
    customerName: 'Liam Chen',
    customerEmail: 'liam.chen@example.com',
    customerPhone: '+1 (555) 789-0123',
    fulfillmentType: 'delivery',
    deliveryAddress: {
      street: '124 Atlantic Ave, Apt 4B',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
    },
    items: [
      {
        id: 'oi-5',
        productId: 'prod-7',
        name: 'Double Smash Feast Combo',
        quantity: 2,
        unitPrice: 2095,
        totalPrice: 4190,
        modifiers: [],
      },
    ],
    subtotal: 4190,
    discount: 838,
    couponCode: 'SMASH20',
    deliveryFee: 0,
    tax: 276,
    tip: 500,
    total: 4128,
    status: 'ready',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 2700000).toISOString(), // 45 mins ago
    updatedAt: new Date(Date.now() - 600000).toISOString(),
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 2700000).toISOString() },
      { status: 'confirmed', timestamp: new Date(Date.now() - 2400000).toISOString() },
      { status: 'preparing', timestamp: new Date(Date.now() - 1800000).toISOString() },
      { status: 'ready', timestamp: new Date(Date.now() - 600000).toISOString(), note: 'Packed and waiting for pickup' },
    ],
  },
  {
    id: 'ord-104',
    orderNumber: 'BC-112398',
    customerName: 'Alex Rivera',
    customerEmail: 'alex.r@example.com',
    customerPhone: '+1 (555) 901-2345',
    fulfillmentType: 'delivery',
    deliveryAddress: {
      street: '340 W 42nd St',
      city: 'New York',
      state: 'NY',
      zipCode: '10036',
    },
    items: [
      {
        id: 'oi-6',
        productId: 'prod-3',
        name: 'Firebird Nashville Hot Chicken',
        quantity: 1,
        unitPrice: 1395,
        totalPrice: 1395,
        modifiers: [],
      },
      {
        id: 'oi-7',
        productId: 'prod-6',
        name: 'Smoky Chipotle Onion Rings',
        quantity: 1,
        unitPrice: 595,
        totalPrice: 595,
        modifiers: [],
      },
    ],
    subtotal: 1990,
    discount: 0,
    deliveryFee: 399,
    tax: 164,
    tip: 350,
    total: 2903,
    status: 'completed',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    statusHistory: [
      { status: 'completed', timestamp: new Date(Date.now() - 3600000 * 24 * 5).toISOString() },
    ],
  },
];

interface OrderState {
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'statusHistory' | 'createdAt' | 'updatedAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  refundOrder: (orderId: string, reason: string) => void;
  getOrderById: (id: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
  getOrdersByEmail: (email: string) => Order[];
  getRecentOrders: (limit?: number) => Order[];
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: INITIAL_ORDERS,

      createOrder: (orderData) => {
        const now = new Date().toISOString();
        const newOrder: Order = {
          ...orderData,
          id: `ord-${Date.now()}`,
          createdAt: now,
          updatedAt: now,
          statusHistory: [
            {
              status: orderData.status || 'pending',
              timestamp: now,
              note: 'Order successfully placed',
            },
          ],
        };

        set((state) => ({ orders: [newOrder, ...state.orders] }));
        return newOrder;
      },

      updateOrderStatus: (orderId, status, note) => {
        const now = new Date().toISOString();
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.id === orderId) {
              return {
                ...o,
                status,
                updatedAt: now,
                statusHistory: [
                  ...o.statusHistory,
                  {
                    status,
                    timestamp: now,
                    note: note || `Status updated to ${status.replace('_', ' ')}`,
                  },
                ],
              };
            }
            return o;
          }),
        }));
      },

      refundOrder: (orderId, reason) => {
        const now = new Date().toISOString();
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.id === orderId) {
              return {
                ...o,
                status: 'refunded',
                paymentStatus: 'refunded',
                updatedAt: now,
                statusHistory: [
                  ...o.statusHistory,
                  {
                    status: 'refunded',
                    timestamp: now,
                    note: `Refund issued: ${reason}`,
                  },
                ],
              };
            }
            return o;
          }),
        }));
      },

      getOrderById: (id) => get().orders.find((o) => o.id === id),
      getOrderByNumber: (orderNumber) =>
        get().orders.find((o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase()),
      getOrdersByEmail: (email) =>
        get().orders.filter((o) => o.customerEmail.toLowerCase() === email.toLowerCase()),
      getRecentOrders: (limit = 10) => get().orders.slice(0, limit),
    }),
    {
      name: 'burger-craft-orders',
    }
  )
);
