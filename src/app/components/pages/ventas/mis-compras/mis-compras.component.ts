import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mis-compras',
  standalone: true,
  imports: [CommonModule, RouterModule,NgIf,NgFor],
  templateUrl: './mis-compras.component.html',
})
export class MisComprasComponent implements OnInit {
  compras: any[] = [];
  cargando = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.http.get('http://localhost:3000/ventas/mis-compras', {
      headers: {
        Authorization: `Bearer ${token || ''}`,
      },
    }).subscribe({
      next: (res: any) => {
        this.compras = res;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
        alert('Error al cargar tus compras.');
      }
    });
  }
}
