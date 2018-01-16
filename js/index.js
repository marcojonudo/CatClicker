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

            oldCat = newCat;
        }
    };

    var octopus = {
        init: function() {
            model.displayedCat = model.getCat(0);
            view.init();

            view.catsList.init(model.getCats());
            octopus.setCatsListListeners();

            view.mainCat.setCatNames(model.getCat(0).name);
            octopus.setMainCatListener();

            view.admin.setListeners();
        },
        setCatsListListeners: function() {
            var catsList = model.getCats();

            for (var i=0; i<catsList.length; i++) {
                view.elements.catsListElements.eq(i).on('click', (function(cat) {
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
        modifyCat: function(adminInputsContainer) {
            var name, value;
            for (var i=0; i<adminInputsContainer.length; i++) {
                name = adminInputsContainer.eq(i).attr('name');
                value = adminInputsContainer.eq(i).val();
                model.displayedCat[name] = value;
            }
            view.mainCat.setCatNames(model.displayedCat.name);
            view.catsList.setCatsNames(model.getCats());
        }
    };

    var view = {
        elements: {
            aside: null,
            catImg: null,
            catImgCounter: null,
            domCatNames: null,
            adminButton: null,
            adminInputsContainer: null,
            cancelButton: null,
            acceptButton: null,
            catsListElements: null
        },
        init: function() {
            view.elements.aside = $('aside');
            view.elements.catImg = $('#catImg');
            view.elements.catImgCounter = $('#catImgCounter');
            view.elements.domCatNames = $('.catName');
            view.elements.adminButton = $('#adminButton');
            view.elements.adminInputsContainer = $('#adminInputsContainer');
            view.elements.adminInputs = view.elements.adminInputsContainer.find('input');
            view.elements.cancelButton = $('#cancelButton');
            view.elements.acceptButton = $('#acceptButton');
        },
        catsList: {
            init: function(cats) {
                for (var i=0; i<cats.length; i++) {
                    // var p = $('<p class="cat'+i+'"></p>').text(cats[i].name);
                    var p = $('<p></p>');
                    view.elements.aside.append(p);
                }
                view.elements.catsListElements = view.elements.aside.children('p');

                view.catsList.setCatsNames(cats);
            },
            setCatsNames: function(cats) {
                for (var i=0; i<cats.length; i++) {
                    view.elements.catsListElements.eq(i).text(cats[i].name);
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
        },
        admin: {
            setListeners: function() {
                view.elements.cancelButton.click(function() {
                    view.elements.adminInputsContainer.toggleClass('hidden');
                    view.admin.clearInputs();
                });
                view.elements.acceptButton.click(function() {
                    view.elements.adminInputsContainer.toggleClass('hidden');
                    // var adminInputsContainer = $('#adminInputsContainer input');
                    octopus.modifyCat(view.elements.adminInputs);
                    view.admin.clearInputs();
                });
                view.elements.adminButton.click(function() {
                    view.elements.adminInputsContainer.toggleClass('hidden');
                });
            },
            clearInputs: function() {
                for (var i=0; i<view.elements.adminInputs.length; i++) {
                    view.elements.adminInputs.eq(i).val('');
                }
            }
        }
    };

    octopus.init();

});
