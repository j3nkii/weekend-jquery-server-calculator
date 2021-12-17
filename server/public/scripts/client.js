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
    let calculation = {
        firstNumber: $('#firstNumber').val(),
        operator: operatorInput,
        secondNumber: $('#secondNumber').val()
    }
    console.log('SEND TO SERVER :calculation:',calculation);
    
    $.ajax({
        method: 'POST',
        url: '/calc-send',
        data: calculation,
    }).then((response) => {
        console.log('POST', response);
    });
}

//captures last operator and stores to global var
//also return var
function operatorCapture(){
    operatorInput = $(this).data('operator');
    console.log('OPERATORCAPTURE:', $(this).data('operator'));
}

