import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { AuthStateService } from '../../services/auth-state.service';
import * as moment from 'moment';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  errors:any = null;
  user:any = null;
  currentYear:number = moment().year();
  
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
  ) {
    this.loginForm = this.fb.group({
      email: [],
      password: []
    })
  }

  ngOnInit() { }

  onSubmit() {        
      this.authService.signin(this.loginForm.value).subscribe(
        result => {
          this.user = result.user;      
          console.log(result);
          this.responseHandler(result);
        },
        error => {
          this.errors = error.error;
        },() => {          
          this.authState.setAuthState(true);
          this.loginForm.reset()          
          this.router.navigate(['profile']);
        }
      );
  }

  // Handle response
  responseHandler(data: any){
    this.token.handleData(data.access_token);
  }

}