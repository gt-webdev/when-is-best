function panelIntoFocus(panel, toLeft, text) {
    $(panel).animate(
        {
            left: 400,
            top: 0,
            height:270,
            width:140,
            backgroundColor: '#00AA00',
            fontSize:28
        },
        {
            duration:700,
            queue: false
        });

    $(".datepicker input").animate(
        {
            height:23,
            width:80
        },
        {
            duration:700,
            queue: false
        }
    )
}
