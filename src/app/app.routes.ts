import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas específicas para ADMIN
  {
    path: 'productos',
    loadComponent: () => import('./components/pages/productos/productos.component').then(m => m.ProductosComponent),
    canActivate: [roleGuard(['admin'])]
  },
  {
    path: 'ventas',
    loadComponent: () => import('./components/pages/ventas/ventas.component').then(m => m.VentasComponent),
    canActivate: [roleGuard(['admin'])]
  },
  {
    path: 'crear-producto',
    loadComponent: () => import('./components/pages/crear-producto/crear-producto.component').then(m => m.CrearProductoComponent),
    canActivate: [roleGuard(['admin'])]
  },

  // Rutas específicas para CLIENTE
  {
    path: 'tienda',
    loadComponent: () => import('./components/pages/tienda/tienda.component').then(m => m.TiendaComponent),
    canActivate: [roleGuard(['cliente'])]
  },
  {
    path: 'carrito',
    loadComponent: () => import('./components/pages/carrito/carrito.component').then(m => m.CarritoComponent),
    canActivate: [roleGuard(['cliente'])]
  },

  {
    path: 'mis-compras',
    loadComponent: () => import('./components/pages/ventas/ventas.component').then(m => m.VentasComponent),
    canActivate: [roleGuard(['cliente'])]
  },
  
  // Ruta por defecto
  { path: '**', redirectTo: 'login' }
];
