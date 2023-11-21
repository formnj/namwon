$(document).ready(function(){

    /* include */
    $('header').load('./include/header.html');
    $('footer').load('./include/footer.html');
    /* //include */

    $('label.input').each(function(){
        placeholder(this);
    });

    /* zoom */
    var zoom = 100,
    maxZoom = 120,
    minZoom = 80;

    $('button[class*="zoom_"]').click(function(){
        if($(this).hasClass('zoom_in')){
            if(zoom < maxZoom){
                zoom+=5;
            } else {
                alert('더이상 확대할 수 없습니다.');
            }
        } else {
            if(zoom > minZoom){
                zoom-=5;
            } else {
                alert('더이상 축소할 수 없습니다.');
            }
        }
        $('body').css({
            zoom: zoom+'%'
        });
    });

    $('body').keydown(function(e){
        if(e.keyCode == 107){
            if(zoom < maxZoom){
                zoom+=5;
            } else {
                alert('더이상 확대할 수 없습니다.');
            }
        }
        if(e.keyCode == 109){
            if(zoom > minZoom){
                zoom-=5;
            } else {
                alert('더이상 축소할 수 없습니다.');
            }
        }
        $('body').css({
            zoom: zoom+'%'
        });
    });
    /* //zoom */

    /* datepicker */
    $( ".datepicker").datepicker({
        onSelect: function(dateString) {
            if(dateString.length > 0){
                $(this).siblings('i').hide();
            } else {
                $(this).siblings('i').show();
            }
        }
    });

    /* breadcrumb */
    $('.breadcrumb dt button').click(function(){
        if($(this).closest('dl').hasClass('active')){
            $(this).parent().next().children().stop().slideUp();
            $(this).closest('dl').removeClass('active');
        } else {
            $(this).closest('li').siblings().find('dl').removeClass('active');
            $(this).closest('li').siblings().find('dl ul').stop().slideUp();
            $(this).closest('dl').addClass('active');
            $(this).parent().next().children().stop().slideDown();
        }
    });
});

$(window).resize(function(){
    var _width = $(window).width();

    if(_width > 1199){
    } else {
    }
});

const scroll_callback = {
    fixed: function(){
        const body = document.querySelector('body');

        if (!body.getAttribute('scrollY')) {
            const pageY = window.pageYOffset;

            body.setAttribute('scrollY', pageY.toString());

            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.left = '0px';
            body.style.right = '0px';
            body.style.top = `-${pageY}px`;
        }
    }, clear: function(){
        const body = document.querySelector('body');
        body.removeAttribute('style');
        $(window).scrollTop(body.getAttribute('scrollY'));
        body.removeAttribute('scrollY');
    }
}

/* Input Form */
function input_btn_chk(e){ // 버튼보이기
    var icon_button = e.closest('.label_wrap').querySelector('button')
    if(e.value.length>0){
        icon_button.style.cssText="display:block;"
    }else{
        icon_button.style.cssText="display:none;"
    }    
}//function input_btn_chk()
function input_btn_fn(e){ // del 클릭시, input 내용 삭제
    var input = e.closest('.label_wrap').querySelector('input');
    input.value = null;
    e.style.display="none";
    e.parentNode.querySelector('i').style.display="block";
}//function input_btn_fn()
function input_btn_chg(){
    var icon_pss = document.querySelector('button.icon_pss')
    var input_password = document.querySelector('input.password')
    console.log(icon_pss,input_password)
    icon_pss.classList.toggle('active');
    if(icon_pss.classList.contains('active')){
        
        input_password.setAttribute('type', 'text');
    }else{
        input_password.setAttribute('type', 'password');
    }
}

/* input focus */
function placeholder(_target){
    _target = $(_target);
    _target.find('i').click(function(){
        $(this).hide();
        $(this).siblings('input').focus();
    });
    _target.find('input').focus(function(){
        $(this).siblings('i').hide();
    });
    _target.find('input').blur(function(){
        if($(this).val().length < 1){
            $(this).siblings('i').show();
        }
    });
}