import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';
import { map, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  selectedFiles: any

  private url: string = 'http://localhost:3000';


  constructor( private httpClient: HttpClient, private toastr: ToastrService) {}

  selectFiles(event: any ){
    this.selectedFiles = event.target.files
    console.log(this.selectedFiles[0])
  }

  upload(): any {
    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': ''});
    // let options = { headers };

    if(this.selectedFiles) {

      const formData: FormData = new FormData();
      formData.append('file', this.selectedFiles[0]);
     console.log('form', formData)
      this.httpClient
        .post(`${this.url}/upload`, formData)
        .subscribe((res: any) => {
          this.toastr.success(res.message)   
        })        
    }
    else{ 
      this.toastr.success("Please upload the File!!")      
    }
  }
}
