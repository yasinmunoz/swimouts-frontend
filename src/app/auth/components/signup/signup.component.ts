import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  errors: any = null;
  user: any;
  
  roles$: Observable<any[]> = this.authService.userRole();

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      role_id: new FormControl(undefined, [Validators.required]),
      name: new FormControl(undefined, [Validators.required]),
      surname: new FormControl(undefined, [Validators.required]),
      phone: new FormControl(
        undefined, 
        [Validators.required,
          Validators.pattern('^[679]{1}[0-9]{8}$')
        ]),
      email: new FormControl(undefined, [Validators.required, Validators.email]),
      password: new FormControl(undefined, [Validators.required, Validators.required]),
      password_confirmation: new FormControl(undefined, [Validators.required]) 
    })
  }

  get role_id () {
    return this.registerForm.get('role_id');
  }
  get name() {
    return this.registerForm.get('name');
  }
  get surname() {
    return this.registerForm.get('surname');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get password_confirmation() {
    return this.registerForm.get('password_confirmation');
  }

  ngOnInit() { }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe(
      result => {
        this.user = result.user;
        console.log(result)
      },
      error => {
        this.errors = error.error;
      },
      () => {
        this.registerForm.reset()
        this.router.navigate(['login']);
      }
    )
  }

 

  
}