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
        html += '<div class="adm_tab__second" data-selected="0" data-hassubmenu="0" data-menudisplayed="0" onclick="secondMenu.onSecondMenuItemClick(' + itemName + ', ' + index + ')"><div class="adm_label">' + item.name + '</div><div class="second-menu-triangle"><div class="triangle-up triangle-up-second-menu"></div></div></div>';
    });
    $('.second-menu').append(html);

    deselectSecondMenuTabs();
    $($.find('.adm_tab__second')[0]).attr( 'data-selected','1' );
}

function onSecondMenuItemClick(name, index) {
    var items = hideAllSecondMenuTriangle();

    $(items[index]).css({'display': 'block',});



    // show or not show third menu
    if (name === 'Application development') {
        thirdMenu.showContent();
        $(items[index]).css({'display': 'block'});
    } else {
        thirdMenu.hideContent();
    }


}



function deselectSecondMenuTabs(){
    $.find('.adm_tab__second').forEach(function(item) {
        $(item).attr( 'data-selected','0' );
    });
    return null;
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
