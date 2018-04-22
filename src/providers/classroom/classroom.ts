import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {UserServiceProvider} from "../user-service/user-service";
//import {GoogleApiService} from "ng-gapi";

@Injectable()
export class ClassroomProvider {

 // private readonly API_URL: string = 'https://classroom.googleapis.com';

//  private API_KEY = 'AIzaSyCTt5N2ZPGGNeUgM8kpqHeNS0V7VpaWBcg';

  constructor(private httpClient: HttpClient, public http: HttpClient, private userService: UserServiceProvider, // public newGapi: GoogleApiService
               ) {


  }


  // authtoken as parameter only for demo purpose , better use a UserService to get the token
  /*public findById(spreadsheetId: string, authtoken: string): Observable<any> {
    return this.httpClient.get(this.API_URL + '/' + spreadsheetId, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authtoken}`
      })
    });
  }

  public create(authtoken: string): Observable<any> {
    return this.httpClient.post(this.API_URL,{}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authtoken}`
      })
    });
  }


  public listCourses() {
    gapi.client.courses.list({
      pageSize: 10
    }).then(function(response) {
      var courses = response.result.courses;
      //appendPre('Courses:');

      if (courses.length > 0) {
        for (let i = 0; i < courses.length; i++) {
          var course = courses[i];
       //   appendPre(course.name)
        }
      } else {
      //  appendPre('No courses found.');
      }
    });
  }*/



  public signIn() {
    this.userService.signIn();
  }










}











