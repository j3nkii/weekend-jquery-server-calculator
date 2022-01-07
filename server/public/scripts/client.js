let operatorInput = '';

$(ready)
function ready(){
    $(document).on('submit', '#calcInputs', sendToServer);
    $(document).on('click', '.operatorInput', operatorCapture)
    $(document).on('click', '#clearCalcInputs', clearInputs)
}


function clearInputs(){
    $('#calcInput').val('')
    operatorInput = ''
}



//in strech, could take in array, to take in, more than 2 numbers
//grabs inputs and sends to server
function sendToServer(event){
    event.preventDefault();
    console.log('SEND TO SERVER :calculation:',operatorInput);
    $.ajax({
        method: 'POST',
        url: '/calc-send',
        data: {package: $('#calcInput').val()}
    }).then((response) => {
        console.log('POST', response);
        gatherFromServer()
    });
    clearInputs()
}



//gather data from server
function gatherFromServer(){
    $.ajax({
        method: "GET",
        url: "/calc-log"
    }).then((response) => {
        console.log(response);
        renderHTML(response)
    });
}



//captures last operator and stores to global var
//also return var
function operatorCapture(){
    if($(this).data('operator') === '+' || 
        $(this).data('operator') === '-' || 
        $(this).data('operator') === '*' || 
        $(this).data('operator') === '/'){
            operatorInput += ' ' + $(this).data('operator') + ' ';
            $('#calcInput').val(String(operatorInput))
            console.log('OPERATORCAPTURE:', $(this).data('operator'));
    } else {
        operatorInput += $(this).data('operator');        
        $('#calcInput').val(String(operatorInput))
        console.log('OPERATORCAPTURE:', $(this).data('operator'));
        }
}



//render object data to DOM
function renderHTML(logArray){
    console.log(logArray)
    console.log(logArray[0].results);
    $('#lastestResults').text(`
        ${logArray[0].result}
    `)
    $('#calcOutputs').empty();
    for(let history of logArray){
        $('#calcOutputs').append(`
            <li>
                ${history.equation} = ${history.result}
            </li>
        `);
    }
}