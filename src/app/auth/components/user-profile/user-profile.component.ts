import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';


// User interface
export class User {
  name!: String;
  email!: String;
  role_id!: Number;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  UserProfile!: User;

  roles$: Observable<any[]> = this.authService.userRole();

  constructor(
    public authService: AuthService
  ) {
    this.authService.profileUser().subscribe((data:any) => {
      console.log(data)
      this.UserProfile = data;      
    })
  }

  ngOnInit() { }

}