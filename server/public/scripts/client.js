let operatorInput = {operator: null};

$(ready)
function ready(){
    console.log('js+jq in order');
    $(document).on('submit', '#calcInputs', sendToServer);
    $(document).on('click', '.operatorInput', operatorCapture)
}

//in strech, could take in array, to take in, more than 2 numbers
function sendToServer(event){
    event.preventDefault();
    console.log('clicky');
    //create function for one operand at a time
    let calculation = {package: 
        [ 
            {firstNumber: $('#firstNumber').val()},
            operatorInput,
            {secondNumber: $('#secondNumber').val()},
        ]
    }
    console.log(calculation);
    
    $.ajax({
        method: 'POST',
        url: '/calc-send',
        data: calculation,
    }).then((response) => {
        console.log('POST', response);
    });
    console.log(calculation);
}

//captures last operator and stores to global var
//also return var
function operatorCapture(){
    operatorInput = $(this).data();
    console.log($(this).data());
}

