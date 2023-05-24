import { Component, Input } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent {
  showModal = false;
  @Input() email!:Email;
  

  constructor(private emailService: EmailService){}


  ngOnChanges(){
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`
    }
  }
  onSubmit(event: Email){
    this.emailService.sendEmail(event).subscribe(()=> this.showModal = false)
  }
}
