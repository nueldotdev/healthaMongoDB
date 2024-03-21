# Healtha Project

## SetUp
We'll be having three main folders - [`public`, `views` and `routes`]

- **Public**: This will hold all our server side styling (css), images (images) and logic (js).
- **Views**: This holds our HTML documents.
- **Routes**: Hasn't been created yet, but this is where most of our expressJS set up for the api and other stuff will be.
  
The repo has `package.json` already set up so we first run the following command within our dir:

1. Initialize node within our project dir with:
```bash 
npm init
```
`package.json` should look like this:
```json
{
  "name": "healtha",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "devStart": "nodemon server.js",
    "start": "node server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.3",
    "mongo": "^0.1.0",
    "mongodb": "^6.5.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```
<br>
<br>

2. Next is to run this in the cmd prompt
```bash
npm install
``` 
>We should have something similar to this.
>```bash
>$ npm install
>[#########.........] - idealTree:healthaMongoDB-main: sill idealTree buildDeps
>```

3. When installing is completed, our workspace should have a new folder named `node_modules` and a file named `package-lock.json`.
Both hold our installed packages and dependencies for us within our project.

4. Within our `package.json` we have the following...
```json
"scripts": {
    "devStart": "nodemon server.js",
    "start": "node server.js"
},
```

**NOTE:** One of our dependencies is called `nodemon`, it helps to refresh our server once a change happens within our porject code...
With that said, the `"start": "node server.js"` isn't really needed but can be left there.

5. In our cmd we need to run: 

```bash
npm run devStart
```
The command access and `"devStart"` within the `"scripts"` of our `package.json`



### ExpressJS

Lastly our `server.js` file
```js
const path = require('path');
const express = require('express');
const app = express();


app.use(express.static(__dirname + '/public'));

// Instead of serving static files from the root of the 'public' directory,
// specify a prefix '/public' for serving static files from the root of the 'public' directory
app.use('/public', express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    console.log('Home Page Active');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/admin', (req, res) => {
    console.log('Admin Entry');
    res.sendFile(path.join(__dirname, 'views', 'access.html'));
})

app.get('/admin/panel', (req, res) => {
    console.log('Admin Active');
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
})



app.listen(8080);
```
<br>
<br>

The `app.get()` functions hold the paths we have within our project
- `/` : for our main page, example: `main.com`
- `/admin` : for our next page, example: `main.com/admin`
- `/admin/panel` : for our next page within admin, example: `main.com/admin/panel`

The `app.listen(8080)` tells expressJS what port should be used for our project...

Now all that's left is to go: [http://localhost:8080]
