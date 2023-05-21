import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent {
  constructor(private authService: AuthService, private rotuer: Router) {}

  ngOnInit(){
    this.authService.signout().subscribe(res => console.log(res))
    this.rotuer.navigateByUrl('/')
  }

}
