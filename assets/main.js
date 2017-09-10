let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
	//alert("in guess");
	//alert("answer= "+answer.value);
	//alert("attempt= "+attempt.value);
	
    if(answer.value=='' || attempt.value==''){
		//alert("calling setHiddenFields");
    	setHiddenFields();
    }
	
    if(validateInput(input.value)){
		attempt.value ++;
		//alert("attempt= "+attempt.value);
    }
    else{
    	//alert("input= "+input.value);
    	return false;
    }
	
	if(getResults(input)){
		setMessage("You Win! :)");
		showAnswer(true);
		showReplay();
	}
	else if(attempt.value>=5){
		setMessage("You Lose! :(");
		showAnswer(false);
		showReplay();
	}
	else{
		setMessage("Incorrect, try again.");
	}
}

//implement new functions here
function setHiddenFields(){
	//alert("in setHiddenFields");
	answer.value = Math.floor(Math.random()*10000).toString();
	
	let len = answer.value.length;
	while(answer.value.length < 4){
		answer.value = "0" + answer.value;
	}
	//alert("in setHiddenFields after prefixing 0 to answer");
	attempt.value = 0;
	//alert("eixting setHiddenFields");
}

function setMessage(str){
	document.getElementById('message').innerHTML = str;
}

function validateInput(input){
	//alert("in validateInput");
	if(input.length==4){
		return true;
	}
	else{
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
}

function getResults(input){
	let str = '<div class="row"><span class="col-md-6">' + input.value + '</span><div class="col-md-6">';
	let i,j;
	
	for(i=0;i<4;i++){
		
		if(input.value.charAt(i)==answer.value.charAt(i)){
			str += '<span class="glyphicon glyphicon-ok"></span>';
		}
		else{
			let flag = 0;
			for(j=0;j<4;j++){
				if(input.value.charAt(i)==answer.value.charAt(j)){
					flag = 1;
					break;
				}
				
			}
			if(flag==1) str += '<span class="glyphicon glyphicon-transfer"></span>';
			else str += '<span class="glyphicon glyphicon-remove"></span>';
		}
		
	}
	str += '</div></div>';
	//alert(str);
	document.getElementById('results').innerHTML += str;
	if(input.value == answer.value) return true;
	else return false;
}

function showAnswer(success){
	let code = document.getElementById('code');
	if(success){
		code.className += ' success';
	}
	else{
		code.className += ' failure';
	}
	
	code.innerHTML = answer.value;
}

function showReplay(){
	document.getElementById('guessing-div').style.display = 'none';
	document.getElementById('replay-div').style.display = 'block';
}


