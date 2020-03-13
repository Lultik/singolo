const MENU = document.getElementById('menu');
const SCREEN = document.getElementById('slider');
const TAGS = document.getElementById('tags');
const PICTURE = document.getElementById('portfolio-img');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// select menu navigation
MENU.addEventListener('click', (event) => {
    MENU.querySelectorAll('a').forEach(el =>
        el.classList.remove('nav_active'));
        event.target.classList.add('nav_active')
});

// switch on/off phone screen
SCREEN.querySelectorAll('.phone-screen').forEach(el => {
    el.addEventListener('click', event => {
        event.target.classList.toggle('screen-off')
    })
});

// selecting tags and shake imgs
TAGS.addEventListener('click', (event) => {
    TAGS.querySelectorAll('button').forEach(el =>
        el.classList.remove('tag_active'));
    if (event.target.attributes.value){
        event.target.classList.add('tag_active');
        PICTURE.querySelectorAll('.portfolio-img__item').forEach((el) => {
            el.style.order = getRandomInt(12)
        })
    }
});

// bordering imgs
PICTURE.addEventListener('click', event => {
    PICTURE.querySelectorAll('.portfolio-img__item').forEach(el => {
        el.classList.remove('img_active')
    })
    if ( event.target.classList.contains('portfolio-img__item') )
        event.target.classList.add('img_active');
});