$(document).ready(function(){
    $("img").show("slide", 
                  { direction: "left" }, 
                  1000);   

//    $(".item-2").show("slide", { direction: "left" }, 1000);
    $('.button-1').click(function() {
        $( ".event" ).toggle(1000);
        if($('.bar3').css('opacity') == 1){
				$('.bar3').animate({opacity:0.3}, 1000);
			} else{
				$('.bar3').animate({opacity:1}, 1000);
			}
        $('.show').toggle(1000);
    })
    
    $('.button-2').click(function(){
        $( ".death-3" ).toggle(1000);
        if($('.death-1').css('opacity') == 1){
				$('.death-1').animate({opacity:0.2}, 1000);
                $('.death-2').animate({opacity:0.2}, 1000);
			} else{
                $('.death-1').animate({opacity:1}, 1000);
                $('.death-2').animate({opacity:1}, 1000);
				
			}
    })
    
    $('.button-3').click(function(){
        $('.line').toggle(1000);
        $('.dot').toggle(1000);
        $('.show2').toggle(1000);
    })
    
    $('.button-4').click(function(){
        $('.img-text-show').toggle(1000);
    })
    
    $('.button-5').click(function(){
        $('.show3').toggle(1000);
    })
    
     $('.button-6').click(function(){
        $('#nine-chart').toggle(1000);
    })
})

document.body.className += ' fade-out';
$(function() {
    $('body').removeClass('fade-out');
});

