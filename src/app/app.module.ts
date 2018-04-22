import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import {
  GoogleApiModule, GoogleApiService, GoogleAuthService, NgGapiClientConfig, NG_GAPI_CONFIG, GoogleApiConfig
} from "ng-gapi";
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ClassroomProvider } from '../providers/classroom/classroom';
import {CreateCourseWorkPage} from "../pages/create-course-work/create-course-work";

let gapiClientConfig: NgGapiClientConfig = {
  client_id: '326279213296-i4p3nvg0r7dq50gp7m36d4q118cok04b.apps.googleusercontent.com',
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest"],
  scope: [
    /** View and manage announcements in Google Classroom */
    'https://www.googleapis.com/auth/classroom.announcements',
    /** View announcements in Google Classroom */
    'https://www.googleapis.com/auth/classroom.announcements.readonly',
    /** Manage your Google Classroom classes */
    'https://www.googleapis.com/auth/classroom.courses',
    /** View your Google Classroom classes */
    'https://www.googleapis.com/auth/classroom.courses.readonly',
    /** Manage your course work and view your grades in Google Classroom */
    'https://www.googleapis.com/auth/classroom.coursework.me',
    /** View your course work and grades in Google Classroom */
    'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
    /** Manage course work and grades for students in the Google Classroom classes you teach and view the course work and grades for classes you administer */
    'https://www.googleapis.com/auth/classroom.coursework.students',
    /** View course work and grades for students in the Google Classroom classes you teach or administer */
    'https://www.googleapis.com/auth/classroom.coursework.students.readonly',
    /** View your Google Classroom guardians */
    'https://www.googleapis.com/auth/classroom.guardianlinks.me.readonly',
    /** View and manage guardians for students in your Google Classroom classes */
    'https://www.googleapis.com/auth/classroom.guardianlinks.students',
    /** View guardians for students in your Google Classroom classes */
    'https://www.googleapis.com/auth/classroom.guardianlinks.students.readonly',
    /** View the email addresses of people in your classes */
    'https://www.googleapis.com/auth/classroom.profile.emails',
    /** View the profile photos of people in your classes */
    'https://www.googleapis.com/auth/classroom.profile.photos',
    /** Manage your Google Classroom class rosters */
    'https://www.googleapis.com/auth/classroom.rosters',
    /** View your Google Classroom class rosters */
    'https://www.googleapis.com/auth/classroom.rosters.readonly',
    /** View your course work and grades in Google Classroom */
    'https://www.googleapis.com/auth/classroom.student-submissions.me.readonly',
    /** View course work and grades for students in the Google Classroom classes you teach or administer */
    'https://www.googleapis.com/auth/classroom.student-submissions.students.readonly',
  ]
    .join(" ")
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CreateCourseWorkPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CreateCourseWorkPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    ClassroomProvider
  ]
})
export class AppModule {}
