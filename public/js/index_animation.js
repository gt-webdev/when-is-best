$(document).ready(function () {
    
    function dropDown() {
        var $panel = $('#datepickerBlock');
        if (!$panel.is(':visible')) {
            $panel.slideDown("slow", "easeOutBounce");
        }
    }
    
    $("#oneTimeRadioSelection").click(
        dropDown
    );
    
    if ($("#oneTimeRadioSelection").is(":checked")) {
        dropDown();
    }
    
    function slideUp() {
        var $panel = $('#datepickerBlock');
        if ($panel.is(':visible')) {
            $panel.animate({top:-50}, {queue:false});
            $panel.slideUp("slow", function () {
                $panel.css("top", 0);
            });
        }
    }
    
    $("#weeklyRadioSelection").click(
        slideUp
    );
    
    if ($("#weeklyRadioSelection").is(":checked")) {
        dropDown();
    }
    
});
