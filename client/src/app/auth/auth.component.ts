import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginPage = true;
  isLoading = false;
  showError = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'login') {
      this.loginPage = true;
    }
    if (this.route.snapshot.url[0].path === 'register') {
      this.loginPage = false;
    }
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!form.valid) {
      this.setError('Please enter valid details');
      return;
    }
    this.isLoading = true;
    if (!this.loginPage) {
      this.authService
        .register(form.value)
        .pipe(
          catchError((err) => {
            console.log(err);
            const error = new Error(err.error.message);
            this.setError(error.message);
            this.isLoading = false;
            return throwError(() => error);
          })
        )
        .subscribe((res) => {
          console.log(res);
          const user = { ...res.user };
          this.authService.saveToLocalStorage(user);
          this.isLoading = false;
          this.router.navigate(['/']);
        });
    } else {
      this.authService
        .login(form.value)
        .pipe(
          catchError((err) => {
            console.log(err);
            const error = new Error(err.error.message);
            this.setError(error.message);
            this.isLoading = false;
            return throwError(() => error);
          })
        )
        .subscribe((res) => {
          console.log(res);
          const user = { ...res.user };
          this.authService.saveToLocalStorage(user);
          this.isLoading = false;
          // if (!user.isAdmin) {
          //   this.router.navigate(['/']);
          //   return;
          // }
          this.router.navigate(['/']);
        });
    }
  }

  setError(errorMessage: string) {
    this.showError = true;
    this.errorMessage = errorMessage;
    setTimeout(() => {
      this.showError = false;
      this.errorMessage = '';
    }, 3000);
  }
}
