var secondMenu = {
    initialComponent: initialComponent,
    onSecondMenuItemClick: onSecondMenuItemClick
};

var initSecondMenuItems = [{
    name: 'Home'
}, {
    name: 'About ADM'
}, {
    name: 'F.A.Q'
}, {
    name: 'Resources'
}, {
    name: 'ADM news'
}];

initialComponent();

function initialComponent() {
    var html = '';
    initSecondMenuItems.forEach(function(item, index) {
        var itemName = '\'' + item.name + '\'';
        var itemIndex = '\'' + index + '\'';
        html += '<div class="adm_tab" onclick="secondMenu.onSecondMenuItemClick(' + itemName + ', ' + index + ')"><div class="adm_tab_label">' + item.name + '</div><div class="second-menu-triangle"><div class="triangle-up triangle-up-second-menu"></div></div></div>';
    });
    $('.second-menu').append(html);
    hideAllSecondMenuTriangle();
    $($.find('.triangle-up-second-menu')[0]).css({'visibility': 'visible'});
}

function onSecondMenuItemClick(name, index) {
    var items = hideAllSecondMenuTriangle();
    $(items[index]).css({'visility': 'visible'});

    // show or not show third menu
    if (name === 'APPLICATION DEVELOPMENT') {
        thirdMenu.showContent();
        $(items[index]).css({'visility': 'visible'});
    } else {
        thirdMenu.hideContent();
    }
}

function hideAllSecondMenuTriangle() {
    $.find('.triangle-up-second-menu').forEach(function(item) {
        $(item).css({'visibility': 'hidden'});
    });
    return $.find('.triangle-up-second-menu');
}

function findIndex(items, target) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].name === target) {
            return i;
        }
    }
    return null;
}
