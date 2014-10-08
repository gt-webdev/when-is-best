var mainCanvas = document.querySelector("#myCanvas");
var mainContext = mainCanvas.getContext("2d");

function drawCircle(radius) {

    // draw the circle
    mainContext.beginPath();

    mainContext.arc(0, 75, radius, 0, Math.PI * 2, false);
    mainContext.closePath();

    // color in the circle
    mainContext.fillStyle = "#00FF00";
    mainContext.fill();
}
$("#dateSelector").change(function(){
    $("#goBlock").animate(
        {left:635}, {}, 40);
    $("#myCanvas").animate(
        { left:600 },
        {
            duration:200,
            start: function(animation) {
                var radius = 1;
                var circleDrawInterval = setInterval(function(){
                        radius += 2;
                        drawCircle(radius);
                        if (radius > 25) {
                            clearInterval(circleDrawInterval);
                        }
                    },20);
            },
            complete: function() {
                var size = 10;
                var triangleDrawInterval = setInterval(function() {

                    size = size+=5;

                    mainContext.beginPath();

                    mainContext.moveTo(0, mainCanvas.height / 2 - size);
                    mainContext.lineTo(size * 2, mainCanvas.height / 2);
                    mainContext.lineTo(0, mainCanvas.height / 2 + size);
                    mainContext.lineTo(0, mainCanvas.height / 2 - size);
                    mainContext.strokeStyle = "green";
                    mainContext.stroke();
                    mainContext.closePath();

                    // color in the circle
                    mainContext.fillStyle = "#00FF00";
                    mainContext.fill();
                    if (size > 74) {
                        clearInterval(triangleDrawInterval);
                    }
                },20);
            }
        }
    );
});