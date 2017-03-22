import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastsManager,
    private viewContainerRef: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(viewContainerRef);
  }

  ngOnInit() {
  }

  onSubmit(username, password) {
    this.userService.login(username, password).subscribe((result) => {
      if (result) {
        this.router.navigate(['profile']);
      }
    }, (e) => {
      this.toastr.warning('Email or password incorrect');
    });
  }

}
