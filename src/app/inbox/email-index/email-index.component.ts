import { Component } from '@angular/core';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css']
})
export class EmailIndexComponent {
  constructor(private emailService:EmailService){}

  emails : any[] = []
  ngOnInit() {
    this.emailService.getEmails()
      .subscribe((emails) => {this.emails = emails})
  }
}
