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

var data = JSON.parse(localStorage.getItem("todoData"));
data = data || {};
$.fn.center = function () {
        this.css("position","fixed");
        this.css("top", ($(window).height() / 2) - (this.outerHeight() / 2));
        this.css("left", ($(window).width() / 2) - (this.outerWidth() / 2));
        return this;
}


$(function(data) {
    var codes = {
        "1" : "#pending",
        "2" : "#inProgress",
        "3" : "#completed"
    };

    $(function init() {
        $.each(data, function (index, params) {
            generateElement(params);
        });

        for(var i=0; i < localStorage.length; i++){
            var propertyName = localStorage.key(i);
            console.log(  i + " : " + propertyName + " = " + localStorage.getItem(propertyName));
        }

        $.each(codes, function(index, value) {
            $(value).droppable({
                drop: function(event, ui) {
                    var element = ui.helper,
                        css_id = element.attr("id"),
                        id = css_id.replace("task-", ""),
                        object = data[id];

                        //Remove old element
                        removeElement(object);

                        //Changing object code
                        object.code = index;

                        //Generating new element
                        generateElement(object);

                        //Updating local storage
                        data[id] = object;
                        localStorage.setItem("todoData", JSON.stringify(data));

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
                    localStorage.setItem("todoData", JSON.stringify(data));

                    //Hiding delete area
                    $("#delete-div").hide();
                }
            });
        });

    var generateElement = function(params) {
        var parent = $(codes[params.code]);
        var wrapper = $(".todo-task");

        if(!parent) {
            return;
        }

        wrapper = $("<div />", {
            "class" : "todo-task",
            "id" : "task-"+params.id,
            "data" : params.id
            }).appendTo(parent);

            $("<div />", {
            "class" : "todo-header",
            "text" : params.title
            }).appendTo(wrapper);

            $("<div />", {
            "class" : "todo-date",
            "text" : params.date
            }).appendTo(wrapper);

            $("<div />", {
            "class" : "todo-description",
            "text" : params.description
            }).appendTo(wrapper);

            wrapper.draggable({
            start: function() {
                   $("#delete-div").show();
            },
            stop: function() {
                $("#delete-div").hide();
            },
            revert: "invalid",
            revertDuration: 200
            });
    };

    $(function() {
        var listElement = $(".todo-task");
        // console.log(listElement);
        var id = listElement.attr("id");
        listElement.click(function() {
            //Get the id of clicked todo list
            var clickedElement = $(this).attr("id");
            var clickedElementID = clickedElement.replace("task-", "");

            //Display overlay background
            var docHeight = $(document).height();
           $("body").append("<div id='overlay'></div>");
           $("#overlay").height(docHeight).css({
                 'opacity' : 0.4,
                 'position': 'absolute',
                 'top': 0,
                 'left': 0,
                 'background-color': 'black',
                 'width': '100%',
                 'z-index': 5000
              });

           $("#overlay").click(function() {
                $(this).remove();
           });

           //Create div on top of overlay
           $("#overlay").append("<div class='todo-edit'></div>");
           $(".todo-edit").center();
           $(".todo-edit").css({
                'width': '400px',
                'background-color': '#f0f0f0'
           });

           $(window).resize(function(){
                $('.todo-edit').center();
            });

           $("<span />", {
            "class" : "card-label green"
            }).appendTo($(".todo-edit"));

           $("<span />", {
            "class" : "card-label orange"
            }).appendTo($(".todo-edit"));

           $(".card-label").click(function() {
                var selectedLabel = $(this).attr("class");
                var selectedColor = selectedLabel.replace("card-label", "");
                console.log(selectedLabel);
                //Append color label to the div
                $("#"+ clickedElement).append("<span class='list-color-labels"+ selectedColor+"'></span>");
                $(".list-color-labels").css({
                    'border-radius': 0,
                    'float': 'left',
                    'height': '10px',
                    'margin-bottom': '1px',
                    'padding': 0,
                    'width': '20px',
                    'line-height': '100px'
                });

                // console.log(data);
                // console.log(clickedElementID);
                // if(data["id"]==clickedElementID) {
                //     data["color"] =selectedLabel;
                //     console.log(data["color"]);
                //     // console.log(data);
                // } 
                // console.log(data);
                // var colorArray = {};
                // colorArray.push(["color"= color);
                // console.log(colorArray);
                // console.log(localStorage["todoData"]["id"]);
                // console.log(localStorage["todoData"]["color"]);

                // todoData.localArray.push(arrayObj)
                // localStorage.localObj = JSON.stringify(localObj);
                // localObj = JSON.parse(localStorage.localObj);


                // todoData.setItem("color", JSON.stringify(color));
              
                
                // // Saving element in local storage
                // data[id] = tempData;
                // // console.log(data);
                // localStorage.setItem("todoData", JSON.stringify(data[id]));

                // // Generate Todo Element
                // generateElement(tempData);
               });
      });
});//End of function that append card label
    
    var removeElement = function(tempData) {
        $("#" + "task-"+tempData.id).remove();
    };

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
                description: description,
                color: ""
            };

            // Saving element in local storage
            data[id] = tempData;
            // console.log(data);
            localStorage.setItem("todoData", JSON.stringify(data[id]));

            // Generate Todo Element
            generateElement(tempData);

            // Reset Form
            $("#title").val("");
            $("#description").val("");
            $("#calendar").val("");
        });//End on click event

    $("#clear").click(function() {
        data = {};
        localStorage.setItem("todoData", JSON.stringify(data));
        $(".todo-task").remove();
    });
}(data)); //Immediately invoke function passing data variable as a parameter






