class Levels {

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

    unlockedLevel = 0;
    first = true;
    timesClicked = 0;
    developerDragged = '';

    level1;
    level2;
    level3;
    level4;

    timer;
    interval;

    constructor() {
        this.unlockLevel(1);
    }

    unlockLevel(level) {
        this.unlockedLevel = level;
        this.levelsInit(level);
        if (level != 1) {
            document.getElementById(`level-${level-1}-gift`).classList.remove('show');
        }
    }

    removeLevel(level) {
        if (this[`level${level}`]) {
            this[`level${level}`].classList.add('level-completed');
            this[`level${level}`].classList.remove('initialized');
            document.getElementById(`level-${level}-gift`).classList.add('show');
        }
    }

    levelsInit(level) {
        if (this.unlockedLevel === level) {
            switch (level) {
                case 1:
                    this.level1 = document.getElementById('level-1');
                    this.level1.classList.add('initialized')
                    break;
                case 2:
                    this.level2 = document.getElementById('level-2');
                    this.timer = document.getElementById('timer');
                    this.level2.classList.add('initialized')
                    break;
                case 3:
                    if (this.level2) {
                        this.level2.classList.add('level-completed');
                        this.level2.classList.remove('initialized');
                    }
                    this.level3 = document.getElementById('level-3');
                    this.level3.classList.add('initialized')
                    break;
                case 4:
                    if (this.level3) {
                        this.level3.classList.add('level-completed');
                        this.level3.classList.remove('initialized');
                    }
                    this.level4 = document.getElementById('level-4');
                    this.level4.classList.add('initialized')
                    break;
            }
        }
    }

    handleDrop(event, level) {
        switch (level) {
            case 1:
                if (event.target.attributes.dropref.value === this.developerDragged) {
                    let dev = document.getElementById(`image-${this.developerDragged}`)
                    dev.classList.add('completed');
                    event.target.classList.remove('to-link')
                    this.developersAndGiuseppe = this.developersAndGiuseppe.filter(
                        element => element !== this.developerDragged
                    )
                    if (this.developersAndGiuseppe.length === 0) {
                        this.removeLevel(1);
                        // this.unlockLevel(2);
                    }
                }
                break;
            default:
                break;
        }
    }

    handleOver(event, level) {
        event.preventDefault();
        switch (level) {
            case 1:
                break;
            default:
                break;
        }
    }

    handleDrag(event, name, level) {
        switch (level) {
            case 1:
                this.developerDragged = name;
                break;
            default:
                break;
        }
    }

    handleClick() {
        if (this.first) {
            this.initTimer();
            setTimeout(
                () => {
                    if (this.timesClicked > 5) {
                        this.levelsHandler(3, 'unlock');
                        this.levelsHandler(3, 'setCurrent');
                    }
                    this.first = true;
                    this.timesClicked = 0;      
                }, 1000
            );
        }
        this.first = false
        this.timesClicked++;
    }
    
    initTimer() {
        const date = new Date()
        this.interval = setInterval(() => {
            let currentDateObj = new Date();
            let numberOfMlSeconds = currentDateObj.getTime();
            let time = (10 - (new Date(numberOfMlSeconds - 100).getTime() / 1000 - date.getTime() / 1000)).toFixed(2);
            if (time <= 0) {
                clearInterval(this.interval)
            }
        }, 100);
    }
}

const game = new Levels();

