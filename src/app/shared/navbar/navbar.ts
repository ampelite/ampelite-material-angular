import { Component, NgModule, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatMenuModule, MatIconModule } from '@angular/material';
import { Router, RouterModule } from '@angular/router';
// import {ThemePickerModule} from '../theme-picker/theme-picker';
import { SECTIONS } from '../documentation-items/documentation-items';

import { UserService } from '../../services/index'
import { User } from '../../models'

const SECTIONS_KEYS = Object.keys(SECTIONS);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavBar implements OnInit {
  currentUser: User;
  users: User[] = [];
  isSignIn = false;
  constructor(private router: Router) {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    // localStorage.getItem('currentUser') && (this.isSignIn = true);
  }

  getIsSignIn() {
    return localStorage.getItem('currentUser') ? true : false;
  }

  get sections() {
    return SECTIONS;
  }

  get sectionKeys() {
    return SECTIONS_KEYS;
  }

  signOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['sign-in']);
  }

  // private loadAllUsers() {
  //   this.userService.getAll().subscribe(users => { this.users = users; });
  // }

}

@NgModule({
  imports: [MatButtonModule, MatMenuModule, MatIconModule, RouterModule, CommonModule], // , ThemePickerModule
  exports: [NavBar],
  declarations: [NavBar],
})
export class NavBarModule { }
