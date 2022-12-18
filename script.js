class Levels {

    constructor() {
        this.currentLevel = window.localStorage.getItem('level') ?? 1;
        this.unlockLevel(this.currentLevel);
    }

    currentLevel = 0;

    // Genearali

    unlockLevel(level) {
        if (level != window.localStorage.getItem('level')) {
            window.localStorage.setItem('level', level);
            this.currentLevel = level;
        }
        switch (level) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }
    }

    initLevel(level) {
        switch (level) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }
    }

    resetGame() {
        localStorage.clear();
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
                this.unlockLevel(2);
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
    
    // handleClick() {
    //     if (this.first) {
    //         this.initTimer();
    //         setTimeout(
    //             () => {
    //                 if (this.timesClicked > 5) {
    //                     this.levelsHandler(3, 'unlock');
    //                     this.levelsHandler(3, 'setCurrent');
    //                 }
    //                 this.first = true;
    //                 this.timesClicked = 0;      
    //             }, 1000
    //         );
    //     }
    //     this.first = false
    //     this.timesClicked++;
    // }
    
    // initTimer() {
    //     const date = new Date()
    //     this.interval = setInterval(() => {
    //         let currentDateObj = new Date();
    //         let numberOfMlSeconds = currentDateObj.getTime();
    //         let time = (10 - (new Date(numberOfMlSeconds - 100).getTime() / 1000 - date.getTime() / 1000)).toFixed(2);
    //         if (time <= 0) {
    //             clearInterval(this.interval)
    //         }
    //     }, 100);
    // }

    // Livello 3
    // Livello 4

    handleSubmit(event){
    	event.preventDefault();
		const formData = new FormData(event.target);
		const data = [...formData.entries()];
		const validator = new FormValidator(formData);
		let valid = validator.validateAnswers();
		if(valid){
			validator.clearFormError();
			alert("Congrats!!")
		}
    }
}

class FormValidator {
	constructor(formData){
		this.formData = formData;
		this.answers = {
			"internalPhone":"17",
			"assumption":"Michele -> Leonardo -> Lorenzo -> Natalia -> Semir",
			"hidden":"Leonardo",
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
				if(this.answers[ansKey] !== val){
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

	setQuestionError(inputName,errorText){
		let input = document.querySelector("[name=" + inputName + "]");
		let container = input.closest(".question-container");
		container.scrollIntoView();
		container.classList.add("error");
		setTimeout(() => {
			container.classList.remove("error");
		},3000)
		this.setFormError("Ops! Sembra che tu abbia sbagliato qualche risposta!!");
	}
}

const game = new Levels();

