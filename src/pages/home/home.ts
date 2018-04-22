///<reference path="../../../node_modules/@types/gapi.client.classroom/index.d.ts"/>
import { Component } from '@angular/core';
import {NavController, AlertController, ModalController, NavParams} from 'ionic-angular';
import {ClassroomProvider} from "../../providers/classroom/classroom";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {GoogleApiService} from "ng-gapi";
import { CreateCourseWorkPage} from "../create-course-work/create-course-work";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private newCourseForm: FormGroup;
  private token: string;
  private CcWpage: CreateCourseWorkPage;
  private courses: any;
  private testRadioOpen: boolean;
  private testRadioResult: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private gclass: ClassroomProvider,
              private gapiService: GoogleApiService,  private userService: UserServiceProvider,
              private formBuilder: FormBuilder, public modalCtrl: ModalController) {

    this.newCourseForm = this.formBuilder.group({
      name: ['', Validators.required]
     // section: ['']
    });

  }

  ionViewDidLoad(){
    let that = this;
    this.gapiService.onLoad().subscribe(()=>{

      gapi.load('client', () => {

        gapi.client.setApiKey("AIzaSyCTt5N2ZPGGNeUgM8kpqHeNS0V7VpaWBcg");
        /** now we can use gapi.client */
        gapi.client.load('classroom', 'v1', () => {

         const client_id = this.gapiService.getConfig().getClientConfig().client_id;
         const scope = this.gapiService.getConfig().getClientConfig().scope;
         const immediate = true;
         gapi.auth.authorize({ client_id, scope, immediate }, authResult => {
            if (authResult && !authResult.error) {
            //  console.log(authResult);

              that.token = authResult.access_token;
              /** handle succesfull authorization */
              run();
            } else {
              /** handle authorization error */
            }
          });
         // run();
        });
        console.log(gapi.client)
      })


    });

    async function run() {
      /**
       * Creates a course.
       *
       * The user specified in `ownerId` is the owner of the created course
       * and added as a teacher.
       *
       * This method returns the following error codes:
       *
       * &#42; `PERMISSION_DENIED` if the requesting user is not permitted to create
       * courses or for access errors.
       * &#42; `NOT_FOUND` if the primary teacher is not a valid user.
       * &#42; `FAILED_PRECONDITION` if the course owner's account is disabled or for
       * the following request errors:
       * &#42; UserGroupsMembershipLimitReached
       * &#42; `ALREADY_EXISTS` if an alias was specified in the `id` and
       * already exists.
       */
      /*await gapi.client.classroom.courses.create({
        ownerId:  "me"
      });*/
      /**
       * Deletes a course.
       *
       * This method returns the following error codes:
       *
       * &#42; `PERMISSION_DENIED` if the requesting user is not permitted to delete the
       * requested course or for access errors.
       * &#42; `NOT_FOUND` if no course exists with the requested ID.
       */
      /*await gapi.client.courses.delete({
        id: "id",
      });*/
      /**
       * Returns a course.
       *
       * This method returns the following error codes:
       *
       * &#42; `PERMISSION_DENIED` if the requesting user is not permitted to access the
       * requested course or for access errors.
       * &#42; `NOT_FOUND` if no course exists with the requested ID.
       */
      /*await gapi.client.courses.get({
        id: "id",
      });*/
      /**
         * Returns a list of courses that the requesting user is permitted to view,
         * restricted to those that match the request. Returned courses are ordered by
         * creation time, with the most recently created coming first.
         *
         * This method returns the following error codes:
         *
         * &#42; `PERMISSION_DENIED` for access errors.
         * &#42; `INVALID_ARGUMENT` if the query argument is malformed.
         * &#42; `NOT_FOUND` if any users specified in the query arguments do not exist.
         */
      await gapi.client['classroom']
        .courses
        .list({
          "courseStates": ["ACTIVE"],
          "pageSize": 10,
          //  pageToken: "pageToken",
          // studentId: "studentId",
          //  teacherId: "teacherId",
      })
        .then(function(response) {
          that.courses = response.result.courses;
      });

      /**
       * Updates one or more fields in a course.
       *
       * This method returns the following error codes:
       *
       * &#42; `PERMISSION_DENIED` if the requesting user is not permitted to modify the
       * requested course or for access errors.
       * &#42; `NOT_FOUND` if no course exists with the requested ID.
       * &#42; `INVALID_ARGUMENT` if invalid fields are specified in the update mask or
       * if no update mask is supplied.
       * &#42; `FAILED_PRECONDITION` for the following request errors:
       * &#42; CourseNotModifiable
       */
     /* await gapi.client.courses.patch({
        id: "id",
        updateMask: "updateMask",
      });*/
      /**
       * Updates a course.
       *
       * This method returns the following error codes:
       *
       * &#42; `PERMISSION_DENIED` if the requesting user is not permitted to modify the
       * requested course or for access errors.
       * &#42; `NOT_FOUND` if no course exists with the requested ID.
       * &#42; `FAILED_PRECONDITION` for the following request errors:
       * &#42; CourseNotModifiable
       */
     /* await gapi.client.courses.update({
        id: "id",
      });*/
      /**
       * Accepts an invitation, removing it and adding the invited user to the
       * teachers or students (as appropriate) of the specified course. Only the
       * invited user may accept an invitation.
       *
       * This method returns the following error codes:
       *
       * &#42; `PERMISSION_DENIED` if the requesting user is not permitted to accept the
       * requested invitation or for access errors.
       * &#42; `FAILED_PRECONDITION` for the following request errors:
       * &#42; CourseMemberLimitReached
       * &#42; CourseNotModifiable
       * &#42; CourseTeacherLimitReached
       * &#42; UserGroupsMembershipLimitReached
       * &#42; `NOT_FOUND` if no invitation exists with the requested ID.
       */
     /* await gapi.client.invitations.accept({
        id: "id",
      });*/
      /**
       * Creates an invitation. Only one invitation for a user and course may exist
       * at a time. Delete and re-create an invitation to make changes.
       *
       * This method returns the following error codes:
       *
       * &#42; `PERMISSION_DENIED` if the requesting user is not permitted to create
       * invitations for this course or for access errors.
       * &#42; `NOT_FOUND` if the course or the user does not exist.
       * &#42; `FAILED_PRECONDITION` if the requested user's account is disabled or if
       * the user already has this role or a role with greater permissions.
       * &#42; `ALREADY_EXISTS` if an invitation for the specified user and course
       * already exists.
       */
   /*   await gapi.client.invitations.create({
      });*/
      /**
       * Deletes an invitation.
       *
       * This method returns the following error codes:
       *
       * &#42; `PERMISSION_DENIED` if the requesting user is not permitted to delete the
       * requested invitation or for access errors.
       * &#42; `NOT_FOUND` if no invitation exists with the requested ID.
       */
   /*   await gapi.client.invitations.delete({
        id: "id",
      });*/
      /**
       * Returns an invitation.
       *
       * This method returns the following error codes:
       *
       * &#42; `PERMISSION_DENIED` if the requesting user is not permitted to view the
       * requested invitation or for access errors.
       * &#42; `NOT_FOUND` if no invitation exists with the requested ID.
       */
      /*await gapi.client.invitations.get({
        id: "id",
      });*/
      /**
       * Returns a list of invitations that the requesting user is permitted to
       * view, restricted to those that match the list request.
       *
       * &#42;Note:&#42; At least one of `user_id` or `course_id` must be supplied. Both
       * fields can be supplied.
       *
       * This method returns the following error codes:
       *
       * &#42; `PERMISSION_DENIED` for access errors.
       */
/*      await gapi.client.invitations.list({
        courseId: "courseId",
        pageSize: 2,
        pageToken: "pageToken",
        userId: "userId",
      });*/
      /**
       * Creates a `Registration`, causing Classroom to start sending notifications
       * from the provided `feed` to the provided `destination`.
       *
       * Returns the created `Registration`. Currently, this will be the same as
       * the argument, but with server-assigned fields such as `expiry_time` and
       * `id` filled in.
       *
       * Note that any value specified for the `expiry_time` or `id` fields will be
       * ignored.
       *
       * While Classroom may validate the `destination` and return errors on a best
       * effort basis, it is the caller's responsibility to ensure that it exists
       * and that Classroom has permission to publish to it.
       *
       * This method may return the following error codes:
       *
       * &#42; `PERMISSION_DENIED` if:
       * &#42; the authenticated user does not have permission to receive
       * notifications from the requested field; or
       * &#42; the credential provided does not include the appropriate scope for the
       * requested feed.
       * &#42; another access error is encountered.
       * &#42; `INVALID_ARGUMENT` if:
       * &#42; no `destination` is specified, or the specified `destination` is not
       * valid; or
       * &#42; no `feed` is specified, or the specified `feed` is not valid.
       * &#42; `NOT_FOUND` if:
       * &#42; the specified `feed` cannot be located, or the requesting user does not
       * have permission to determine whether or not it exists; or
       * &#42; the specified `destination` cannot be located, or Classroom has not
       * been granted permission to publish to it.
       */
     /* await gapi.client.registrations.create({
      });*/
      /**
       * Deletes a `Registration`, causing Classroom to stop sending notifications
       * for that `Registration`.
       */
     /* await gapi.client.registrations.delete({
        registrationId: "registrationId",
      });*/
      /**
       * Returns a user profile.
       *
       * This method returns the following error codes:
       *
       * &#42; `PERMISSION_DENIED` if the requesting user is not permitted to access
       * this user profile, if no profile exists with the requested ID, or for
       * access errors.
       */
   /*   await gapi.client.userProfiles.get({
        userId: "userId",
      });*/
    }






  }

