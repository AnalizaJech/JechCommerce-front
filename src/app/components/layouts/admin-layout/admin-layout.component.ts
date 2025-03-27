import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgClass,RouterLink],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent implements OnInit {
  user: any;
  isCollapsed = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.authService.logout();
  }
}
