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
            $panel.slideUp("slow");
        }
    });
});
