import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-crear-producto',
  imports: [FormsModule,NgIf],
  templateUrl: './crear-producto.component.html',
})
export class CrearProductoComponent {
  form = {
    nom_producto: '',
    descripcion: '',
    precio: null as number | null,
    is_oferta: false,
    porcentaje_oferta: null as number | null,
  };

  constructor(private http: HttpClient) {}

  crearProducto() {
    const body = {
      ...this.form,
      precio: this.form.precio ?? 0,
      porcentaje_oferta: this.form.porcentaje_oferta ?? 0,
    };

    this.http.post(`${environment.apiUrl}/productos`, body).subscribe({
      next: () => {
        alert('Producto creado correctamente ✅');
        this.form = {
          nom_producto: '',
          descripcion: '',
          precio: null,
          is_oferta: false,
          porcentaje_oferta: null,
        };
      },
      error: () => alert('Error al crear producto ❌'),
    });
  }
}
