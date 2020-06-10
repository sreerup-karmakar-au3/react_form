const express = require('express')
const path = require('path')

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/test', (req,res) => {
    res.json({"success": "Working"});
})

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(process.env.PORT || 5000);