$(document).ready(function () {
    var dateRegex = /\d\d\/\d\d\/\d\d\d\d/;

    // Helper functions for displaying/hiding date range box.
    function dropDown() {
        $('#range').collapse('show');
    }
    function slideUp() {
        var elem = $('#range');
        if (elem.is('.collapse.in')) {
            $('#range').collapse('hide');
        }
    }

    // Helper functions for enabling/disabling button
    function disableGoButton() {
        var goButton = $('#goButton');
        if (goButton.not(':disabled')) {
            goButton.prop('disabled', true);
        }
    }
    function enableGoButton() {
        var goButton = $('#goButton');
        if (goButton.is(':disabled')) {
            goButton.prop('disabled', false);
        }
    }
    function enableIfValidDates() {
        if (isValidDates()) enableGoButton();
        else disableGoButton();
    }
    function isValidDates() {
        return $('.datepicker').get().every(function(element) {
            return dateRegex.test(element.value);
        });
    }

    // Controls whether date range selectors show up.
    $("#oneTimeRadioSelection").click(dropDown);
    $("#oneTimeRadioSelection").click(enableIfValidDates);

    if ($("#oneTimeRadioSelection").is(":checked")) {
        enableIfValidDates();
        dropDown();
    }

    $(".datepicker").datepicker({
        onSelect: enableIfValidDates
    });

    $("#weeklyRadioSelection").click(slideUp);
    $("#weeklyRadioSelection").click(enableGoButton);

    if ($("#weeklyRadioSelection").is(":checked")) {
        slideUp();
        enableGoButton();
    }
});
