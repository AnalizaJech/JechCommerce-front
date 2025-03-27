import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const token = localStorage.getItem('token');

    if (!token) {
      router.navigate(['/login']);
      return false;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userRole = decodedToken.rol;

    if (!allowedRoles.includes(userRole)) {
      router.navigate(['/login']); // O redirigir a otra ruta específica
      return false;
    }

    return true;
  };
};
