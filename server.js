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



app.listen(8080, () => {
    console.log('Server is running at port 8080');
});