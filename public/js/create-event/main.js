jQuery(function($) {
	var services = {
		post: function(event) {
			$.ajax({
				url: "/event/create",
				type: "POST",
				data: JSON.stringify(utility.getJSON()),
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(data) {
					console.log(data);
				}
			});
			alert(JSON.stringify(utility.getJSON()));
		}
	};

	var utility = {
		getDates: function() {
			return { "dates": "Hey!"};
			//return $("#currentData").text();
		},

		getJSON: function () {
			var jsonTemplate = {
				"event_name": "Birthday Party",
				"event_type": "recurring",
				"proposed_dates": [
				],
				"creator_name": "ME",
				"creator_email": "trash@thegarbagecan.com",
				"member_email": ["a@dsf.com", "b@dsf.com"],
				"description": "this is a test"
			}

			for (var j = 0; j < 7; j++) {
				var dateJson = {
					"date" : "10/" + j + "/2014",
					"times" : []
				};
				var start = null;
				var end = null;
				for (var i = 0; i < 24; i++) {
					if (start == null && enabled[i][j]) {
						start = i + 1;
					} else if (start != null && !enabled[i][j]) {
						end = i;
						dateJson.times.push(
							{
								"start" : start + ":00",
								"end" : end + ":00"
							}
						);
						start = null;
						end = null;
					}
				}
				if (start != null) {
					dateJson.times.push(
						{
							"start" : "" + start + ":00",
							"end" : "" + (enabled.length - 1) + ":00"
						}
					);
				}
				if (dateJson.times.length > 0) {
					jsonTemplate.proposed_dates.push(dateJson);
				}
			}
			return jsonTemplate;
		}
	};

	var dates = utility.getDates();

	$("#testPost").click({ "dates": dates }, services.post);

	var enabled = new Array(24);
	for (var i = 0; i < enabled.length; i++) {
		enabled[i] = new Array(7);
		for(var j = 0; j < 7; j++) {
			enabled[i][j] = false;
		}
	}

	$('.timeslot').click(function () {
		var $button = $(this);
		var dayIndex = $button.attr("wib-day");
		var timeIndex = $button.attr("wib-time");
		if (enabled[timeIndex][dayIndex]) {
			$button.css("border", "0px solid #000");
			enabled[timeIndex][dayIndex] = false;
		} else {
			$button.css("border", "1px solid #0F0");
			enabled[timeIndex][dayIndex] = true;
		}
	});

	$('#sendButton').click(function (event) {
		services.post(event);
	});
    
    //SIDEBAR TEXTBOXES AUTOSIZE AND AUTOFILL
    $('.sidebarText').autosize();
    
    //preventing enter key
    $('.sidebarText.nonInvite').keypress(function(event){
        if (event.keyCode == 10 || event.keyCode == 13) 
            event.preventDefault();
    });
    
    
    function maxEmailInitedKey() {
        var emailInvitedArray = [];
        if ($('.emailInvited').length) {
            emailInvitedArray = $('.emailInvited').map(function() {
              return parseInt($(this).attr('data-emailInvited'));
            });
        }
        if (emailInvitedArray.length) {
            var max = Math.max.apply(Math, emailInvitedArray);
            return max; 
        }
        else {
            return 333;
        } 
    }
    
    function deleteByKey(deleteKey) {
        $('p[data-emailInvited="' + deleteKey + '"]').remove();
        $('div[data-closeButton="' + deleteKey + '"]').remove();
    }
    emailInvitedKey = maxEmailInitedKey() + 1;
    
    $('.closeButton').click(function(event) {
        event.preventDefault;
        var deleteKey = $(this).attr('data-closeButton');
        deleteByKey(deleteKey);
    });
    
    $('.sidebarText.invite').keypress(function(event){
        if (event.keyCode == 32 || event.keyCode == 13 || event.keyCode == 188) {
            event.preventDefault();   
        }
    });
    
    $('.sidebarText.invite').keydown(function(event){
        if (event.keyCode == 32 || event.keyCode == 13 || event.keyCode == 188) {
            event.preventDefault();
            var emailAdd = $('#emailInvite').val();
            var regexEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
            var regexWhiteSpace = /[\s\t\v]/;
            if (emailAdd == "") {
                //do nothing
            }
            else if (regexEmail.test(emailAdd) && !regexWhiteSpace.test(emailAdd))   {
                var emailInvited = $("<p class='emailInvited' data-emailInvited='" + emailInvitedKey + "'>" + emailAdd + "</p>");
                var closeButton = $("<div class='closeButton' data-closeButton='" + emailInvitedKey + "'></div>");
                emailInvited.appendTo('.emailList');
                closeButton.appendTo('.emailList');
                closeButton.click(function(event) {
                    event.preventDefault;
                    var deleteKey = $(this).attr('data-closeButton');
                    deleteByKey(deleteKey);
                });
                $('#emailInvite').val('');
                emailInvitedKey++;
            }
            else {
                alert('Please enter a valid e-mail'); 
            }
        }
        if (event.keyCode == 8) {
            if (!$('#emailInvite').val().length) {
                var deleteKey = maxEmailInitedKey();
                deleteByKey(deleteKey);
            }
        }
    });
    
    
    function getData() {
        var emailInvite = [];
        var creatorName = $('#name').val();
        var creatorEmail = $('#email').val();
        var eventTitle = $('#title').val();
        var eventDescription = $('#description').val();
        $('.emailInvited').each(function () {
            emailInvite.push($(this).html());
        });
        
        var outJSON = {
            "event_name": eventTitle,
            "event_type": "recurring",
            "proposed_dates": [
            ],
            "creator_name": creatorName,
            "creator_email": creatorEmail,
            "member_email": emailInvite,
            "description": eventDescription
        }
        
        return outJSON;
    }
});
