import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  id: string = '';
  state: string = '';
  pincode: string = '';
  city: string = '';
  address: string = '';
  gender: string = '';
  dob: string = '';
  mobile: string = '';
  email: string = '';
  password: string = '';
  username: string = '';
  name: string = '';
  foodTaste: { spicy: boolean, sweet: boolean } = { spicy: false, sweet: false }; // Define foodTaste here

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute  // Inject ActivatedRoute
  ) {}

  createForm(): void {
    // Your form creation logic...
  }

  ngOnInit(): void {
    this.createForm();

    // Read the query parameter to check for registration success
    this.route.queryParams.subscribe(params => {
      if (params['registrationSuccess'] === 'true') {
        alert('Registration successful! You can now log in.');
      }
    });
  }

  register() {
    // Validate the form data here if needed
    const newUser = {
      id: this.username,
      name: this.name,
      username: this.username,
      password: this.password,
      email: this.email,
      mobile: this.mobile,
      dob: this.dob,
      gender: this.gender,
      address: this.address,
      city: this.city,
      pincode: this.pincode,
      state: this.state,
      foodTaste: this.foodTaste, // Use the defined foodTaste property
    };

    console.log('New User:', newUser); // Log the user object
    this.userService.registerUser(newUser);
    alert('Registration successful! You can now log in.');
    this.router.navigate(['/login'], { queryParams: { registrationSuccess: 'true' } });
  }
}
