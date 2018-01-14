$(function() {

    var model = {
        init: function() {
            model.cats = [
                { name: "Musufu", clickCounter: 0 },
                { name: "Mr. Cat", clickCounter: 0 },
                { name: "Musufu 2", clickCounter: 0 },
                { name: "Mr. Cat 2", clickCounter: 0 },
            ];
        },
        getCats: function() {
            return model.cats;
        },
        getCat: function(index) {
            return model.cats[index];
        }
    };

    var octopus = {
        catsList: {
            init: function() {
                model.init();
                view.catsList.init(model.getCats());
                octopus.catsList.setCatsListListeners();
                view.mainCat.setCatNames(model.getCat(0).name);
            },
            setCatsListListeners: function() {
                var catsList = model.getCats();

                for (var i=0; i<catsList.length; i++) {
                    view.catsList.setCatListener(i, catsList[i])
                }
            }
        },
        mainCat: {
            init: function() {
                octopus.mainCat.setMainCatListener();
            },
            setMainCatListener: function() {
                var catImg = $('#catImg');
                catImg.click(function() {
                    var imageName = catImg.attr('src').split('.')[0];
                    var index = parseInt(imageName.charAt(imageName.length-1))-1;

                    model.getCat(index).clickCounter++;

                    var counter = $('#catImgCounter');
                    counter.html(model.getCat(index).clickCounter);
                });
            }
        }
    };

    var view = {
        catsList: {
            init: function(cats) {
                var aside = $('aside');
                var p, catName;

                for (var i=0; i<cats.length; i++) {
                    p = $('<p class="cat'+i+'"></p>').text(cats[i].name);
                    aside.append(p);
                }
            },
            setCatListener: function(index, cat) {
                var aside = $('aside');
                aside.on('click', 'p.cat'+index, (function() {
                    return function() {
                        view.mainCat.setCat(index, cat)
                    }
                })(index, cat));
            }
        },
        mainCat: {
            setCat: function(index, cat) {
                view.mainCat.setCatNames(cat.name);
                $('#catImg').attr('src', 'img/cat'+(parseInt(index)+1)+'.jpg');
                $('#catImgCounter').html(cat.clickCounter);
            },
            setCatNames: function(catName) {
                var domCatNames = $('.catName');
                for (var i=0; i<domCatNames.length; i++) {
                    domCatNames.eq(i).html(catName);
                }
            }
        }
    };

    octopus.catsList.init();
    octopus.mainCat.init();

});
