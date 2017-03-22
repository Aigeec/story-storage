import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { UserService } from '../../services/user/user.service';

const errorMessages = {
  409: 'User already exists',
  400: 'Invalid email address provided'
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastsManager,
    private viewContainerRef: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(viewContainerRef);
  }

  ngOnInit() { }

  onSubmit(username, password) {
    this.userService.register(username, password)
      .subscribe((result) => {
        if (result) {
          this.router.navigate(['profile']);
        }
      }, (e) => {
        this.toastr.warning(errorMessages[e.status]);
      });
  }
}
