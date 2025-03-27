import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentaService } from '../../../services/venta.service';
import { environment } from '../../../environments/environment';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tienda',
  imports: [NgFor],
  templateUrl: './tienda.component.html',
})
export class TiendaComponent implements OnInit {
  productos: any[] = [];

  constructor(
    private http: HttpClient,
    private ventaService: VentaService
  ) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.apiUrl}/productos`)
      .subscribe(data => this.productos = data);
  }

  comprar(producto: any) {
    this.ventaService.comprar(producto.id_producto).subscribe({
      next: () => alert(`¡Compra realizada de ${producto.nom_producto}!`),
      error: () => alert('Error al procesar la compra')
    });
  }
}
