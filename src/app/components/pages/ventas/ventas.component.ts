import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../../services/venta.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-ventas',
  imports: [NgFor,NgIf,DatePipe],
  templateUrl: './ventas.component.html'
})
export class VentasComponent implements OnInit {
  ventas: any[] = [];

  constructor(private ventaService: VentaService) {}

  ngOnInit(): void {
    this.ventaService.misVentas().subscribe({
      next: (data) => this.ventas = data,
      error: () => alert('Error al cargar tus compras')
    });
  }
}
