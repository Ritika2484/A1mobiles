'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedStorage?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string, selectedStorage?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string, selectedStorage?: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  cartTotal: number;
  couponCode: string;
  appliedCoupon: string | null;
  couponDiscount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('a1_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
      const savedCoupon = localStorage.getItem('a1_coupon');
      if (savedCoupon) {
        setAppliedCoupon(savedCoupon);
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('a1_cart', JSON.stringify(cart));
      if (appliedCoupon) {
        localStorage.setItem('a1_coupon', appliedCoupon);
      } else {
        localStorage.removeItem('a1_coupon');
      }
    }
  }, [cart, appliedCoupon, isLoaded]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string,
    selectedStorage?: string
  ) => {
    const color = selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
    const storage = selectedStorage || (product.storageOptions && product.storageOptions.length > 0 ? product.storageOptions[0] : undefined);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedStorage === storage
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedColor: color, selectedStorage: storage }];
      }
    });

    showToast(`Added "${product.name}" to cart`, 'success');
  };

  const removeFromCart = (
    productId: string,
    selectedColor?: string,
    selectedStorage?: string
  ) => {
    setCart((prev) => {
      const itemToRemove = prev.find(
        (item) =>
          item.product.id === productId &&
          (selectedColor === undefined || item.selectedColor === selectedColor) &&
          (selectedStorage === undefined || item.selectedStorage === selectedStorage)
      );

      if (itemToRemove) {
        showToast(`Removed "${itemToRemove.product.name}" from cart`, 'info');
      }

      return prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (selectedColor === undefined || item.selectedColor === selectedColor) &&
            (selectedStorage === undefined || item.selectedStorage === selectedStorage)
          )
      );
    });
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    selectedColor?: string,
    selectedStorage?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor, selectedStorage);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          (selectedColor === undefined || item.selectedColor === selectedColor) &&
          (selectedStorage === undefined || item.selectedStorage === selectedStorage)
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Coupons
  let couponDiscount = 0;
  if (appliedCoupon === 'A1SPECIAL' && subtotal > 0) {
    couponDiscount = Math.min(2000, Math.round(subtotal * 0.1));
  } else if (appliedCoupon === 'WELCOME10' && subtotal > 0) {
    couponDiscount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'UPGRADE5000' && subtotal >= 50000) {
    couponDiscount = 5000;
  }

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = Math.max(0, subtotal - couponDiscount + shipping);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'A1SPECIAL' || cleanCode === 'WELCOME10' || cleanCode === 'UPGRADE5000') {
      setAppliedCoupon(cleanCode);
      showToast(`Coupon "${cleanCode}" applied successfully!`, 'success');
      return true;
    } else {
      showToast(`Invalid coupon code "${code}". Try A1SPECIAL or WELCOME10`, 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discount: couponDiscount,
        shipping,
        total,
        cartTotal: total,
        couponCode,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
