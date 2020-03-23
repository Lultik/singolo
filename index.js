const SCREEN = document.getElementById('slider');
const TAGS = document.getElementById('tags');
const PICTURE = document.getElementById('portfolio-img');
const SUBMIT_BUTTON_CLOSE = document.getElementById('submit-button-close');
const FORM = document.getElementById('form');
const INDICATOR = document.querySelector(".nav-indicator");
const NAV_ITEMS = document.querySelectorAll(".nav_item");
const headerHeight = document.querySelector('.header').offsetHeight;



window.addEventListener('resize', () => {
   let docWidth = window.innerWidth;

   document.querySelectorAll('.phone').forEach(el => {
       if(docWidth <= 1024){
           el.style.width = `${21}vw`
           el.style.height = `${45}vw`;
       } else {
           el.style.width = `216px`
           el.style.height = `459px`;
       }

   })

});

function handleIndicator(el) {
    NAV_ITEMS.forEach(item => {
        item.classList.remove('nav_active');
    });

    INDICATOR.style.width = `${el.offsetWidth}px`;
    INDICATOR.style.left = `${el.offsetLeft}px`;

    el.classList.add('nav_active');
}

window.addEventListener('scroll', () => {
    let fromTop = window.scrollY + headerHeight;
    NAV_ITEMS.forEach(link => {
        let section = document.querySelector(link.hash);

        if(section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop){
            link.classList.add('nav_active');
            link.classList.contains('nav_active') && handleIndicator(link);
        } else {
            link.classList.remove('nav_active');
        }

        if( window.scrollY === document.body.offsetHeight - window.innerHeight){
            link.classList.add('nav_active');
            link.classList.contains('nav_active') && handleIndicator(link);
        }
    })
});

SCREEN.querySelectorAll('.phone').forEach(el => {
    el.addEventListener('click', event => {

        let phoneScreen =
            event.target.classList.contains('phone-screen') ?
                event.target :
                event.target.querySelector('.phone-screen');

        if(phoneScreen.classList.contains('phone-screen-vertical')){
            SCREEN.querySelectorAll('.phone-screen-vertical').forEach(el => {
                el.classList.toggle('screen-off')
            });
        } else if(phoneScreen.classList.contains('phone-screen-horizontal')){
            SCREEN.querySelectorAll('.phone-screen-horizontal').forEach(el => {
                el.classList.toggle('screen-off')
            });
        } else phoneScreen.classList.toggle('screen-off')
    })
});

// selecting tags and shake imgs
TAGS.addEventListener('click', (event) => {
    TAGS.querySelectorAll('button').forEach(el =>
        el.classList.remove('tag_active'));
    if (event.target.attributes.value){
        event.target.classList.add('tag_active');
        for(let i = PICTURE.children.length; i >= 0; i--){
            PICTURE.appendChild(PICTURE.children[Math.random() * i | 0]);
        }

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