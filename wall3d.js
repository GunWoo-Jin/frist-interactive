(function(){

    const houseElem = document.querySelector('.house');
    const barElem = document.querySelector('.progress-bar');
    const stageElem = document.querySelector('.stage');
    const selectChar = document.querySelector('.select-character');
    const mousePos = {x:0, y:0};

    let maxScrollValue;

    /* 창의 크기가 변경될 때 스크롤 양이 달라지는 것을 막기 위함 */
    function resizeHandler () {
        maxScrollValue = document.body.offsetHeight-window.innerHeight;
    };

    window.addEventListener('scroll', function(){
        const scrollPer = pageYOffset / maxScrollValue;
        const zMove = scrollPer * 970 - 490;

        houseElem.style.transform = 'translate3d(0,0,'+ zMove +'vw)';
        barElem.style.width = scrollPer * 100 +'%';
    }, false);

    window.addEventListener('resize', resizeHandler, false);
    resizeHandler();

    /* 마우스 움직임에 따라 시점 변경하는 것 */
    window.addEventListener('mousemove', function(e) {
        mousePos.x = -1 + (e.clientX / window.innerWidth) *2;
        mousePos.y = 1 - (e.clientY / window.innerHeight) *2;
       
        stageElem.style.transform = 'rotateX('+ mousePos.y*5 +'deg) rotateY('+ mousePos.x*5 +'deg)';
    });

    /* 클릭한 곳의 x좌표에 캐릭터가 생성되는 것 */
    stageElem.addEventListener('click', function(e){
        new Character({
            xPos : e.clientX / window.innerWidth * 100,
            speed : Math.random()
        });
    })

    selectChar.addEventListener('click', function(e) {
        const dataSet = e.target.getAttribute('data-char');
        document.body.setAttribute('data-char', dataSet);
    })
})();