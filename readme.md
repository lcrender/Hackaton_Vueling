# Search Engine for Travel Agency
## How to use
### Requeriments
This Api was created for Vueling Hackaton (2023) by Alejandro Chazarreta, using Node.js and MongoDb.<br>
You need to have this two apps running on your server.<br><br>
### Run App
Open a new Terminal<br>
Use the command `git clone https://github.com/lcrender/Hackaton_Vueling.git`<br>
Open Proyect folder `cd Hackaton_Vueling`<br>
Install all dependencies with `npm i`<br>
You need to create a file called ".env" in the root of the proyect with the MongoDb URI, the JWTSECRET phrase and the PORT, you can rename the .env.template file or make a new .env file and copy & paste this info: <br>
```
URI=localhost:27017/hackaton_vueling
PORT=3000
JWTSECRET=M@rad0na!
```

Save the file and run from the terminal the server with `npm start`<br>

## How to use the API
### Create User Admin
The first thing you have to do is create a user admin to be able to create trips in the app. In this app version you can only create one admin.<br>
For this make an HTTP POST request to http://localhost:3000/signup <br>
You need to send the username and password in a Json format through the body.
This is a format example:
```
{
"username": "amador",
"password": "dieguitoarmando"
}
````
The app will return a Json with the access token. Copy it.
Then you need to pase it in the headers of the request for access to the app. The headers need to have a key = "x-access-token" and a value = Copied token!<br><br>
![Postman Example](https://github.com/lcrender/Hackaton_Vueling/blob/chaza/img/x-access-token.png)
<br><br>
If you want to login you need to make a HTTP request to http://localhost:3000/login  with the same json format.<br>
```
{
"username": "amador",
"password": "dieguitoarmando"
}
````

### Create Trips
Make a HTTP POST request to http://localhost:3000/trip <br>
You need to send the information of the trip in a Json format to the body.
This is a format example:
```
{
    "tripName": "Europe Popular Capitals",
    "type": "Land Trip",
    "duration": "3 days",
    "cities": ["Madrid", "Paris", "London"],
    "details": ["Hotel Best Madrid 3*", "Hotel Worst Paris 4*"]
}
```
All fields are required<br>
You can only send two "type" of trip "Land Trip" or "Air Trip"<br>
The "cities" array need at least 2 items.<br>
The  "details" array only acept 2 items as a requirement.<br><br>
![Postman Example](https://github.com/lcrender/Hackaton_Vueling/blob/chaza/img/postman.png)
<br>
### Edit and Delete a trip
You can edit or delete a trip using the Id of the trip.<br>
You can see all trips and the trip Id making a HTTP GET petition to http://localhost:3000/trips <br>
Edit Trip:<br>
Make a HTTP PUT request to http://localhost:3000/trip/ID <br>
Replace the "ID" of the URL with the real Id of the trip.
You need to send by the body in a Json format all the trip´s information. (The format is the same as to create a new trip).<br>
Delete a Trip:<br>
Make a HTTP DELETE request to http://localhost:3000/trip/ID <br>
Replace the "ID" of the URL with the real Id of the trip.

### Find Trips
Make a HTTP POST request to http://localhost:3000/search <br>
You need to send the information of the trip in a Json format to the body.
This is a format example:
```
{
    "cities": "Barcelona",
}
```
The app will search and display the trips found in the database.<br>
The app takes at least three letters from standard input to execute the search.<br>
You can search with uppercases or lowercases.<br><br>
I leave in the root directory of the project a collection of postman to carry out load tests and search for trips.<br>


![Postman Example](https://github.com/lcrender/Hackaton_Vueling/blob/chaza/img/cloud.jpg)