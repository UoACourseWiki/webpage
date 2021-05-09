# UoA Course Wiki - Frontend App
Welcome to UoA Course Wiki!

Course Wiki is a Single Page Application build by React.js, supported by .Net Core Server.

This is a project assignment for UOA Computer Science School paper COMPSCI 732.

![course screenshot](/docs/course.png)
# Our Team Members

## Backend developer - Repo visit [CourseWiki](https://github.com/UoACourseWiki/CourseWiki) 

Ken Fang - yfan159@aucklanduni.ac.nz 

## Frontend developers - Repo Here

Joe Wu - hwu263@aucklanduni.ac.nz 

Ruke Wei - rwei890@aucklanduni.ac.nz 

Yujun Zhang - yzha725@aucklanduni.ac.nz

# To run this project ... 

# Front End
We recommend to use `NPM` version `7.8.0` to build the project for avoiding errors out of our control. We have already noticed version 6 will cause some problems.

To start the front end, please install all dependencies first using:

```
npm ci
```

Then, start the development mode using:
```
npm start
```
###### We won't stop you if you want to build it and run in production mode... (Shhh!)

# Back End
Thanks to Ken's effort we have our backend server!

## Run Server Locally
If you want to fully check our core service, please follow the instruction in repo [CourseWiki](https://github.com/UoACourseWiki/CourseWiki) to build the local server!
To check `Swagger API` interface, simply goto:
```
localhost:5000/swagger
```
in your browser after you have your server-end setup.

## Use Remote Server
If you just want to check how it works in front-end and/or the backend server simply didn't fire up on your machine, we have our remote server working in for testing and debugging as well! (And thanks to Joe for setup and maintaining the remote server!)

To use remote server backend, you would need to run the App in `production build`.

If you want to use it in `development mode`, you need to overwrite the BASEURL in file `webpage/.env.development` to:
```
REACT_APP_API_BASEURL=https://732.joenan.com/api
```
Then all the server request will be sent to the remote server. You will need to stop the development server (if you have it running) and re-run `npm start` command to apply this change.

## Deployed website

We also have this App running remotely as well, visit:
```
https://732.joenan.com
```
This is a CI auto-deployed version of our `develop` branch powered by Jenkins.

If they are not working, contact Joe (hwu263@aucklanduni.ac.nz) to have a check on the server status!

However, longer waiting time on responses is expected due to where the physical location it has been set.

> Please be mentioned, this remote server is intended for debugging and developing only. Please do not use it for any other purpose.



# Purpose of the project 
 Our project proposed and implemented a wiki of courses that provides a one-stop soultion, where UoA students could us this application to easily search all subjucts and papers under the university scheme. The website provides all the courses of a major, provides information of each course and portal connected to course syllabus page, the prerequisite requirement of the course, and the course arrangement of different years.



# Application  Feature - Frontend
    User can search course/subject in search page.
    User can find all the courses in a specific subject in subject page.
    User can find each course information in the course page.
    User account login/signup/reset/profile in account system.

## Search
 This is our Main page. On this page, we provided a search bar where users could type in the course subject to enter the subject page where all courses under the subject are listed; or users can enter a specific course page directly by input and select the course name plus the course number. If the user does not enter the correct course name, the system will prompt that it has not been found. A mini version of the search bar has been provided on the top navigation bar as well.

 ## Subject
 This page lists all available courses in one Subject that is queried by the search function on the home page.

 ## Course 
  This page is provided the introduction to each course, and users can find the year and semester of the course. For those who are considering enrolling this course, this page provides the required prerequisites and restrictions for each course. By selecting terms and sections in the drop down lists, user can find the course timetable for each section as well.

 ## Account 
 In our application we provided a account system for users. User can register and login with our website. When user signing up, we will send them an email to verify their email address. We have also provided the portal for user to reset their password if they forgot.

### - Account Setting
 When user login into the website, they can also find a page to change their account settings, including user nick name and password change.


# BackEnd Feature - CourseWiki Core (Repo [CourseWiki](https://github.com/UoACourseWiki/CourseWiki) )
This part is for the system owner to set up some parameter to run this system. such as database username and password, courses and classes information that the admin wants to import. These parameters will be put into a YAML file. The system will read the parameter when it starts. All information needed for running the website can be imported and deployed.


# Tech Stack 

## Frontend
* Core Framework - ReactJS
* UI Library - Material-ui
* Package management - npm (nodeJS)
* RESTApi handler - Axios
* Testing - Jest

## Backend
* Core RESTful Service - C# and .netCore
* Database - postgreSQL

## Unit Testing
We have a several unit tests using Jest to test our frontend components, frontend services and inner functions to make sure they return acceptable results on code changes and won't break our applications.

## Version Control
* Version control - Git
* Git commit tool - git-cz (Commitizen)

# Project Management
Our project is running and managed under the Agile strategy guideline. We majorly use Wechat group for daily communication and Zoom as our online meeting tools. On development requirements communication, our backend provided a Swagger.io interface for checking all APIs and request/response requirements. At the beginning state, we also use Microsoft Team and it's built-in wiki for frontend component lifecycle designing and handle requirements for each members. And we use Trello and Github dashboard for posting and managing our tasks.

Our team members all have their own tasks in majorly focused field.
* Ken Fang - Backend Developer and provider of 2.0 version UI guideline schema. [2.0 Alpha Repo](https://github.com/UoACourseWiki/coursewiki-web)
* Joe Wu - Chief frontend developer who majorly controls all technical details, reviewing and making decision on pull requests. He also write our unit tests.
* Yujun Zhang - Frontend Developer, majorly coding but also do some project management assisting, communication and coordination between frontend and backend.
* Ruke Wei - Our project manager and graphic designer, minorly coding for frontend as well. Also do documentation jobs. 

During development, we use GitHub as our project code repository. We have our main branch named `develop`, but we do not code directly on `develop` branch. Instead, we create new branch when adding new feature / bug-fix / project refactor / documentation. We using a standard rule to name our branch as `{feature}/{scopeOfChange}` such as `feat/login-module` or `bugfix/search-bar`. The name need to match the feature profile card in our MS Teams wiki. Everytime we commit and push our code, we need to make Pull Request for other coder to review. When making git commit, we also use a standarization tools to make our commit messege nice and understandable. These two strategies helps us to find out problem easier and standardize our development process.

# Future Approaches of This App
Although this project is come to an end for now, we don't think the project is fully finished and we won't end up here. For example, as you can see, we have our account system running but currently we don't have anywhere that need to authorize our user. This is actually a reserved filed for new features incoming, because We are planning to deploy more feature to fulfill this project (after the marking stage of 732 Assignment). At very beginning, our goal is not only to complete this COMPSCI732 assignment. We would like this App to help our students better selecting their papers and time. Our team members planned to turn this repo into a public repo later and keep contributing to this application. We would make this application introduced pubilcly and available to all UoA students, once we are allowed to do so.

In our current plan, we will deploy UGC (user generate content) features into this project here, such as user provided and editable course information, course feedback and comments, past year contents and papers, personal timetable management and class locators. We as developers really wish this application could enrich our own abilities, gaining real-world coding and team-working experience. But besides from that, our aim is to bring benefit to all students who choose UoA, by bringing them a easier approach on finding class and papers informations. And by utilizing the scoring and commenting function, we hope we could make our UoA to provide a better study experience and quality knowledge as well finally.