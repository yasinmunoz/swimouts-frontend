import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// User interface
export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  // User registration
  register(user: User): Observable<any> {
    return this.http.post(environment.origin +'auth/register', user);
  }

  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(environment.origin +'auth/login', user);
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get(environment.origin +'auth/user-profile');
  }

  // User role
  userRole(): Observable<any[]> {
    return this.http.get(environment.origin + 'users/roles', {}) as Observable<any[]>;
  }

}