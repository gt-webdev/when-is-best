$(document).ready(function () {
    $("#oneTimeRadioSelection").click(function () {
        var $panel = $('#datepickerBlock');
        if (!$panel.is(':visible')) {
            $panel.slideDown("slow", "easeOutBounce");
        }
    });

    $("#weeklyRadioSelection").click(function () {
        var $panel = $('#datepickerBlock');
        if ($panel.is(':visible')) {
            $panel.animate({top:-50}, {queue:false});
            $panel.slideUp("slow", function () {
                $panel.css("top", 0);
            });
        }
    });
});
