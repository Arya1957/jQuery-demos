var cateBtn = $('.nav-aside>.category');

cateBtn.mouseenter(function () {
    console.log(this);
    $(this).find('.subcategory').addClass('active');
    // $(this).find('.subcategory').show()
    // $(this).find('.subcategory').css('display', 'block')
});

cateBtn.on('mouseleave', function () {
    console.log(this);
    $(this).find('.subcategory').removeClass('active');
    //  $(this).find('.subcategory').hide();
    // $(this).find('.subcategory').css('display', 'none')

});