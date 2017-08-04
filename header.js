
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
    //$($.find('.triangle-up-first-menu')[0]).css({'visibility': 'visible'});
    $($.find('.adm_tab')[0]).attr( 'data-selected','1' );

}

function onFirstMenuItemClick(name) {
    // show/hide triangle
    var index = findIndex(firstMenuItems, name);
    var items = hideAllFirstMenuTriangle('.triangle-up-first-menu');

    $(document.body).attr("data-theme",firstMenuItems[index].themeCSS);
    $(items[index]).css({'visibility': 'visible'});


    // change second menu items
    var html = '';
    firstMenuItems[index].secondMenu.items.forEach(function(item, index) {
        var itemName = '\'' + item.name + '\'';
        var itemIndex = '\'' + index + '\'';
        html += '<div class="adm_tab"><div class="adm_tab_label" onclick="secondMenu.onSecondMenuItemClick(' + itemName + ', ' + index + ')">' + item.name + '</div><div class="second-menu-triangle"><div class="triangle-up triangle-up-second-menu"></div></div></div>';
    });
    $('.second-menu').html('');
    $('.second-menu').append(html);
    $($.find('.triangle-up-second-menu')[0]).css({'visibility': 'visible'});


    // display first triangle in second menu
    //hideAllFirstMenuTriangle('.triangle-up-second-menu');
    $($.find('.triangle-up-second-menu')[0]).css({'visibility': 'visible'});

    // hide third menu
    thirdMenu.hideContent();
}

function hideAllFirstMenuTriangle(className) {
    $.find(className).forEach(function(item) {
        $(item).css({'visibility': 'hidden'});
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
