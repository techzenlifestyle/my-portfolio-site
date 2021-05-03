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
    // change header background color
    var header = document.getElementById("exp-header")
    var resumeBtn = document.getElementById("resume-btn")
    var timelineArrow = document.getElementById("timeline-arrow")
    var expElements = document.getElementsByClassName("exp-toggle-content")
    var ecaElements = document.getElementsByClassName("eca-toggle-content")
    
    if(isChanged.Value) {
        for (var i = 0; i < ecaElements.length; i++) {
            ecaElements[i].style.display = "none";
        }
        for (var i = 0; i < expElements.length; i++) {
            expElements[i].style.display = "block";
        }
        header.style.background = "#F9FDFF";
        resumeBtn.classList.remove('btn-dark');
        resumeBtn.classList.add('btn-primary');
        btn.classList.remove('btn-dark');
        timelineArrow.src = "/assets/images/arrow.svg"
        btn.classList.add('btn-primary');
        isChanged.Value = false;
    } else {
        for (var i = 0; i < expElements.length; i++) {
            expElements[i].style.display = "none";
        }
        for (var i = 0; i < ecaElements.length; i++) {
            ecaElements[i].style.display = "block";
        }
        header.style.background = "#FFF5B4";
        resumeBtn.classList.remove('btn-primary');
        resumeBtn.classList.add('btn-dark');
        btn.classList.remove('btn-primary');
        timelineArrow.src = "/assets/images/arrow-gold.svg"
        btn.classList.add('btn-dark');
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
    
    var isChanged = {Value: false};
    var button = document.getElementById("eca-btn");
    button.addEventListener("click", function() { toggleView(isChanged, button) } );
}

function isElementInViewport(elem) {
    console.log('in function')
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
    var $elem = $('services-col');

    // If the animation has already been started
    if ($elem.hasClass('animate__animated')) return;

    if (isElementInViewport($elem)) {
        // Start the animation
        $elem.addClass('animate__animated animate__fadeInDown');
    }
}

// Capture scroll events
$(window).scroll(function(){
    checkAnimation();
});