/*
  authorize(){
    this.gclass.handleAuthClick();
  }
*/

  public signIn() {
    this.userService.signIn();
  }

  public signOut() {
    this.userService.signOut();
  }

  public isLoggedIn(): boolean {
    return this.userService.isUserSignedIn();
  }



  async createCourse(){

    if (this.newCourseForm.valid) {

      await gapi.client['classroom'].courses.create({
        resource: {
          name:  this.newCourseForm.controls['name'].value,
          ownerId: "me",
          courseState: "ACTIVE"
      }
      }

      ).then((response)=> {

        //let course_id = response.result.id;
        //console.log(response.result);

        /*gapi.client['classroom'].courses.patch({
          "id": course_id,
          "updateMask": "courseState",
          "resource": {
            "courseState": "ACTIVE"
          }
        }).then((response)=>{
          console.log(response);
        });*/

      });
    }
  }

  /*presentCourseWorkModal() {
    let courseWork = this.modalCtrl.create(CourseWorkModal, { userId: 8675309 });
    courseWork.present();
  }*/

  /*presentModal(page) {
    let modal = this.modalCtrl.create(page,
      {

      });
    modal.present();
  }*/


  async createCourseWork(){

   console.log(this.courses);
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose a class.');

    if (this.courses.length > 0) {
      for (let i = 0; i < this.courses.length; i++) {
        let course = this.courses[i];

        alert.addInput({
          type: 'radio',
          label: course.name,
          value: course.name,
          checked: false
        });
      }
    }





    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log(data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
    alert.present();




   /* await gapi.client['classroom'].courses.courseWork.create({
      "courseId": "ghj",
      "resource": {
       /!* "dueDate": {
          "day": 0,
          "month": 0,
          "year": 0
        },
        "dueTime": {
          "hours": 0,
          "minutes": 0
        },*!/
        "state": "DRAFT",
        "title": "jgjh",
        "description": "hjghj",
        /!*"materials": [
          {
            "link": {
              "url": "",
              "title": ""
            }
          }
        ],
        "assignment": {
          "studentWorkFolder": {
            "id": ""
          }
        },*!/
        "workType": "ASSIGNMENT"
      }
    }).then((res)=>{
      console.log(res);
    })*/


  }

/*  signout(){
    this.gclass.handleSignoutClick()
  }*/
}
