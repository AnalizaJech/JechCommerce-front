import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  imports: [NgFor, NgIf, FormsModule, CommonModule,RouterLink],
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  busqueda: string = '';
  page: number = 1;  // Paginación: página actual
  pageSize: number = 5;  // Número de productos por página

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  buscarProductos() {
    if (this.busqueda.trim() === '') {
      this.obtenerProductos();
    } else {
      this.productos = this.productos.filter(producto =>
        producto.nom_producto.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }
  }

  editarProducto(producto: Producto) {
    this.router.navigate(['/admin/editar-producto', producto.id_producto]);
  }

  eliminarProducto(producto: Producto) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminarProducto(producto.id_producto).subscribe(() => {
        this.obtenerProductos();
      });
    }
  }

  // Paginación: método para cambiar la página
  changePage(page: number) {
    this.page = page;
  }

  // Obtener productos de la página actual
  get paginatedProducts() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.productos.slice(start, end);
  }
}
