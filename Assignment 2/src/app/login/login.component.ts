import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  registrationSuccess: boolean = false;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    console.log('Login component loaded');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.registrationSuccess = params['registrationSuccess'] === 'true';
    });
  }

  login() {
    const user = this.userService.loginUser(this.username, this.password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/profile']);
      // Optionally, notify user about successful login using a service or other means
      alert('Login successful!');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }
}
