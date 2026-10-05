export type MenuCategory = 
  | 'all'
  | 'starters'
  | 'woodfire'
  | 'pastas'
  | 'garden'
  | 'sweets'
  | 'beverages';

export type DietaryTag = 'Gluten-Free' | 'Vegetarian' | 'Dairy-Free' | 'Chef Signature';

export interface CustomOption {
  name: string;
  choices: {
    label: string;
    extraPrice?: number;
  }[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'woodfire' | 'pastas' | 'garden' | 'sweets' | 'beverages';
  price: number;
  description: string;
  provenance: string;
  dietary: DietaryTag[];
  winePairing?: string;
  calories?: number;
  image?: string;
  woodfireHeat?: string;
  options?: CustomOption[];
}

export interface CartItemOptionChoice {
  groupName: string;
  choiceLabel: string;
  extraPrice: number;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  selectedOptions: CartItemOptionChoice[];
  specialInstructions?: string;
  image?: string;
}

export type SeatingArea = 
  | 'Hearth Main Room'
  | "Chef's Counter (Live Plating)"
  | 'Glass Conservatory Courtyard'
  | "Sommelier's Private Cellar";

export interface ReservationBooking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  partySize: number;
  seatingArea: SeatingArea;
  occasion: string;
  dietaryNotes: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface PlacedOrder {
  orderNumber: string;
  items: CartItem[];
  fulfillmentType: 'pickup' | 'delivery';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress?: string;
  pickupTimeSlot?: string;
  subtotal: number;
  tax: number;
  gratuity: number;
  deliveryFee: number;
  total: number;
  status: 'received' | 'in_hearth' | 'packaged' | 'ready';
  estimatedMinutes: number;
  placedAt: string;
}
