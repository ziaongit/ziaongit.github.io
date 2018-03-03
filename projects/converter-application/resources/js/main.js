
////////////////////////////////////
//    WEIGHT CONVERTER START      //
////////////////////////////////////
let weightResult = document.getElementById('weightResult');

if(weightResult) {
    weightResult.style.visibility = 'hidden';
}

let weightInputValue = document.getElementById('weightInput');

if(weightInputValue){
            weightInputValue.addEventListener('input', function(e){

            let poundsValue = e.target.value;

            if(poundsValue > 0) {
    
                weightResult.style.visibility = 'visible';

                //Grams Output
                document.getElementById('gramsOutput').innerHTML = poundsValue/0.0022046;

                //Kilograms Output
                document.getElementById('kilogramsOutput').innerHTML = poundsValue/2.2046;

                //Ounces Output
                document.getElementById('ouncesOutput').innerHTML = poundsValue * 16;

                //Ton Output
                document.getElementById('tonsOutput').innerHTML = poundsValue * 0.000453592;
            
            } else {
                weightResult.style.visibility = 'hidden';
            }

        });
}

////////////////////////////////////
//    WEIGHT CONVERTER END        //
////////////////////////////////////


////////////////////////////////////
//    LENGTH CONVERTER START      //
////////////////////////////////////
let lengthResult = document.getElementById('lengthResult');

if(lengthResult) {
    lengthResult.style.visibility = 'hidden';
}

let lengthInputValue = document.getElementById('lengthInput');

if(lengthInputValue) {
    lengthInputValue.addEventListener('input', function(e){
        let kilometerValue = e.target.value;
        
        if(kilometerValue > 0) {
            lengthResult.style.visibility = 'visible';
            
            // Meter Output
            document.getElementById('meterOutput').innerHTML = kilometerValue * 1000;

            // Centimeter Output
            document.getElementById('centimeterOutput').innerHTML = kilometerValue * 100000;

            // Millimeter Output
            document.getElementById('millimeterOutput').innerHTML = kilometerValue * 1000000;

            // Miles Output
            document.getElementById('milesOutput').innerHTML = kilometerValue * 0.621371;

        }else {
            lengthResult.style.visibility = 'hidden';
        }
    });
}

    
////////////////////////////////////
//    LENGTH CONVERTER END        //
////////////////////////////////////

