import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cliente-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink,NgIf],
  templateUrl: './cliente-layout.component.html',
})
export class ClienteLayoutComponent implements OnInit {
  user: any = null;
  cartCount = 0;
  showMenu = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    // más adelante aquí conectas tu servicio de carrito
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.authService.logout();
  }
}
