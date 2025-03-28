// src/app/components/pages/tienda/tienda.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  standalone: true,
  imports: [NgFor,NgIf]
})
export class TiendaComponent implements OnInit {
  productos: any[] = [];

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.apiUrl}/productos`).subscribe(data => {
      this.productos = data;
    });
  }

  comprar(producto: any) {
    this.cartService.addToCart(producto);
    alert('Producto agregado al carrito 🛒');
  }
}
