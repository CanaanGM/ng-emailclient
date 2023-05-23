import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from './email';


interface EmailSummary{
  id: string
  subject: string
  from: string
}


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  
  URL:string = "https://api.angular-email.com/";
  
  getEmailById(id: string) {
    return this.httpClient.get<Email>(`${this.URL}emails/${id}`)

  }


  constructor(private httpClient : HttpClient) { }

  getEmails () {
    return this.httpClient.get<EmailSummary[]>(`${this.URL}emails`)
      .pipe(

        )
  }

}
