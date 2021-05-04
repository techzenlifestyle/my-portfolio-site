// Typerwriter Animation
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

var toggleView = function(isChanged, btn) {
    var header = document.getElementById("exp-header")
    var resumeBtn = document.getElementById("resume-btn")
    var timelineArrow = document.getElementById("timeline-arrow")
    var expElements = document.getElementsByClassName("exp-toggle-content")
    var ecaElements = document.getElementsByClassName("eca-toggle-content")
    
    if(isChanged.Value) {
        for (var i = 0; i < ecaElements.length; i++) {
            ecaElements[i].style.display = 'inline-block'
            if (ecaElements[i].classList.contains('left')) {
                ecaElements[i].classList.add('animate__animated', 'animate__fadeOutLeft');
            } else if (ecaElements[i].classList.contains('right')) {
                ecaElements[i].classList.add('animate__animated', 'animate__fadeOutRight');
            }
        }
        resumeBtn.classList.add('animate__animated', 'animate__fadeOut');
        btn.classList.add('animate__animated', 'animate__fadeOut');
        timelineArrow.classList.add('animate__animated', 'animate__fadeOut');
        setTimeout(function () {
            header.style.background = "#F9FDFF";
            timelineArrow.src = "/assets/images/arrow.svg"
            resumeBtn.classList.remove('btn-dark');
            resumeBtn.classList.add('btn-primary');
            btn.classList.remove('btn-dark');
            btn.classList.add('btn-primary');
            resumeBtn.classList.remove('animate__fadeOut');
            btn.classList.remove('animate__fadeOut');
            timelineArrow.classList.remove('animate__fadeOut');
            for (var i = 0; i < ecaElements.length; i++) {
                ecaElements[i].style.display = "none";
                expElements[i].style.display = 'inline-block'
                if (ecaElements[i].classList.contains('left')) {
                    expElements[i].classList.add('animate__animated', 'animate__fadeInLeft');
                    ecaElements[i].classList.remove('animate__fadeOutLeft');
                } else if (ecaElements[i].classList.contains('right')) {
                    expElements[i].classList.add('animate__animated', 'animate__fadeInRight');
                    ecaElements[i].classList.remove('animate__fadeOutRight');
                }
                resumeBtn.classList.add('animate__animated', 'animate__fadeIn');
                btn.classList.add('animate__animated', 'animate__fadeIn');
                timelineArrow.classList.add('animate__animated', 'animate__fadeIn');
            }
        }, 1000);
    
        isChanged.Value = false;
    } else {
        for (var i = 0; i < expElements.length; i++) {
            expElements[i].style.display = 'inline-block'
            if (expElements[i].classList.contains('left')) {
                expElements[i].classList.add('animate__animated', 'animate__fadeOutLeft');
            } else if (expElements[i].classList.contains('right')) {
                expElements[i].classList.add('animate__animated', 'animate__fadeOutRight');
            }
        }
        resumeBtn.classList.add('animate__animated', 'animate__fadeOut');
        btn.classList.add('animate__animated', 'animate__fadeOut');
        timelineArrow.classList.add('animate__animated', 'animate__fadeOut');
        setTimeout(function () {
            header.style.background = "#FFF5B4";
            timelineArrow.src = "/assets/images/arrow-gold.svg"
            resumeBtn.classList.remove('btn-primary');
            resumeBtn.classList.add('btn-dark');
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-dark');
            resumeBtn.classList.remove('animate__fadeOut');
            btn.classList.remove('animate__fadeOut');
            timelineArrow.classList.remove('animate__fadeOut');
            
            for (var i = 0; i < ecaElements.length; i++) {
                expElements[i].style.display = "none";
                ecaElements[i].style.display = 'inline-block'
                if (ecaElements[i].classList.contains('left')) {
                    ecaElements[i].classList.add('animate__animated', 'animate__fadeInLeft');
                    expElements[i].classList.remove('animate__fadeOutLeft');
                } else if (ecaElements[i].classList.contains('right')) {
                    ecaElements[i].classList.add('animate__animated', 'animate__fadeInRight');
                    expElements[i].classList.remove('animate__fadeOutRight');
                }
                resumeBtn.classList.add('animate__animated', 'animate__fadeIn');
                btn.classList.add('animate__animated', 'animate__fadeIn');
                timelineArrow.classList.add('animate__animated', 'animate__fadeIn');
            }
        }, 1000);

        isChanged.Value = true;
    }
};

window.onload = function() {
    //Typewriter animation
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
    
    //My Experience button functionality
    var isChanged = {Value: false};
    var button = document.getElementById("eca-btn");
    button.addEventListener("click", function() { toggleView(isChanged, button) } );
}

function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

// Check if it's time to start the animation.
function checkAnimation() {
    var $elem = $('.services-col');

    // If the animation has already been started
    if ($elem.hasClass('animate__animated')) return;

    if (isElementInViewport($elem)) {
        // Start the animation
        $elem.addClass('animate__animated animate__fadeInDown');
    }
}

// Capture scroll events
// $(window).scroll(function(){
//     checkAnimation();
// });