import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // <-- Agrega claramente esta línea
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, RouterModule],  // <-- Añade claramente RouterModule aquí
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user = { nom_persona: '', username: '', password: '', rol: 'cliente' };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => alert('Error en el registro. Inténtalo nuevamente.')
    });
  }
}
