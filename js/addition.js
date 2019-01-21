$(function(){
    $('.header-menu__item-icon').on('click', function(e){
        e.preventDefault();
        $(this).siblings('.header-submenu').toggleClass('is-show');
    });
});