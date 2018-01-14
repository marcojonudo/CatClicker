var catsNames = ["Musufu", "Mr. Cat", "Musufu 2", "Mr. Cat 2"];

var catCounters = [];

$(document).ready(function () {
    setCatsLayout();
    setCatsNames();
    setCatsListeners();
});

function setCatsLayout() {
    var aside = $('aside');
    var p, catName;

    for (var i=0; i<catsNames.length; i++) {
        p = $('<p class="cat'+i+'"></p>').text(catsNames[i]);
        aside.append(p);

        aside.on('click', 'p.cat'+i, (function(index) {
            return function() {
                setCat(index);
            }
        })(i));

        catCounters.push(0);
    }
}

function setCat(index) {
    setCatsNames(index);
    $('#catImg').attr('src', 'img/cat'+(parseInt(index)+1)+'.jpg');
    $('#catImgCounter').html(catCounters[index]);
}

function setCatsNames(index) {
    var index = index == undefined ? 0 : index;
    var catName = catsNames[index];
    var domCatNames = $('.catName')
    for (var i=0; i<domCatNames.length; i++) {
        domCatNames.eq(i).html(catName);
    }
}

function setCatsListeners() {
    var catImg = $('#catImg');
    catImg.click(function() {
        var imageName = catImg.attr('src').split('.')[0];
        var index = parseInt(imageName.charAt(imageName.length-1))-1;

        catCounters[index]++;

        var counter = $('#catImgCounter');
        counter.html(catCounters[index]);
    });
}
