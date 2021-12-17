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

app.post('/calc-send', (req, res) => {
    console.log('DATA RECEIVED',req.body); //req.body will equal whatever was sent. 
    let calculation = req.body;
    calcuuLator3000(calculation);
    console.log('CALCO3000', calculation)
    res.sendStatus(201)
});

//function to handle operator
function calcuuLator3000(obj){
    console.log('FUCK', obj, obj.operator);
    switch (obj.operator) {
        case '+':
            obj.result = 
            obj.firstNumber + obj.secondNumber;
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