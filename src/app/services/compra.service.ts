// src/app/services/compra.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; // tu archivo de configuración de URL de API
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  apiUrl = environment.apiUrl; // la URL base de tu API

  constructor(private http: HttpClient) {}

  procesarCompra(carrito: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/comprar`, { productos: carrito });
  }
}
