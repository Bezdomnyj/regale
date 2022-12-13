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
}

const game = new Levels();

