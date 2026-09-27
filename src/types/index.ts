export type Role = 'super_admin' | 'admin' | 'content_editor' | 'order_manager' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  phoneNumber?: string;
  createdAt: string;
}

export type ProductCategory = 'burgers' | 'chicken' | 'sides' | 'combos' | 'drinks' | 'desserts';

export interface ModifierOption {
  id: string;
  name: string;
  price: number; // in cents
  isDefault?: boolean;
  calories?: number;
}

export interface ModifierGroup {
  id: string;
  name: string;
  description?: string;
  minSelect: number;
  maxSelect: number;
  required: boolean;
  options: ModifierOption[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number; // in cents
  compareAtPrice?: number;
  description: string;
  fullDescription?: string;
  imageUrl: string;
  galleryImages: string[];
  ingredients: string[];
  allergens: string[];
  dietary: ('gluten-free' | 'halal' | 'vegetarian' | 'spicy' | 'chef-choice')[];
  calories?: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  salesCount: number;
  rating: number;
  reviewCount: number;
  modifierGroups?: ModifierGroup[];
}

export interface SelectedModifier {
  groupId: string;
  groupName: string;
  optionId: string;
  optionName: string;
  price: number;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  quantity: number;
  selectedModifiers: SelectedModifier[];
  specialInstructions?: string;
  unitPrice: number; // base price + modifiers
  totalPrice: number; // unitPrice * quantity
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 'card' | 'cod' | 'gcash' | 'maya' | 'apple_pay';
export type FulfillmentType = 'delivery' | 'pickup';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  modifiers: SelectedModifier[];
  specialInstructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  fulfillmentType: FulfillmentType;
  pickupBranch?: string;
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    instructions?: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  tax: number;
  tip: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
}

export interface Promotion {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 20 for 20% or 500 for $5.00
  minOrderAmount: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  timesUsed: number;
  isActive: boolean;
  eligibleCategories?: ProductCategory[];
  bannerText?: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  productName?: string;
  date: string;
  isApproved: boolean;
  isFeatured: boolean;
  avatarUrl?: string;
}

export interface RestaurantLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  hours: string;
  imageUrl: string;
  mapCoordinates: { lat: number; lng: number };
  supportsPickup: boolean;
  supportsDelivery: boolean;
}

// Visual CMS Homepage section types
export type SectionType =
  | 'announcement'
  | 'hero'
  | 'categories'
  | 'signature_burgers'
  | 'promo_feature'
  | 'why_choose_us'
  | 'best_sellers'
  | 'build_burger'
  | 'brand_story'
  | 'reviews'
  | 'locations'
  | 'newsletter'
  | 'social_gallery'
  | 'footer';

export interface CmsSection<T = any> {
  id: string;
  type: SectionType;
  title: string;
  isVisible: boolean;
  content: T;
}

export interface HeroSlide {
  id: string;
  imageUrl: string;
  imageAlt: string;
  badge?: string;
  label?: string;
}

export interface HeroContent {
  badge: string;
  headline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  imageUrl: string;
  imageAlt: string;
  backgroundColor: string;
  textColor: string;
  statsValue: string;
  statsLabel: string;
  bgStyle?: 'dark-grill' | 'warm-craft' | 'artisan-grid' | 'clean';
  bgImageUrl?: string;
  bgOverlayOpacity?: number;
  slides?: HeroSlide[];
}

export interface PromoFeatureContent {
  tag: string;
  headline: string;
  description: string;
  discountBadge: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
}

export interface BrandStoryContent {
  eyebrow: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  stat1Number: string;
  stat1Label: string;
  stat2Number: string;
  stat2Label: string;
  imageUrl: string;
}

export interface WhyChooseUsItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

export interface WhyChooseUsContent {
  tagline: string;
  heading: string;
  items: WhyChooseUsItem[];
}

export interface MediaAsset {
  id: string;
  fileName: string;
  url: string;
  fileSize: number;
  mimeType: string;
  altText: string;
  category: 'products' | 'restaurant' | 'hero' | 'ingredients' | 'branding';
  createdAt: string;
  usageCount: number;
}
