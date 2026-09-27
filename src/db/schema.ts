import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).default(false),
  image: text('image'),
  role: text('role').default('customer').notNull(), // super_admin, admin, content_editor, order_manager, customer
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const accounts = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  expiresAt: integer('expires_at'),
  passwordHash: text('password_hash'),
});

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: integer('expires_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
});

export const verificationTokens = sqliteTable('verification_tokens', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expires_at').notNull(),
});

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  imageUrl: text('image_url'),
  sortOrder: integer('sort_order').default(0).notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
});

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  categoryId: text('category_id').references(() => categories.id),
  description: text('description').notNull(),
  fullDescription: text('full_description'),
  price: integer('price').notNull(), // stored in cents (minor currency units)
  compareAtPrice: integer('compare_at_price'),
  imageUrl: text('image_url').notNull(),
  calories: integer('calories'),
  isAvailable: integer('is_available', { mode: 'boolean' }).default(true).notNull(),
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false).notNull(),
  isBestSeller: integer('is_best_seller', { mode: 'boolean' }).default(false).notNull(),
  salesCount: integer('sales_count').default(0).notNull(),
  rating: integer('rating').default(50).notNull(), // 48 = 4.8
  reviewCount: integer('review_count').default(0).notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const productImages = sqliteTable('product_images', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  altText: text('alt_text'),
  sortOrder: integer('sort_order').default(0).notNull(),
});

export const modifierGroups = sqliteTable('modifier_groups', {
  id: text('id').primaryKey(),
  productId: text('product_id').references(() => products.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  minSelect: integer('min_select').default(0).notNull(),
  maxSelect: integer('max_select').default(1).notNull(),
  required: integer('required', { mode: 'boolean' }).default(false).notNull(),
});

export const modifierOptions = sqliteTable('modifier_options', {
  id: text('id').primaryKey(),
  groupId: text('group_id').notNull().references(() => modifierGroups.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  price: integer('price').default(0).notNull(), // in cents
  isDefault: integer('is_default', { mode: 'boolean' }).default(false).notNull(),
});

export const locations = sqliteTable('locations', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  zipCode: text('zip_code').notNull(),
  phone: text('phone').notNull(),
  hours: text('hours').notNull(),
  imageUrl: text('image_url').notNull(),
  latitude: text('latitude').notNull(),
  longitude: text('longitude').notNull(),
  supportsPickup: integer('supports_pickup', { mode: 'boolean' }).default(true).notNull(),
  supportsDelivery: integer('supports_delivery', { mode: 'boolean' }).default(true).notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
});

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  orderNumber: text('order_number').notNull().unique(),
  userId: text('user_id').references(() => users.id),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull(),
  fulfillmentType: text('fulfillment_type').notNull(), // delivery | pickup
  pickupBranch: text('pickup_branch'),
  deliveryStreet: text('delivery_street'),
  deliveryCity: text('delivery_city'),
  deliveryState: text('delivery_state'),
  deliveryZip: text('delivery_zip'),
  subtotal: integer('subtotal').notNull(), // in cents
  discount: integer('discount').default(0).notNull(),
  couponCode: text('coupon_code'),
  deliveryFee: integer('delivery_fee').default(0).notNull(),
  tax: integer('tax').notNull(),
  tip: integer('tip').default(0).notNull(),
  total: integer('total').notNull(),
  status: text('status').notNull(), // pending, confirmed, preparing, ready, out_for_delivery, completed, cancelled, refunded
  paymentMethod: text('payment_method').notNull(),
  paymentStatus: text('payment_status').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const orderItems = sqliteTable('order_items', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  productId: text('product_id').notNull().references(() => products.id),
  name: text('name').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: integer('unit_price').notNull(),
  totalPrice: integer('total_price').notNull(),
  modifiersJson: text('modifiers_json'),
  specialInstructions: text('special_instructions'),
});

export const orderStatusHistory = sqliteTable('order_status_history', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  status: text('status').notNull(),
  note: text('note'),
  timestamp: text('timestamp').notNull(),
});

export const promotions = sqliteTable('promotions', {
  id: text('id').primaryKey(),
  code: text('code').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  discountType: text('discount_type').notNull(), // percentage | fixed
  discountValue: integer('discount_value').notNull(),
  minOrderAmount: integer('min_order_amount').default(0).notNull(),
  maxDiscount: integer('max_discount'),
  startDate: text('start_date').notNull(),
  endDate: text('end_date').notNull(),
  usageLimit: integer('usage_limit').default(100).notNull(),
  timesUsed: integer('times_used').default(0).notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
  bannerText: text('banner_text'),
});

export const reviews = sqliteTable('reviews', {
  id: text('id').primaryKey(),
  customerName: text('customer_name').notNull(),
  rating: integer('rating').notNull(), // 1 to 5
  comment: text('comment').notNull(),
  productName: text('product_name'),
  isApproved: integer('is_approved', { mode: 'boolean' }).default(true).notNull(),
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false).notNull(),
  avatarUrl: text('avatar_url'),
  date: text('date').notNull(),
});

export const newsletterSubscribers = sqliteTable('newsletter_subscribers', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  subscribedAt: text('subscribed_at').notNull(),
  consentGiven: integer('consent_given', { mode: 'boolean' }).default(true).notNull(),
});

export const contactMessages = sqliteTable('contact_messages', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').default('unread').notNull(),
  createdAt: text('created_at').notNull(),
});

export const mediaAssets = sqliteTable('media_assets', {
  id: text('id').primaryKey(),
  fileName: text('file_name').notNull(),
  url: text('url').notNull(),
  fileSize: integer('file_size').notNull(),
  mimeType: text('mime_type').notNull(),
  altText: text('alt_text').notNull(),
  category: text('category').notNull(),
  createdAt: text('created_at').notNull(),
  usageCount: integer('usage_count').default(1).notNull(),
});

export const pageSections = sqliteTable('page_sections', {
  id: text('id').primaryKey(),
  pageSlug: text('page_slug').notNull(), // 'home', 'about', etc.
  type: text('type').notNull(),
  title: text('title').notNull(),
  contentJson: text('content_json').notNull(),
  sortOrder: integer('sort_order').notNull(),
  isVisible: integer('is_visible', { mode: 'boolean' }).default(true).notNull(),
  version: integer('version').default(1).notNull(),
  isDraft: integer('is_draft', { mode: 'boolean' }).default(false).notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const siteSettings = sqliteTable('site_settings', {
  id: text('id').primaryKey(),
  restaurantName: text('restaurant_name').notNull(),
  tagline: text('tagline').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  address: text('address').notNull(),
  currency: text('currency').default('USD').notNull(),
  currencySymbol: text('currency_symbol').default('$').notNull(),
  taxRate: integer('tax_rate').default(825).notNull(), // 8.25% in basis points
  deliveryFee: integer('delivery_fee').default(399).notNull(), // $3.99
  freeDeliveryThreshold: integer('free_delivery_threshold').default(3500).notNull(), // $35.00
  announcementActive: integer('announcement_active', { mode: 'boolean' }).default(true).notNull(),
  announcementText: text('announcement_text').notNull(),
  announcementLink: text('announcement_link'),
});

export const adminAuditLogs = sqliteTable('admin_audit_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  userName: text('user_name').notNull(),
  action: text('action').notNull(),
  details: text('details').notNull(),
  timestamp: text('timestamp').notNull(),
  ipAddress: text('ip_address'),
});
