// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas con layout de Sidebar (solo para admin)
  {
    path: '',
    loadComponent: () =>
      import('./components/shared/sidebar/sidebar.component').then(
        (m) => m.SidebarComponent
      ),
    canActivate: [roleGuard(['admin'])],
    children: [
      {
        path: 'productos',
        loadComponent: () =>
          import('./components/pages/productos/productos.component').then(
            (m) => m.ProductosComponent
          ),
      },
      {
        path: 'ventas',
        loadComponent: () =>
          import('./components/pages/ventas/ventas.component').then(
            (m) => m.VentasComponent
          ),
      },
      {
        path: 'crear-producto',
        loadComponent: () =>
          import(
            './components/pages/crear-producto/crear-producto.component'
          ).then((m) => m.CrearProductoComponent),
      },
    ],
  },

  // Cliente
  {
    path: 'tienda',
    loadComponent: () =>
      import('./components/pages/tienda/tienda.component').then(
        (m) => m.TiendaComponent
      ),
    canActivate: [roleGuard(['cliente'])],
  },
  {
    path: 'carrito',
    loadComponent: () =>
      import('./components/pages/carrito/carrito.component').then(
        (m) => m.CarritoComponent
      ),
    canActivate: [roleGuard(['cliente'])],
  },

  // Redirección por defecto
  { path: '**', redirectTo: 'login' },
];
