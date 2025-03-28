// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';

export interface CartItem {
  id_producto: number;
  nom_producto: string;
  precio_final: number;
  cantidad: number;
  // puedes agregar más campos si los necesitas para mostrar
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: CartItem[] = [];
  private storageKey = 'cart';

  constructor() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.cart = JSON.parse(stored);
    }
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(product: Omit<CartItem, 'cantidad'>, cantidad: number = 1): void {
    const existing = this.cart.find(p => p.id_producto === product.id_producto);
    if (existing) {
      existing.cantidad += cantidad;
    } else {
      this.cart.push({ ...product, cantidad });
    }
    this.saveCart();
  }

  updateQuantity(id_producto: number, cantidad: number): void {
    const item = this.cart.find(p => p.id_producto === id_producto);
    if (item) {
      item.cantidad = cantidad;
      if (item.cantidad <= 0) {
        this.removeFromCart(id_producto);
      } else {
        this.saveCart();
      }
    }
  }

  removeFromCart(id_producto: number): void {
    this.cart = this.cart.filter(p => p.id_producto !== id_producto);
    this.saveCart();
  }

  clearCart(): void {
    this.cart = [];
    this.saveCart();
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.precio_final * item.cantidad, 0);
  }

  private saveCart(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
  }
}
