# UoA Course Wiki - Frontend App
Welcome to UoA Course Wiki!

Course Wiki is a Single Page Application build by React.js, supported by .Net Core Server.

# Our Team Member

## Backend developer - Repo visit [CourseWiki](https://github.com/UoACourseWiki/CourseWiki) 

Ken Fang - yfan159@aucklanduni.ac.nz 

## Frontend developers - Repo Here

Joe Wu - hwu263@aucklanduni.ac.nz 

Ruke Wei - rwei890@aucklanduni.ac.nz 

Yujun Zhang - yzha725@aucklanduni.ac.nz

# To run this project ... 

## Front End
To start the front end, please install all dependencies first using:

```
npm ci
```

Then, start the development mode using:
```
npm start
```
###### We won't stop you if you want to build it and run in production mode... (Shhh!)

## Back End
Thanks to Ken's effort we have our backend server!

### Run Server Locally
If you want to fully check our core service, please follow the instruction in repo [CourseWiki](https://github.com/UoACourseWiki/CourseWiki) to build the local server!
To check `Swagger API` interface, simply goto:
```
localhost:5000/swagger
```
in your browser after you have your server-end setup.

### Use Remote Server
If you just want to check how it works in front-end and/or the backend server simply didn't fire up on your machine, we have our remote server working in for testing and debugging as well! (And thanks Joe for setup and maintaining the remote server!)

To use remote server, you would need to run the App in `production build`.

If you want to use it in `development mode`, you need to overwrite the BASEURL in file `webpage/.env.development` to:
```
REACT_APP_API_BASEURL=https://732.joenan.com/api
```
Then all the server request will be sent to the remote server. You will need to stop the development server (if you have it running) and re-run `npm start` command to apply this change.

If you need to access the remote Swagger API Interface, goto:
```
https://swagger.joenan.com/swagger
```

If it's not working, contact Joe (hwu263@aucklanduni.ac.nz) to have a check on the server status!

However, longer waiting time on responses is expected due to where the physical location it has been set.

> Please be mentioned, the Swagger API interface and remote server is intended for debugging and developing only. Please do not use it for production purpose.


# Purpose of the project 
 The project is about a wiki of courses that provides information for students to select courses. The website collects all the courses of a major, provides information of each course, the prerequisite requirement of the course, and the course arrangement of different years.

 # Application  Feature
 	User can search course/subject in search page.
    User account login/signup/reset/profile in account page.
    User can find all the courses in a specific subject in subject page.
    User can  find each course information in the course page .

# Search
 This is our Main page, on this page, the user can jump to the Subject page by searching the course name, or the user can directly jump to the course page directly by searching the course name plus the course number. If the user does not enter the correct course name, the system will prompt that it has not been found.

 # Account（logIn /signUp）
 This part is mainly for users to log in and signup this website, users signup/log in through email. If the user forgets the password, it can be sent email to user account's verified email address to reset

 # Subject
 This page is a list of all available courses in one Subject that is queried by the search function on the home page.

 # Course 
  This page is based on an introduction to each course, Users can find the year and semester of the course. For those who are not experienced in selecting courses, this page provides the required prerequisites for each course and the grade for the prerequisites

