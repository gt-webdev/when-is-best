var _id = 0;
var _z_index = 110;
var mouseY;

function getTimeslotIndex (pixels, $block) {
    return Math.round((pixels - $block.offset().top) / 8);
}

function getPixelOffset (index) {
    return index * 8;
}

function getPixelInterval (startIndex, endIndex) {
    return (endIndex - startIndex) * 8;
}

function getNewId () {
    _id++;
    return "timespan_" + _id;
}

function getZIndex () {
    return _z_index++;
}

var test = false;

var ACTION_NONE = 0;
var ACTION_RESIZE_TOP = 1;
var ACTION_RESIZE_BOTTOM = 2;
var ACTION_MOVE = 3;
var ACTION_PAINT = 4;
var action = ACTION_NONE;
var timespanManipulating = null;

function Timespan($dayBlock, startTime, endTime, identifier) {
    this.day = $dayBlock.attr("wib-col");
    this.startTime = startTime;
    this.endTime = endTime;
    this.indentifier = identifier;
    this.$dayBlock = $dayBlock;
    var thisRef = this;

    var html = "<div class='timespan' id='" + identifier
    + "'><div class='timespanTop' />"
    + "<div class='timespanBottom' /></div>";
    $dayBlock.append(html);
    var jQueryObject = $("#" + identifier);

    var $topResizer = $("#" + identifier + " .timespanTop");
    var $bottomResizer = $("#" + identifier + " .timespanBottom");
    $topResizer.mousedown(function (event) {
        action = ACTION_RESIZE_TOP;
        timespanManipulating = thisRef;
        mousey = event.pageY;
        jQueryObject.css("z-index", getZIndex());
        event.stopPropagation();
    });
    $bottomResizer.mousedown(function (event) {
        action = ACTION_RESIZE_BOTTOM;
        timespanManipulating = thisRef;
        mousey = event.pageY;
        jQueryObject.css("z-index", getZIndex());
        event.stopPropagation();
    });

    jQueryObject.mousedown(function (event) {
        action = ACTION_MOVE;
        timespanManipulating = thisRef;
        mouseY = event.pageY;
        jQueryObject.css("z-index", getZIndex());
        event.stopPropagation();
    });

    jQueryObject.css("top", getPixelOffset(startTime));
    jQueryObject.css("height", getPixelInterval(startTime, endTime));
    jQueryObject.css("z-index", getZIndex());

    this.paint = function (y) {
        var topOffset = jQueryObject.offset().top;
        if (y > topOffset + jQueryObject.height()) {
            jQueryObject.height(y - topOffset);
        } else if (y < topOffset) {
            var change = topOffset - y;
            jQueryObject.css("top", "-=" + change);
            jQueryObject.height(jQueryObject.height() + change);
        }
    }

    this.resizeTop = function (mouseY) {
        var change = jQueryObject.offset().top - mouseY;
        jQueryObject.css("top", "-=" + change);
        jQueryObject.height(jQueryObject.height() + change);
        console.log("resizeTop");
    }

    this.resizeBottom = function (mouseY) {
        console.log("resizeBottom");
        jQueryObject.height(mouseY - jQueryObject.offset().top);
    }

    this.move = function (change) {
        console.log("move");
        jQueryObject.css("top", "+=" + change);
    }

    //scope issues//
    this.externalSnap = snap;
    function snap () {
        startTime = getTimeslotIndex(
            jQueryObject.offset().top, $dayBlock);
            jQueryObject.css("top", getPixelOffset(startTime));

            endTime = getTimeslotIndex(
                jQueryObject.offset().top
                + jQueryObject.height(), $dayBlock);
                jQueryObject.css("height", getPixelInterval(startTime, endTime));
            }
        }

        $(document).ready(function () {

            //keep browser from highlighting text//
            var mouseDown = false;
            $(".dayBlock").on('mousedown touchstart', function(event) {
                event.preventDefault();
                mouseDown = true;
            });
            $(".dayBlock").on('mousemove touchmove', function(event) {
                event.preventDefault();
            });
            $(window.document).on('mouseup touchend', function(event) {
                // Capture this event anywhere in the document, since the
                // mouse may leave our ".timeslot" while mouse is down and then
                // the 'up' event will not fire within the element.
                mouseDown = false;
            });

            //keeps track of active timespan objects//
            var timespans = [];


            $(".dayBlock").mousemove(function (event) {
                if (timespanManipulating != null) {
                    if (action == ACTION_RESIZE_TOP) {
                        timespanManipulating.resizeTop(event.pageY);
                    } else if (action == ACTION_RESIZE_BOTTOM) {
                        timespanManipulating.resizeBottom(event.pageY);
                    } else if (action == ACTION_MOVE) {
                        timespanManipulating.move(event.pageY - mouseY);
                    } else if (action == ACTION_PAINT) {
                        timespanManipulating.paint(event.pageY);
                    }
                }
                mouseY = event.pageY;
            });

            $(".timeslot").mousedown(function () {
                console.log("test");
                var timeslotId = getNewId();
                var $dayBlock = $("#dayBlock_" + $(this).attr("wib-col"));

                var startIndex = getTimeslotIndex(mouseY, $dayBlock);
                var timespan = new Timespan($dayBlock, startIndex,
                    startIndex + 1, timeslotId);
                    timespanManipulating = timespan;
                    action = ACTION_PAINT;
                    timespans.push(timespan);
                });

                $("body").mouseup(function () {
                    if ( timespanManipulating != null) {
                        timespanManipulating.externalSnap();
                    }
                    action = ACTION_NONE;
                    timespanManipulating = null;
                });

            });
