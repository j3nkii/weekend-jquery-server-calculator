// $ npm init --yes
// $ npm install express
// $ npm install nodemon
// add .gitignore file and throw in     node_modules/
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(PORT, () => {
    console.log('Server is running');
})
//----------------SERVER SETUP COMPLETE----------------\\
let logOfCalculations = [];
//end global vars

//receive data from user DOM
app.post('/calc-send', (req, res) => {
    console.log('DATA RECEIVED',req.body);
    let equation = req.body.package;
    let calculation = req.body.package;
    console.log('CALCO3000', calculation);
    equates(calculation.split(' '))
    logOfCalculations.unshift({equation: equation, result: calculation[0]})
    console.log(logOfCalculations);
    res.sendStatus(201)
});

//create send to DOM, sending current calculation result, plus log
app.get('/calc-log', (req, res) => {
    res.send(logOfCalculations);
});

//eval?
function isArithmatic(string){
    for(let dig of string){
        if(dig !== '.' && isNaN(Number(dig)) && dig !== '+' && dig !== '-' && dig !== '*' && dig !== '/' ){
            console.log(dig);
            return 'nope';
        } 
    }
    return eval(string)
}



//create a function to accepet and breakdow strings into arthmatic expressions
//PE.MD.AS .. maybe ignore PE . . stretch goal
function equates(arr){
    //need to run through array,
    console.log(arr);
    for(let i in arr){
        if(arr.length === 1){
            return;
        }
        if(arr[i] === '/' || arr[i] === '*'){
            if(arr[i] === '*'){
                arr.splice(i - 1, 3, arr[i - 1] * arr[Number(i) + 1])
                equates(arr)
            } else if(arr[i] === '/'){
                arr.splice(i - 1, 3, arr[i - 1] / arr[Number(i) + 1])
                equates(arr)
            } 
        }
    }
    for(let i in arr){
        if(arr[i] === '+' || arr[i] === '-'){
            if(arr[i] === '+'){
                arr.splice(i - 1, 3, Number(arr[i - 1]) + Number(arr[Number(i) + 1]))
                equates(arr)
            } else {
                arr.splice(i - 1, 3, arr[i - 1] - arr[Number(i) + 1])
                equates(arr)
            }
        }
    }
}