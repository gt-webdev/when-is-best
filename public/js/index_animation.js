$(document).ready(function () {

    function dropDown() {
        $('#range').collapse('show');
    }
    
    $("#oneTimeRadioSelection").click(dropDown);
    
    if ($("#oneTimeRadioSelection").is(":checked")) {
        dropDown();
    }
    
    function slideUp() {
        var elem = $('#range');
        if (elem.is('.collapse.in')) {
            $('#range').collapse('hide');
        }
    }
    
    $("#weeklyRadioSelection").click(slideUp);
    
    if ($("#weeklyRadioSelection").is(":checked")) {
        slideUp();
    }
    
});
