// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.

var data = {} || JSON.parse(localStorage.getItem("todoData"));

$(function(data) {
	var codes = {
		"1" : "#pending",
		"2" : "#inProgress",
		"3" : "#completed"
	};

	$(function init() {
		var dataArray = JSON.parse(localStorage.getItem("todoData"));
		// console.log(dataArray);
		$.each(dataArray, function(index, value) {
			console.log(value);
			generateElement(value);
		});

		$("#calendar").datepicker();

		$.each(codes, function(index, value) {
			$(value).droppable({
				drop: function(event, ui) {
					var element = ui.helper,
						css_id = element.attr("id"),
						id = css_id.replace("task-", ""),
						object = dataArray[id];

						//Remove old element
						removeElement(object);

						//Changing object code
						object.code = index;

						//Generating new element
						generateElement(object);

						//Updating local storage
						data[id] = object;
						localStorage.setItem("todoData", JSON.stringify(data[id]));

						//Hiding Delete Area
						$("#delete-div").hide();
				}
			});
		});

		//Adding drop function to delete div
		$("#delete-div").droppable({
			drop: function(event, ui) {
				var element = ui.helper,
					css_id = element.attr("id"),
					id = css_id.replace("task-", ""),
					object = data[id];

				//Removing old element
				removeElement(object);

				//Updating local storage
				delete data[id];
				localStorage.setItem("todoData", JSON.stringify(data[id]));

				//Hiding delete area
				$("#delete-div").hide();
			}
		});
	});	

	//Submitting the To-Do form
	$("#addItem").click(function() {
		var errorMessage = "Title cannot be empty",
			id, title, description, date, tempData;

			title = $("#title").val();
			description = $("#description").val();
			date = $("#calendar").val();

			if(!title) {
				alert(errorMessage);
				return;
			}

			id = new Date().getTime();

			tempData = {
				id: id,
				code: "1",
				title: title,
				date: date,
				description: description
			};

			// Saving element in local storage
			data[id] = tempData;
			// console.log(data);
			localStorage.setItem("todoData", JSON.stringify(data));

			// Generate Todo Element
			generateElement(tempData);

			// Reset Form
			$("#title").val("");
			$("#description").val("");
			$("#calendar").val("");
		});//End on click event	

	var generateElement = function(tempData) {
		var parent = $(codes[tempData.code]);
		var wrapper = $(".todo-task");	

		wrapper = $("<div />", {
            "class" : "todo-task",
            "id" : "task-"+tempData.id,
            "data" : tempData.id
        }).appendTo(parent);

        $("<div />", {
            "class" : "todo-header",
            "text" : tempData.title
        }).appendTo(wrapper);

        $("<div />", {
            "class" : "todo-date",
            "text" : tempData.date
        }).appendTo(wrapper);

        $("<div />", {
            "class" : "todo-description",
            "text" : tempData.description
        }).appendTo(wrapper);

        wrapper.draggable({
        	start:function() {
        		$("#delete-div").show();
        	},
        	stop: function() {
        		$("#delete-div").hide();	
        	},
        	revert: "invalid",
        	revertDuration: 200
        });
	};

	var removeElement = function(tempData) {
		$("#" + "task-"+tempData.id).remove();
	}

	$("#clear").click(function() {
		data = {};
		localStorage.setItem("todoData", JSON.stringify(data));
		$(".todo-task").remove();
	});

}(data));


