var firstMenuItems = [{
    name: 'ADM',
    triangleColor: '#0094CD',
    secondMenu: {
        color: '#0094CD',
        items: [{
            name: 'HOME'
        }, {
            name: 'ABOUT'
        }, {
            name: 'F.A.Q'
        }, {
            name: 'RESOURCES'
        }, {
            name: 'NEWS'
        }]
    }
}, {
    name: 'Practices',
    triangleColor: '#F7971B',
    secondMenu: {
        color: '#F7971B',
        items: [{
            name: 'OVERVIEW'
        }, {
            name: 'APPLICATION DEVELOPMENT'
        }, {
            name: 'APPLICATION OUTSOURCING'
        }, {
            name: 'INTEGRATION SERVICES'
        }, {
            name: 'DIGITAL'
        }, {
            name: 'ARCHITECTURE SERVICES'
        }]
    }
}, {
    name: 'Services',
    triangleColor: '#8CC63E',
    secondMenu: {
        color: '#8CC63E',
        items: [{
            name: 'OVERVIEW'
        }, {
            name: 'APPLICATION DEVELOPMENT'
        }, {
            name: 'APPLICATION OUTSOURCING'
        }, {
            name: 'DIGITAL ENABLEMENT'
        }, {
            name: 'INTEGRATION SERVICES'
        }, {
            name: 'TRAINING'
        }]
    }
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
    hideAllFirstMenuTriangle('.triangle-up-first-menu');
    $($.find('.triangle-up-first-menu')[0]).css({'display': 'block'});
}

function onFirstMenuItemClick(name) {
    // show/hide triangle
    var index = findIndex(firstMenuItems, name);
    var items = hideAllFirstMenuTriangle('.triangle-up-first-menu');
    $(items[index]).css({'display': 'block', 'border-bottom-color': firstMenuItems[index].triangleColor});

    // change second menu items
    var html = '';
    firstMenuItems[index].secondMenu.items.forEach(function(item) {
        var itemName = '\'' + item.name + '\'';
        html += '<div><div onclick="secondMenu.onSecondMenuItemClick(' + itemName + ')">' + item.name + '</div><div class="second-menu-triangle"><div class="triangle-up triangle-up-second-menu"></div></div></div>';
    });
    $('.second-menu').html('');
    $('.second-menu').append(html);
    $($.find('.triangle-up-second-menu')[0]).css({'display': 'block'});

    // change second menu background color
    $('.second-menu-wrapper').css({'background-color': firstMenuItems[index].secondMenu.color});

    // display first triangle in second menu
    hideAllFirstMenuTriangle('.triangle-up-second-menu');
    $($.find('.triangle-up-second-menu')[0]).css({'display': 'block'});
}

function hideAllFirstMenuTriangle(className) {
    $.find(className).forEach(function(item) {
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
