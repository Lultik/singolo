const MENU = document.getElementById('menu');
const SCREEN = document.getElementById('slider');
const TAGS = document.getElementById('tags');
const PICTURE = document.getElementById('portfolio-img');
const SUBMIT_BUTTON_CLOSE = document.getElementById('submit-button-close');
const FORM = document.getElementById('form');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// select menu navigation
MENU.addEventListener('click', (event) => {
    MENU.querySelectorAll('a').forEach(el =>
        el.classList.remove('nav_active'));
        event.target.classList.add('nav_active')
});

SCREEN.querySelectorAll('.phone-screen').forEach(el => {
    el.addEventListener('click', event => {
        if(event.target.classList.contains('phone-screen-vertical')){
            SCREEN.querySelectorAll('.phone-screen-vertical').forEach(el => {
                el.classList.toggle('screen-off')
            });
        }
        if(event.target.classList.contains('phone-screen-horizontal')){
            SCREEN.querySelectorAll('.phone-screen-horizontal').forEach(el => {
                el.classList.toggle('screen-off')
            });
        }
    })
});

// switch on/off phone screen
// SCREEN.querySelectorAll('.phone-screen').forEach(el => {
//     el.addEventListener('click', event => {
//         event.target.classList.toggle('screen-off')
//     })
// });

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
    });
    if ( event.target.classList.contains('portfolio-img__item') )
        event.target.classList.add('img_active');
});

FORM.addEventListener('submit', event => {
   event.preventDefault();

    const f_subject = `<p>Тема: ${document.getElementById('input-subject').value.toString()}</p>`;
    const f_desc = `<p>Описание: ${document.getElementById('input-desc').value.toString()}</p>`;
    const defaultSubject = `<p>Без темы</p>`;
    const defaultDesc = `<p>Без описания</p>`;

    document.getElementById('message-block').classList.remove('hidden')

    if(document.getElementById('input-subject').value.toString() === ''){
        document.getElementById('subject').innerHTML = defaultSubject;
     } else {
        document.getElementById('subject').innerHTML = f_subject;
    }
    if(document.getElementById('input-desc').value.toString() === ''){
        document.getElementById('desc').innerHTML = defaultDesc;
     } else {
        document.getElementById('desc').innerHTML = f_desc;
    }

});

SUBMIT_BUTTON_CLOSE.addEventListener('click', event => {
    document.getElementById('subject').innerText = '';
    document.getElementById('desc').innerText = '';
    document.getElementById('message-block').classList.add('hidden')
    FORM.querySelectorAll('.input').forEach(el => {
        el.value = null;
    })
});

//slider
function Carousel (setting){

    let privates = {};

    privates.setting = setting;

    privates.sel = {
        "main": document.querySelector(privates.setting.main),
        "wrap": document.querySelector(privates.setting.wrap),
        "children": document.querySelector(privates.setting.wrap).children,
        "prev": document.querySelector(privates.setting.prev),
        "next": document.querySelector(privates.setting.next)
    };

    privates.opt = {
        "position": 0,
        "max_position": document.querySelector(privates.setting.wrap).children.length
    };

    privates.sel.wrap.appendChild(privates.sel.children[0].cloneNode(true));

    if(privates.sel.prev !== null){
        privates.sel.prev.addEventListener('click', () => {
            this.prev_slide();
        });
    }

    if(privates.sel.next !== null){
        privates.sel.next.addEventListener('click', () => {
            this.next_slide();
        });
    }

    this.prev_slide = () => {

        --privates.opt.position;

        if (privates.opt.position < 0){
            privates.sel.wrap.classList.add('s-notransition');
            privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.max_position}00%)`;
            privates.opt.position = privates.opt.max_position - 1;
        }
        setTimeout(() => {
            privates.sel.wrap.classList.remove('s-notransition');
            privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
        }, 10);
    };

    this.next_slide = () => {

        if(privates.opt.position < privates.opt.max_position) {
            ++privates.opt.position;
        }

        privates.sel.wrap.classList.remove('s-notransition');
        privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;

        privates.sel.wrap.addEventListener('webkitTransitionEnd', () => {
            if(privates.opt.position >= privates.opt.max_position) {
                privates.sel.wrap.classList.add('s-notransition');
                privates.sel.wrap.style["transform"] = 'translateX(0)';
                privates.opt.position = 0;
            }
        });
    };

}
new Carousel({
    "main": ".js-carousel",
    "wrap": ".js-carousel__wrap",
    "prev": ".js-carousel__prev",
    "next": ".js-carousel__next"
});