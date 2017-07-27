var secondMenu = {
    initialComponent: initialComponent,
    onSecondMenuItemClick: onSecondMenuItemClick
};

var initSecondMenuItems = [{
    name: 'HOME'
}, {
    name: 'ABOUT'
}, {
    name: 'F.A.Q'
}, {
    name: 'RESOURCES'
}, {
    name: 'NEWS'
}];

initialComponent();

function initialComponent() {
    var html = '';
    initSecondMenuItems.forEach(function(item, index) {
        var itemName = '\'' + item.name + '\'';
        var itemIndex = '\'' + index + '\'';
        html += '<div><div onclick="secondMenu.onSecondMenuItemClick(' + itemName + ', ' + index + ')">' + item.name + '</div><div class="second-menu-triangle"><div class="triangle-up triangle-up-second-menu"></div></div></div>';
    });
    $('.second-menu').append(html);
    hideAllSecondMenuTriangle();
    $($.find('.triangle-up-second-menu')[0]).css({'display': 'block'});
}

function onSecondMenuItemClick(name, index) {
    var items = hideAllSecondMenuTriangle();
    $(items[index]).css({'display': 'block'});
}

function hideAllSecondMenuTriangle() {
    $.find('.triangle-up-second-menu').forEach(function(item) {
        $(item).css({'display': 'none'});
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
