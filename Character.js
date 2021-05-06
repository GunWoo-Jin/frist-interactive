
function Character (info) {
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('character');
    this.mainElem.innerHTML = `
        <div class="character-face-con character-head">
            <div class="character-face character-head-face face-front"></div>
            <div class="character-face character-head-face face-back"></div>
        </div>
        <div class="character-face-con character-torso">
            <div class="character-face character-torso-face face-front"></div>
            <div class="character-face character-torso-face face-back"></div>
        </div>
        <div class="character-face-con character-arm character-arm-right">
            <div class="character-face character-arm-face face-front"></div>
            <div class="character-face character-arm-face face-back"></div>
        </div>
        <div class="character-face-con character-arm character-arm-left">
            <div class="character-face character-arm-face face-front"></div>
            <div class="character-face character-arm-face face-back"></div>
        </div>
        <div class="character-face-con character-leg character-leg-right">
            <div class="character-face character-leg-face face-front"></div>
            <div class="character-face character-leg-face face-back"></div>
        </div>
        <div class="character-face-con character-leg character-leg-left">
            <div class="character-face character-leg-face face-front"></div>
            <div class="character-face character-leg-face face-back"></div>
        </div>`;

        document.querySelector('.stage').appendChild(this.mainElem);
        this.mainElem.style.left = info.xPos + '%';
        this.xPos = info.xPos;
        this.speed = info.speed;
        this.direction;
        this.runningState = false;
        this.rafId;
        this.init();
}

Character.prototype = {
    constructor: Character,
    init: function() {
        const self = this;
        let isScrolling;
        let scrollPos = 0;

        window.addEventListener('scroll', function() {
            self.mainElem.classList.add('running')

            window.clearTimeout(isScrolling);

            isScrolling = setTimeout(function(){
            self.mainElem.classList.remove('running')
            }, 500)

            if ((document.body.getBoundingClientRect()).top > scrollPos){
                self.mainElem.setAttribute('data-direction', 'backward');
            } else {
                self.mainElem.setAttribute('data-direction', 'forward');
            }
            scrollPos = (document.body.getBoundingClientRect()).top;
        });

        window.addEventListener('keydown', function(e) {
            if (self.runningState) return;

            if (e.key === 'ArrowLeft') {
                self.direction = 'left';
                self.mainElem.setAttribute('data-direction', 'left');
                self.mainElem.classList.add('running');

                self.run(self);
                self.runningState = true;
            } else if (e.key === 'ArrowRight') {
                self.direction = 'right';
                self.mainElem.setAttribute('data-direction', 'right');
                self.mainElem.classList.add('running');

                self.run(self);
                self.runningState = true;
            }
        });
        window.addEventListener('keyup', function() {
            self.mainElem.classList.remove('running');
            cancelAnimationFrame(self.rafId);
            self.runningState = false;
        });

    },  run : function (self) {
        if (self.direction == 'left') {
            self.xPos -= self.speed*0.5+0.5;
        } else if (self.direction == 'right') {
            self.xPos += self.speed*0.5+0.5;
        }

        if (self.xPos < 5) {
            self.xPos = 5;
        }
        if (self.xPos > 95) {
            self.xPos = 95;
        }
        self.mainElem.style.left = self.xPos+'%';
        self.rafId = requestAnimationFrame(function() {
            self.run(self);
        });
    }
}
