$(function() {

    var model = {
        cats: [
            { name: "Musufu", src: "img/cat1.jpg", clickCounter: 0 },
            { name: "Mr. Cat", src: "img/cat2.jpg", clickCounter: 0 },
            { name: "Musufu 2", src: "img/cat1.jpg", clickCounter: 0 },
            { name: "Mr. Cat 2", src: "img/cat2.jpg", clickCounter: 0 },
        ],
        displayedCat: null,
        getCats: function() {
            return model.cats;
        },
        getCat: function(index) {
            return model.cats[index];
        },
        modifyCat: function(name, newCat) {
            var oldCat;
            for (var i=0; i<model.cats.length; i++) {
                if (model.cats[i] == name)
                    oldCat = model.cats[i];
            }

            oldCat.name = newCat.name;
            oldCat.src = newCat.src;
            oldCat.clickCounter = newCat.clickCounter;
        }
    };

    var octopus = {
        init: function() {
            model.displayedCat = model.getCat(0);
            view.init();

            view.catsList.init(model.getCats());
            octopus.setCatsListListeners();
            // octopus.setAdminListeners();
            view.mainCat.setCatNames(model.getCat(0).name);
            octopus.setMainCatListener();
        },
        setCatsListListeners: function() {
            var catsList = model.getCats();

            for (var i=0; i<catsList.length; i++) {
                view.elements.aside.on('click', 'p.cat'+i, (function(cat) {
                    return function() {
                        model.displayedCat = cat;
                        view.mainCat.setCat(cat);
                    }
                })(catsList[i]));
            }
        },
        setMainCatListener: function() {
            view.elements.catImg.click(function() {
                model.displayedCat.clickCounter++;
                view.mainCat.updateCounter(model.displayedCat.clickCounter);
            });
        },
        setAdminListeners: function() {
            $('#cancelButton').click(function() {
                $('#adminInputs').addClass('hidden');
                var adminInputs = $('#adminInputs input');
                for (var i=0; i<adminInputs; i++) {
                    adminInputs[i].val('');
                }
            });
            $('#okButton').click(function() {
                $('#adminInputs').addClass('hidden');
                for (var i=0; i<adminInputs; i++) {
                    adminInputs[i].val('');
                }
                model.modfyCat();
            });
        }
    };

    var view = {
        elements: {
            aside: null,
            catImg: null,
            catImgCounter: null,
            catList: null,
            domCatNames: null,
        },
        init: function() {
            view.elements.aside = $('aside');
            view.elements.catImg = $('#catImg');
            view.elements.catImgCounter = $('#catImgCounter');
            view.elements.domCatNames = $('.catName');
        },
        catsList: {
            init: function(cats) {
                for (var i=0; i<cats.length; i++) {
                    var p = $('<p class="cat'+i+'"></p>').text(cats[i].name);
                    view.elements.aside.append(p);
                }
            }
        },
        mainCat: {
            setCat: function(cat) {
                view.mainCat.setCatNames(cat.name);
                view.elements.catImg.attr('src', cat.src);
                view.elements.catImgCounter.html(cat.clickCounter);
            },
            setCatNames: function(catName) {
                for (var i=0; i<view.elements.domCatNames.length; i++) {
                    view.elements.domCatNames.eq(i).html(catName);
                }
            },
            updateCounter: function(clickCounter) {
                view.elements.catImgCounter.html(clickCounter);
            }
        }
    };

    octopus.init();

});
