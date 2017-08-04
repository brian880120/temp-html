
var css = '@import url(https://fonts.googleapis.com/css?family=Roboto:100,100italic,300,300italic,400,400italic,500,500italic,700,700italic,900,900italic&subset=latin,latin-ext,cyrillic,cyrillic-ext,greek-ext,greek,vietnamese);';
    head = document.head || document.getElementsByTagName('head')[0];
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}
head.appendChild(style);
//End of Importing Roboto

// Load initial color theme
$(document.body).attr("data-theme","theme_0094CD");



var firstMenuItems = [{
    name: 'ADM',
    themeCSS: 'theme_0094CD',
    secondMenu: {
        color: '#0094CD',
        items: [{
            name: 'Home'
        }, {
            name: 'About'
        }, {
            name: 'F.A.Q'
        }, {
            name: 'Resources'
        }, {
            name: 'News'
        }]
    }
}, {
    name: 'Practices',
    themeCSS: 'theme_F7971B',
    secondMenu: {
        color: '#F7971B',
        items: [{
            name: 'Overview'
        }, {
            name: 'Application development'
        }, {
            name: 'Application oursourcing'
        }, {
            name: 'Integration services'
        }, {
            name: 'Digital'
        }, {
            name: 'Architecture services'
        }]
    }
}, {
    name: 'Services',
    themeCSS: 'theme_8CC63E',
    secondMenu: {
        color: '#8CC63E',
        items: [{
            name: 'Overview'
        }, {
            name: 'Application development'
        }, {
            name: 'Application oursourcing'
        }, {
            name: 'Digital enablement'
        }, {
            name: 'Integration services'
        }, {
            name: 'Traning'
        }]
    }
}, {
    name: 'Grow',
    themeCSS: 'theme_0094CD'
}, {
    name: 'Enable',
    themeCSS: 'theme_F7971B'
}, {
    name: 'Run',
    themeCSS: 'theme_8CC63E'
}];

var header = {
    firstMenuItems: firstMenuItems,
    initialComponent: initialComponent,
    onFirstMenuItemClick: onFirstMenuItemClick
};

initialComponent();
selectMainMenuTab(0);

function initialComponent() {
    var html = '';
    firstMenuItems.forEach(function(item) {
        var itemName = '\'' + item.name + '\'';
        var itemId =  'adm_' + item.name; // need to define better ID's
        html += '<div class="adm_tab" id="'+itemId+'" data-selected="0" data-hassubmenu="1" onclick="header.onFirstMenuItemClick(' + itemName + ')"><div class="adm_label">' + item.name + '</div><div class="base-menu-triangle"><div class="triangle-up triangle-up-first-menu"></div></div></div>';
    });
    $('.header-menu').append(html);
}


function selectMainMenuTab(tabIndex){
    $($.find('.adm_tab')[tabIndex]).attr( 'data-selected','1' );
    // here should be call to ddisplay first subnavigation
    return null;
}

function deselectMainMenuTabs(){
    $.find('.adm_tab').forEach(function(item) {
        $(item).attr( 'data-selected','0' );
    });
    return null;
}





function onFirstMenuItemClick(name) {

    var index = findIndex(firstMenuItems, name);
    deselectMainMenuTabs();
    selectMainMenuTab(index);

    var items = $.find('.triangle-up-first-menu');

    $(document.body).attr("data-theme",firstMenuItems[index].themeCSS);


    // change second menu items
    var html = '';
    firstMenuItems[index].secondMenu.items.forEach(function(item, index) {
        var itemName = '\'' + item.name + '\'';
        var itemIndex = '\'' + index + '\'';
        html += '<div class="adm_tab__second" data-selected="0" data-hassubmenu="0" data-menudisplayed="0" onclick="secondMenu.onSecondMenuItemClick(' + itemName + ', ' + index + ')"><div class="adm_label" >' + item.name + '</div><div class="second-menu-triangle"><div class="triangle-up triangle-up-second-menu"></div></div></div>';
    });
    $('.second-menu').html('');
    $('.second-menu').append(html);


    // display first triangle in second menu
    deselectSecondMenuTabs();
    $($.find('.adm_tab__second')[0]).attr( 'data-selected','1' );
    //hideAllFirstMenuTriangle('.triangle-up-second-menu');
    //$($.find('.triangle-up-second-menu')[0]).css({'visibility': 'visible'});

    // hide third menu
    thirdMenu.hideContent();
}


/*
function hideAllFirstMenuTriangle(className) {
    $.find(className).forEach(function(item) {
        $(item).css({'visibility': 'hidden'});
    });
    return $.find('.triangle-up-first-menu');
}
*/

function findIndex(items, target) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].name === target) {
            return i;
        }
    }
    return null;
}
