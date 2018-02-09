import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import { AuthenticationService } from '../../services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  model: any = {};
  loader = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(){
    // reset signin status
    this.authenticationService.signout();
  
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submit(){
    this.loader = true;
    this.authenticationService.signin(this.model.username, this.model.password)
    .subscribe(data => {
      this.router.navigate([this.returnUrl]);
    },
    error => {
      // this.alertService.error(error);
      this.loader = false;
    })
  }
}
