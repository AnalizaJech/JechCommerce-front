import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // <-- Importante!
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, RouterModule],  // <-- Agrega RouterModule claramente aquí
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.access_token);
        const rol = JSON.parse(atob(res.access_token.split('.')[1])).rol;

        this.router.navigate([rol === 'admin' ? '/productos' : '/tienda']);
      },
      error: () => {
        alert('Usuario o contraseña incorrectos.');
      }
    });
  }
}
