import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
  
    // ADMIN layout con prefijo /admin
    {
      path: 'admin',
      loadComponent: () =>
        import('./components/layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
      canActivate: [roleGuard(['admin'])],
      children: [
        {
          path: 'productos',
          loadComponent: () => import('./components/pages/productos/productos.component').then(m => m.ProductosComponent),
        },
        {
          path: 'ventas',
          loadComponent: () => import('./components/pages/ventas/ventas.component').then(m => m.VentasComponent),
        },
        {
          path: 'crear-producto',
          
          loadComponent: () => import('./components/pages/crear-producto/crear-producto.component').then(m => m.CrearProductoComponent),
        },
      ]
    },
  
    // CLIENTE layout con prefijo /cliente
    {
        path: 'cliente',
        loadComponent: () =>
          import('./components/layouts/cliente-layout/cliente-layout.component').then(m => m.ClienteLayoutComponent),
        canActivate: [roleGuard(['cliente'])],
        children: [
          {
            path: '',
            redirectTo: 'tienda',
            pathMatch: 'full' // <-- importante!
          },
          {
            path: 'tienda',
            loadComponent: () => import('./components/pages/tienda/tienda.component').then(m => m.TiendaComponent),
          },
          {
            path: 'carrito',
            loadComponent: () => import('./components/pages/carrito/carrito.component').then(m => m.CarritoComponent),
          },
          {
            path: 'mis-compras',
            loadComponent: () =>
              import('./components/pages/ventas/mis-compras/mis-compras.component').then(m => m.MisComprasComponent),
          },
          
        ]
      },
  
    { path: '**', redirectTo: 'login' }
  ];
  