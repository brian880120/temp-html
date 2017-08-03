/*Importing Roboto*/
var css = '@import url(https://fonts.googleapis.com/css?family=Roboto:100,100italic,300,300italic,400,400italic,500,500italic,700,700italic,900,900italic&subset=latin,latin-ext,cyrillic,cyrillic-ext,greek-ext,greek,vietnamese);\
           @import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300italic,400,400italic,700,700italic&subset=latin,latin-ext,cyrillic-ext,cyrillic,greek-ext,greek,vietnamese);\
           @import url(https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700&subset=latin,latin-ext,greek-ext,greek,vietnamese,cyrillic,cyrillic-ext);',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}
head.appendChild(style);
/* End of Importing Roboto*/


var firstMenuItems = [{
    name: 'ADM',
    triangleColor: '#0094CD', // color has to be in css
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
    firstMenuItems: firstMenuItems,
    initialComponent: initialComponent,
    onFirstMenuItemClick: onFirstMenuItemClick
};

initialComponent();

function initialComponent() {
    var html = '';
    firstMenuItems.forEach(function(item) {
        var itemName = '\'' + item.name + '\'';
        var itemId =  'adm_' + item.name; // need to define better ID's
        html += '<div class="adm_tab" id="'+itemId+'" data-selected="0" data-hassubmenu="" onclick="header.onFirstMenuItemClick(' + itemName + ')"><div class="adm_tab_label">' + item.name + '</div><div class="base-menu-triangle"><div class="triangle-up triangle-up-first-menu"></div></div></div>';
    });
    $('.header-menu').append(html);

    /* Approptiate triangles should be displayed thought css*/
    hideAllFirstMenuTriangle('.triangle-up-first-menu');
    $($.find('.triangle-up-first-menu')[0]).css({'display': 'block'});
    //$( '#adm_ADM' ).attr( 'data-selected','--' );
}

function onFirstMenuItemClick(name) {
    // show/hide triangle
    var index = findIndex(firstMenuItems, name);
    var items = hideAllFirstMenuTriangle('.triangle-up-first-menu');
    $(items[index]).css({'display': 'block', 'border-bottom-color': firstMenuItems[index].triangleColor});

    // change second menu items
    var html = '';
    firstMenuItems[index].secondMenu.items.forEach(function(item, index) {
        var itemName = '\'' + item.name + '\'';
        var itemIndex = '\'' + index + '\'';
        html += '<div class="adm_tab"><div onclick="secondMenu.onSecondMenuItemClick(' + itemName + ', ' + index + ')">' + item.name + '</div><div class="second-menu-triangle"><div class="triangle-up triangle-up-second-menu"></div></div></div>';
    });
    $('.second-menu').html('');
    $('.second-menu').append(html);
    $($.find('.triangle-up-second-menu')[0]).css({'display': 'block'});

    // change second menu background color
    $('.second-menu-wrapper').css({'background-color': firstMenuItems[index].secondMenu.color});

    // display first triangle in second menu
    hideAllFirstMenuTriangle('.triangle-up-second-menu');
    $($.find('.triangle-up-second-menu')[0]).css({'display': 'block'});

    // hide third menu
    thirdMenu.hideContent();
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
