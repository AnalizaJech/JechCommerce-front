import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VentaService {
  private api = `${environment.apiUrl}/ventas`;

  constructor(private http: HttpClient) {}

  comprar(id_producto: number): Observable<any> {
    return this.http.post(this.api, { id_producto });
  }

  misVentas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/mis-compras`);
  }
}
