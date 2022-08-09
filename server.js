import app from './app.js';
const port = normalizePort(process.env.PORT || '8000');

function normalizePort(val){
    const port = parseInt(val);
    if(isNaN(port)){
        return val;
    }
    if(port >= 0){
        return port;
    }
    return false;
}

app.listen(port, function(){
    console.log(`App listening on port ${port}`);
})