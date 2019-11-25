import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  isLoading = false;

  onLogin(form: NgForm): void {
    console.log(form.value);
  }
}
