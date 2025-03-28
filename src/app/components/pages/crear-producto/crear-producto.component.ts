import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';  // Cambiado para importar los controles
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-crear-producto',
  imports: [FormsModule, NgIf, RouterLink,ReactiveFormsModule],
  templateUrl: './crear-producto.component.html',
})
export class CrearProductoComponent {
  // Definir el formulario reactivo usando FormGroup
  form: FormGroup;

  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      nom_producto: new FormControl(''),
      descripcion: new FormControl(''),
      precio: new FormControl(null),
      stock: new FormControl(null),  // Usando FormControl para stock
      is_oferta: new FormControl(false),
      porcentaje_oferta: new FormControl(null),
    });
  }

  crearProducto() {
    // Validación de campos obligatorios
    if (this.form.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }
  
    // Asegurarse de que stock es un número y mayor o igual a 0
    const stock = this.form.value.stock;
    if (isNaN(stock) || stock < 0) {
      alert('El campo "Stock" debe ser un número válido y mayor o igual a 0.');
      return;
    }
  
    // Preparar el cuerpo de la solicitud
    const body = this.form.value;  // Usando los valores del formulario
  
    // Hacer la solicitud POST a la API
    this.http.post(`${environment.apiUrl}/productos`, body).subscribe({
      next: () => {
        alert('Producto creado correctamente ✅');
        // Limpiar los campos después de la creación
        this.form.reset();
      },
      error: () => alert('Error al crear producto ❌'),
    });
  }
}
