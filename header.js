var firstMenuItems = [{
    name: 'ADM',
    triangleColor: '#0094CD'
}, {
    name: 'Practices',
    triangleColor: '#F7971B'
}, {
    name: 'Services',
    triangleColor: '#8CC63E'
}, {
    name: 'Grow'
}, {
    name: 'Enable'
}, {
    name: 'Run'
}];

var header = {
    initialComponent: initialComponent,
    onFirstMenuItemClick: onFirstMenuItemClick
};

initialComponent();

function initialComponent() {
    var html = '';
    firstMenuItems.forEach(function(item) {
        var itemName = '\'' + item.name + '\'';
        html += '<div><div onclick="header.onFirstMenuItemClick(' + itemName + ')">' + item.name + '</div><div class="base-menu-triangle"><div class="triangle-up triangle-up-first-menu"></div></div></div>';
    });
    $('.header-menu').append(html);
    hideAllFirstMenuTriangle();
    $($.find('.triangle-up-first-menu')[0]).css({'display': 'block'});
}

function onFirstMenuItemClick(name) {
    var index = findIndex(firstMenuItems, name);
    var items = hideAllFirstMenuTriangle();
    $(items[index]).css({'display': 'block', 'border-bottom-color': firstMenuItems[index].triangleColor});
}

function hideAllFirstMenuTriangle() {
    $.find('.triangle-up-first-menu').forEach(function(item) {
        $(item).css({'display': 'none'});
    });
    return $.find('.triangle-up-first-menu');
}

function findIndex(items, target) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].name === target) {
            return i;
        }
    }
    return null;
}
