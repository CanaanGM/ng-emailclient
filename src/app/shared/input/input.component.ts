import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @Input() label = '';
  @Input() control! : FormControl 
  @Input() inputType! : string  
  @Input() controlType : string = "input";  

  showErrors(){
    const {dirty, touched, errors} = this.control;

    return dirty && touched && errors;
  }
}
