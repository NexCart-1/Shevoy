export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'cod' | 'paytm' | 'gpay' | 'phonepe';
}

export const PREPAID_DISCOUNT = 99;
export const UPI_ID = '9172066749@ybl';
export const OWNER_EMAIL = 'haribhai4646@gmail.com';
export const INSTAGRAM_LINK = 'https://www.instagram.com/nex_cart_official?igsh=MjcybzgwMGZtOHpo';
