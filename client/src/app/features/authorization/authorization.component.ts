import { Component, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'auth-root',
  imports: [FormsModule, NzInputModule, NzButtonModule, ReactiveFormsModule],
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  host: {
    class: 'auth-root',
  },
})
class AuthorizationComponent {
  authForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (!this.authForm.valid) return;
  }

  getFormError(field: 'name' | 'password') {
    const control = this.authForm.get(field);
    if (!control) return null;
    const keys = Object.keys(control);
    return `${field} is ${keys[0]}`;
  }
}

export default AuthorizationComponent;
