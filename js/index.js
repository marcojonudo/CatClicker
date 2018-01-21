$(function() {
    let catCategories = {
        '0': 'category1',
        '1': 'category2',
        '2': 'category3',
    }
    
    var viewModel = function() {
        this.catName = ko.observable('Musufu');
        this.imgSrc = ko.observable('img/cat1.jpg');
        this.clickCounter = ko.observable(0);
        this.catCategory = ko.observable('category1');
        
        this.incrementCounter = function() {
            this.clickCounter(this.clickCounter() + 1);
            let category = catCategories[Math.floor(this.clickCounter()/10)];
            this.catCategory(category);
        }

    }
    
    ko.applyBindings(viewModel);
})

