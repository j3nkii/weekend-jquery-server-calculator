$(ready)
function ready(){
    console.log('js+jq in order');
    $(document).on('submit', '#calcInputs', sendToServer)
}

//in strech, could take in array, to take in, more than 2 numbers
function sendToServer(event){
    event.preventDefault();
    console.log('clicky');
    //create function for one operand at a time
    let calculation = {package: 
        [ 
            {firstNumber: $('#firstNumber').val()},
            //{operand: operandInputHolder()}, //use DOM to store true false data for button presses if data true pull and push
            {secondNumber: $('#secondNumber').val()},
        ]
    }
    $.ajax({
        method: 'POST',
        url: '/url',
        data: newItem,
    }).then((response) => {
        console.log('POST', response);
    });
    console.log(calculation);
}