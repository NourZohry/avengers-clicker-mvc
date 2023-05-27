let model = {
    selectedAvenger: 0,
    userAdmin: false,
    items: [
        {
            id: 0,
            clicks: 0,
            name: "Iron Man",
            img: "assets/images/ironman.jpg"
        },
        {
            id: 1,
            clicks: 0,
            name: "Hulk",
            img: "assets/images/hulk.jpg"
        },
        {
            id: 2,
            clicks: 0,
            name: "Thor",
            img: "assets/images/thor.jpg"
        }
    ]
}

let view = {
    init: function() {
        $("#input-name").val(model.items[model.selectedAvenger].name);
        $("#input-clicks").val(model.items[model.selectedAvenger].clicks);
        $("#input-img").val(model.items[model.selectedAvenger].img);

        $("#admin-button").click(function () { 
            controller.setUserAdmin(true);
        });
        $("#cancel-button").click(function () { 
            controller.setUserAdmin(false);
        });
        
        $("#admin-form").submit(function (e) { 
            e.preventDefault();
            controller.changeModelAvenger(e);
            controller.setUserAdmin(false);
        });
        
    },
    clearList: function() {
        $("#thumbnails").empty();
        $("#main-img-wrapper").empty();
    },
    render: function() {
        this.clearList();
        
        // if (model.items.length != 0)

        $("#input-clicks").val(model.items[model.selectedAvenger].clicks);

        let clickedImg = $('<img class="main-img" src="'+model.items[model.selectedAvenger].img+'" alt="' + model.items[model.selectedAvenger].alt + '">')
        $(clickedImg).click(function () { 
            controller.addClick(model.items[model.selectedAvenger].id);
        });
        $("#main-img-wrapper").append(clickedImg);
        $("#avenger-name").text(model.items[model.selectedAvenger].name);
        $("#click-count").text(model.items[model.selectedAvenger].clicks);

        if (model.userAdmin == false) {
            $('#admin-panel').addClass('d-none');
        }
        else {
            $('#admin-panel').removeClass('d-none');
        }

        for (let i = 0; i < model.items.length; i++) {
            let img = $('<img src="' + model.items[i].img + '" alt="' + model.items[i].alt + '">')
            img.click(function () { 
                controller.changeSelectedAvenger(model.items[i].id);
                $("#input-name").val(model.items[i].name);
                $("#input-clicks").val(model.items[i].clicks);
                $("#input-img").val(model.items[i].img);
            });
            $("#thumbnails").append(img);
        }   
    }
}

let controller = {
    init: function() {
        view.init();
        view.render();
    },
    addClick: function (id) {
        model.items[id].clicks += 1;
        view.render();
    },
    changeSelectedAvenger: function (id) {
        model.selectedAvenger = id;
        view.render();
    },
    enableUserAdmin: function () {
        model.userAdmin = true;
        view.render();
    },
    setUserAdmin: function (bool) {
        model.userAdmin = bool;
        view.render();
    },
    changeModelAvenger: function(e) {
        let name = e.target[0].value;
        let clicks = parseInt(e.target[1].value);
        let img = e.target[2].value;
        model.items[model.selectedAvenger].name = name;
        model.items[model.selectedAvenger].clicks = clicks;
        model.items[model.selectedAvenger].img = img;
        view.render();
    }
}


$(document).ready(function () {
    controller.init();
});