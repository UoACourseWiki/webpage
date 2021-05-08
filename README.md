# UoA Course Wiki - Frontend App
Welcome to UoA Course Wiki!

Course Wiki is a Single Page Application build by React.js, supported by .Net Core Server.

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
If you just want to check how it works in front-end and/or the backend server simply didn't fire up on your machine, we have our remote server working in production mode as well! (And thanks Joe for settin up the remote server!)

To use remote server, you would need to run the App in `production build`.

If you want to use it in `development mode`, you need to change the URL in file `webpage/.env.development` to:
```
REACT_APP_API_BASEURL=https://732.joenan.com/api
```
Then all the server request will be sent to the remote server. 

If you need to access the remote Swagger API Interface, goto:
```
https://swagger.joenan.com/swagger
```

If it's not working, contact Joe (hwu263@aucklanduni.ac.nz) to have a check on the server status!

However, longer waiting time on responses is expected due to where the physical location it has been set.

> Please be mentioned, the Swagger API interface and remote server is intended for debugging and developing only. Please do not use it for production purpose.
