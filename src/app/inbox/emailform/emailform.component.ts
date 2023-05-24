import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Email } from '../email';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-emailform',
  templateUrl: './emailform.component.html',
  styleUrls: ['./emailform.component.css']
})
export class EmailformComponent {

  emailForm! : FormGroup;
  @Input() email!: Email;

  @Output() emailSubmit = new EventEmitter();
  ngOnInit(){
    const { subject, from, to, text} = this.email;

    this.emailForm = new FormGroup({
      to : new FormControl(to, [Validators.email, Validators.required]),
      from: new FormControl({value: from, disabled: true}),
      subject: new FormControl(subject,[ Validators.required]),
      text: new FormControl(text, [Validators.required]),
    })
  }

  onSubmit(){
    if (this.emailForm.invalid) return;

    this.emailSubmit.emit(this.emailForm.value)
  }


}
