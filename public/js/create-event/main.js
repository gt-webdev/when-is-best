jQuery(function($) {
	var services = {
		post: function(event) {
			$.ajax({
				url: "/create-event",
				type: "POST",
				data: JSON.stringify(utility.getDates()),
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(data) {
					console.log(data);
				}
			});
		}
	};

	var utility = {
		getDates: function() {
			return { "dates": "Hey!"};
			//return $("#currentData").text();
		}
	};

	var dates = utility.getDates();

	$("#testPost").click({ "dates": dates }, services.post);
});