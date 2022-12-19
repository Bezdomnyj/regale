class Levels {

    constructor() {
        this.currentLevel = parseInt(window.localStorage.getItem('level')) ?  parseInt(window.localStorage.getItem('level')) : 1;
        this.unlockLevel(this.currentLevel);
    }

    currentLevel = 0;

    // Genearali

    unlockLevel(level) {
        if (level != parseInt(window.localStorage.getItem('level'))) {
            window.localStorage.setItem('level', level);
            this.currentLevel = level;
        }
        this.initLevel(level)
    }

    completeLevel(level) {
        document.getElementById(`level-${level}`).classList.remove('current');
        document.getElementById(`level-${level}`).classList.add('completed');
    }

    initLevel(level) {
        if (level > 1) {
            document.getElementById(`level-${level - 1}`).classList.remove('completed');
        }
        if (level == 2) {
            this.best = window.localStorage.getItem('best') ? parseInt(window.localStorage.getItem('best')) : 0;
            const bestScrore = document.getElementById('best');
            bestScrore.innerHTML = this.best;
        }
        if (level == 3) {
            this.reactionScore = document.getElementById('reaction-time');
            this.clickFasterStart = document.getElementById('click-faster-start');
            this.clickFasterStop = document.getElementById('click-faster-stop');
        }
        document.getElementById(`level-${level}`).classList.add('current');
    }

    resetGame() {
        localStorage.clear();
        location.reload();
    }
    
    // Livello 1

    grabbedElement;
    developersAndGiuseppe = [
        'andrea',
        'daniele',
        'giuseppe',
        'leonardo',
        'lorenzo',
        'michele',
        'natalia',
        'niki',
        'semir'
    ];

    handleDrop(dropEvent) {
        dropEvent.preventDefault();
        if (this.grabbedElement.dataset.name === dropEvent.target.dataset.name) {
            dropEvent.target.classList.add('linked');
            this.grabbedElement.parentElement.classList.add('linked');
            this.developersAndGiuseppe = this.developersAndGiuseppe.filter(
                e => e !== dropEvent.target.dataset.name
            )
            if (this.developersAndGiuseppe.length === 0) {
                this.completeLevel(1);
            }
        }
    }

    handleOver(overEvent) {
        overEvent.preventDefault();
    }

    handleDrag(dragEvent) {
        dragEvent.preventDefault();
        this.grabbedElement = dragEvent.target;
    }
    
    // Livello 2
    
    timesClicked = 0;
    first = true;
    best = 0;
    safetyInterval = true;

    handleClick() {
        if (this.safetyInterval) {
            if (this.first) {
                this.initTimer();
                setTimeout(
                    () => {
                        if (this.best < this.timesClicked) {
                            this.best = this.timesClicked;
                            window.localStorage.setItem('best', this.best)
                        }
                        if (this.timesClicked > 80) {
                            this.completeLevel(2);
                        }
                        this.first = true;
                        this.timesClicked = 0;
                        this.safetyInterval = false;
                        setTimeout(() => {
                            document.getElementById('timer').innerHTML = `${0.00} s`;   
                        }, 100);
                        setTimeout(() => {
                            this.safetyInterval = true;
                        }, 2000);
                    }, 10000
                );
            }
            this.first = false
            this.timesClicked++;
            document.getElementById('times-clicked').innerHTML = this.timesClicked;
            if (this.best < this.timesClicked) {
                this.best = this.timesClicked;
                window.localStorage.setItem('best', this.best);
                document.getElementById('best').innerHTML = this.best;
            }
            console.log(this.timesClicked);
        }
    }
    
    initTimer() {
        const date = new Date();
        const timer = document.getElementById('timer');
        if (timer.classList.contains('out-of-time')) {
            timer.classList.remove('out-of-time');
        }
        this.interval = setInterval(() => {
            let currentDateObj = new Date();
            let numberOfMlSeconds = currentDateObj.getTime();
            let time = (10 - (new Date(numberOfMlSeconds - 100).getTime() / 1000 - date.getTime() / 1000)).toFixed(2);
            if (time <= 0) {
                clearInterval(this.interval);
                timer.classList.add('out-of-time')
            }
            timer.innerHTML = `${time} s`;
        }, 10);
    }

    // Livello 3

    reactionScore;
    initTime;
    endTime;
    firstReactionClick = true;
    started = false;
    ended = false;
    clickFasterStart;
    clickFasterStop;

    startReaction() {
        if (!this.started) {
            const limitTime = Math.floor(Math.random() * 10000)
            this.started = true;
            setTimeout(() => {
                this.clickFasterStop.classList.add('show')
                this.ended = true;
                this.initTime = new Date().getTime();
            }, limitTime);
        } else {
            window.alert('NO!! Troppo presto, riprova aspettando il verde!')
        }
    }

    stopReaction() {
        this.endTime = new Date().getTime();
        if ((this.endTime - this.initTime) / 2 < 190) {
            this.completeLevel(3);
        }
        this.clickFasterStop.classList.remove('show');
        this.reactionScore.innerHTML = `${(this.endTime - this.initTime) / 2} ms`;
        this.started = false;
        this.ended = false;
    }

    // Livello 4

    handleSubmit(event) {
    	event.preventDefault();
		const formData = new FormData(event.target);
		const data = [...formData.entries()];
		const validator = new FormValidator(formData);
		let valid = validator.validateAnswers();
		if (valid) {
			validator.clearFormError();
			alert("Congrats!!")
		}
    }
}

class FormValidator {
	constructor(formData){
		this.formData = formData;
		this.answers = {
			"internalPhone": "17",
			"assumption": "Michele -> Lorenzo -> Leonardo -> Natalia -> Semir",
			"hidden": "Leonardo",
		};
		this.valid = true;
	}
	validateAnswers(){

		let questions = document.querySelectorAll(".question-container:not(.hidden-question)");
		let hiddenQuestions = document.querySelectorAll(".hidden-question");
		let givenQuestions = Array.from(this.formData.keys()).length;

		if(givenQuestions < questions.length){
			this.setFormError("Inserisci tutte le risposte!");
		}
		else{
			let questionError = false;
			for (let [key, val] of this.formData.entries()) {
				let ansKey = key.split("_")[1];
				if (this.answers[ansKey] !== val) {
					questionError = true;
					this.setQuestionError(key);
					break;
				}
			}
			if(questions.length === givenQuestions && !questionError){
				this.setFormError("Ci sei quasi! Manca ancora qualcosa...  cerca-bene");
			}
		}
		return this.valid;
	}

	clearFormError(){
		const formError = document.getElementById("question_form_error");
		formError.innerHTML = "";
	}

	setFormError(errorMsg){
		const formError = document.getElementById("question_form_error");
		formError.innerHTML = errorMsg;
		console.error(errorMsg);
		this.valid = false;
	}

	setQuestionError(inputName,errorText) {
		let input = document.querySelector("[name=" + inputName + "]");
		let container = input.closest(".question-container");
		container.scrollIntoView();
		container.classList.add("error");
		setTimeout(() => {
			container.classList.remove("error");
		}, 3000)
		this.setFormError("Ops! Sembra che tu abbia sbagliato qualche risposta!!");
	}
}

const game = new Levels();

