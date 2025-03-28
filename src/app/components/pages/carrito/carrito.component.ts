import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf, NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
})
export class CarritoComponent implements OnInit {
  cart: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  eliminar(id: number): void {
    this.cartService.removeFromCart(id);
    this.cart = this.cartService.getCart();
  }

  actualizarCantidad(id: number, cantidad: number): void {
    if (cantidad < 1) return;
    this.cartService.updateQuantity(id, cantidad);
    this.cart = this.cartService.getCart();
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  confirmarCompra(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión para realizar una compra.');
      return;
    }

    const payload = this.cart.map(item => ({
      id_producto: item.id_producto,
      cantidad: item.cantidad
    }));

    this.http.post('http://localhost:3000/ventas', payload, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        alert('Compra realizada con éxito');
        this.cartService.clearCart();
        this.cart = [];
        this.router.navigate(['/cliente/mis-compras']);
      },
      error: err => {
        alert('Error al realizar la compra: ' + (err.error?.message || ''));
        console.error(err);
      }
    });
  }
}
