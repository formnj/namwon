var Swipers = [];
var interleaveOffset = 0.5;
var parallaxOptions;
$('.swiper-container').each(function(i) {
    $(this).attr('swiper-index',i); //Attribute for swiper control

    if($(this).find('[class*="swiper-button-"]').length > 0){
        nextEl = '.swiper-button-next-'+(i);
        prevEl = '.swiper-button-prev-'+(i);

        navigation = {
            nextEl: nextEl,   //버튼 설정
            prevEl: prevEl,   //버튼 설정
        };

        for(var j=0; j<$(this).find('[class*="swiper-button-"]').length; j++){
            $(this).find('[class*="swiper-button-"]').eq(j).attr('class',$(this).find('[class*="swiper-button-"]').eq(j).attr('class')+'-'+i);
        }
    } else {
        navigation = {}
    }

    if($(this).find('.swiper-pagination-wrap').length > 0){
        pagination = {
            el: '.swiper-pagination-wrap-'+i,
            clickable: true,
        }
        $(this).find('.swiper-pagination-wrap').attr('class', 'swiper-pagination-wrap-'+i)
    } else {
        pagination = {}
    }

    parallaxOptions = {
        loop: true,
        speed: 1000,
        parallax: true,
        autoplay: {
            delay: 500,
            disableOnInteraction: false,
        },
        watchSlidesProgress: true,
        navigation: {
            nextEl: nextEl,
            prevEl: prevEl,
        },
        pagination,
        on: {
            progress: function() {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".item").style.transform =
                    "translate3d(" + innerTranslate + "px, 0, 0)";
                }      
            },

            touchStart: function() {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
            }
            },

            setTransition: function(speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".item").style.transition =
                    speed + "ms";
                }
            }
        }
    }
    defaultOptions = {
        loop: true,
        speed: 1000,
        navigation,
        pagination,
        autoplay: {
            delay: 500,
            disableOnInteraction: false,
        },
        lazy : {
            loadPrevNext : true // 이전, 다음 이미지는 미리 로딩
        },
    }

    if($(this).hasClass('parallax')){
        Swipers[i] = new Swiper($(this),parallaxOptions);
    } else {
        Swipers[i] = new Swiper($(this),defaultOptions);
    }

    $(this).find('.autoplay').click(function(){
        if(!$(this).hasClass('stop')){
            Swipers[i].autoplay.stop();
            $(this).text('start!!').addClass('stop');
        } else {
            Swipers[i].autoplay.start();
            $(this).text('pause!!').removeClass('stop');
        }
    });
});
// var swiper = new Swiper(".swiper-container", parallaxOptions);