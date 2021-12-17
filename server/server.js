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
    let calculation = req.body;
    calcuuLator3000(calculation);
    console.log('CALCO3000', calculation)
    logOfCalculations.unshift(calculation)
    res.sendStatus(201)
});

//create send to DOM, sending current calculation result, plus log
app.get('/calc-log', (req, res) => {
    res.send(logOfCalculations);
});

//function to handle operator
function calcuuLator3000(obj){
    switch (obj.operator) {
        case '+':
            obj.result = 
            Number(obj.firstNumber) + Number(obj.secondNumber);
            break;
        case '-':
            obj.result = 
            obj.firstNumber - obj.secondNumber;
            break;
        case '*':
            obj.result = 
            obj.firstNumber * obj.secondNumber;
            break;
        case '/':
            obj.result = 
            obj.firstNumber / obj.secondNumber;
            break;
        default:
            console.log('Not an Operator');
            break;
    }
}

