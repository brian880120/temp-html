
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

var selectedFirstMenuItem = null;
var selectedSecondMenuItem = null;
var selectedThirdMenuItem = null;
var selectedForthMenuItem = null;

initialComponent();

function initialComponent() {
    var html = '';
    menuItem.data.forEach(function(item) {
        var itemName = '\'' + item.name + '\'';
        var itemId =  'adm_' + item.name; // need to define better ID's
        html += '<div class="adm_tab" id="'+ itemId + '" data-selected="0"' +
                    'data-hassubmenu="1"' +
                    'onclick="onFirstMenuItemClick(' + itemName + ')">' +
                    '<div class="adm_label">' + item.name + '</div>' +
                    '<div class="base-menu-triangle">' +
                        '<div class="triangle-up triangle-up-first-menu"></div>' +
                    '</div>' +
                '</div>';
    });
    $('.header-menu').append(html);
    selectMenuTab(0, '.adm_tab');
    selectedFirstMenuItem = menuItem.data[0];
    constructSecondMenu(0);
    selectMenuTab(0, '.adm_tab__second');
    constructBreadcrumb(['ADM', 'Home']);
    constructThirdMenu();
}

function onFirstMenuItemClick(name) {
    var index = findIndex(menuItem.data, name);
    deselectMenuTabs('.adm_tab');
    selectMenuTab(index, '.adm_tab');
    selectedFirstMenuItem = menuItem.data[index];
    constructSecondMenu(index);
    constructBreadcrumb([selectedFirstMenuItem.name, selectedFirstMenuItem.secondMenu.items[0].name]);
    $(document.body).attr("data-theme",menuItem.data[index].themeCSS);

    $($.find('.adm_tab__second')[0]).attr( 'data-selected','1' );
    $($.find(".flex-container")[0]).attr( 'data-show','0' );
}

function onSecondMenuItemClick(name, index) {
    var submenuStatus = $($.find('.adm_tab__second')[index]).attr('data-hassubmenu');
    if (submenuStatus !== '1') {
        deselectMenuTabs('.adm_tab__second');
    }
    selectMenuTab(index, '.adm_tab__second');
    selectedSecondMenuItem = selectedFirstMenuItem.secondMenu.items[index];
    constructBreadcrumb([selectedFirstMenuItem.name, selectedFirstMenuItem.secondMenu.items[index].name]);

    if (submenuStatus === '1') {
        if ($($.find(".adm_tab__second")[index]).attr('data-menudisplayed') === '1') {
            $($.find(".flex-container")[0]).attr( 'data-show','0' );
            $($.find(".adm_tab__second")[index]).attr('data-menudisplayed', '0');
            var previewSelectedIndex = findPreviousSelectedSecondMenuItem() | 0;
            deselectMenuTabs('.adm_tab__second');
            selectMenuTab(previewSelectedIndex, '.adm_tab__second');
        } else {
            $($.find(".flex-container")[0]).attr( 'data-show','1' );
            $($.find(".adm_tab__second")[index]).attr('data-menudisplayed', '1');
        }
    }
}

function onThirdMenuItemClick(name, index) {
    $($.find(".flex-container")[0]).attr( 'data-show','0' );
    deselectMenuTabs('.adm_tab__second');
    selectedThirdMenuItem = name;
    selectMenuTab(findSelectedSecondMenuItem(), '.adm_tab__second');
    $($.find(".adm_tab__second")[findSelectedSecondMenuItem()]).attr('data-menudisplayed', '0');
    constructBreadcrumb([selectedFirstMenuItem.name, selectedSecondMenuItem.name, name]);
}

function onForthMenuItemClick(name, index) {
    $($.find(".flex-container")[0]).attr( 'data-show','0' );
    deselectMenuTabs('.adm_tab__second');
    selectMenuTab(findSelectedSecondMenuItem(), '.adm_tab__second');
    $($.find(".adm_tab__second")[findSelectedSecondMenuItem()]).attr('data-menudisplayed', '0');
    if (!selectedThirdMenuItem) {
        selectedThirdMenuItem = 'Some Title Level 3';
    }
    constructBreadcrumb([selectedFirstMenuItem.name, selectedSecondMenuItem.name, selectedThirdMenuItem, name]);
}

function constructSecondMenu(tabIndex) {
    var html = '';
    menuItem.data[tabIndex].secondMenu.items.forEach(function(item, index) {
        var itemName = '\'' + item.name + '\'';
        var itemIndex = '\'' + index + '\'';
        var hasSubmenu = '"0"';
        if (item.hasSubmenu) {
            hasSubmenu = '"1"';
        }
        html += '<div class="adm_tab__second"' +
                    'data-selected="0"' +
                    'data-hassubmenu=' + hasSubmenu +
                    'data-menudisplayed="0"' +
                    'onclick="onSecondMenuItemClick(' + itemName + ', ' + index + ')">' +
                    '<div class="adm_label" >' + item.name + '</div>' +
                    '<div class="second-menu-triangle">' +
                        '<div class="triangle-up triangle-up-second-menu"></div>' +
                    '</div>' +
                '</div>';
    });

    // TODO: Switching one Subnavigation to anotrher
    $('.second-menu').html('');
    $('.second-menu').append(html);
}

function constructThirdMenu() {
    var html = '<div class="flex-container" data-show="0">';
    tempThirdMenuItems.data.forEach(function(item, index) {
        var itemName = '\'' + item.thirdLevelTitle + '\'';
        html += '<div class="flex-item">' +
                    '<div class="flex-item-title"' +
                            'onclick="onThirdMenuItemClick(' + itemName + ', ' + index + ')">' +
                        item.thirdLevelTitle +
                    '</div>';
        item.forthLevelItems.forEach(function(item) {
            var itemName = '\'' + item.name + '\'';
            html += '<div class="item-menu-l4" onclick="onForthMenuItemClick(' + itemName + ', ' + index + ')">' +
                        item.name +
                    '</div>';
        });
        html += '</div>';
    });
    html += '</div>'
    $("#third-menu").append(html);
}

function constructBreadcrumb(items) {
    var html = '<div class="bread-crumb">';
    $('#breadcrumb').html(html);
    items.forEach(function(item, index) {
        html += '<span class="breadcrumb-item">' + item + '</span>'
        if (index !== items.length - 1) {
            html += '<span class="breadcrumb-spliter">//</span>';
        }
    });
    html += '</div>'
    $('#breadcrumb').append(html);
}

function selectMenuTab(tabIndex, className){
    $($.find(className)[tabIndex]).attr( 'data-selected','1' );
}

function deselectMenuTabs(className) {
    $.find(className).forEach(function(item) {
        $(item).attr( 'data-selected','0' );
    });
}

function findSelectedSecondMenuItem() {
    var selectedSecondMenuItemIndex = null;
    $.find('.adm_tab__second').forEach(function(item, index) {
        if ($(item).attr('data-menudisplayed') === '1') {
            selectedSecondMenuItemIndex = index;
        }
    });
    return selectedSecondMenuItemIndex;
}

function findPreviousSelectedSecondMenuItem() {
    var selectedIndex = null;
    $.find('.adm_tab__second').forEach(function(item, index) {
        if ($(item).attr('data-hassubmenu') === '0' && $(item).attr('data-selected') === '1') {
            selectedIndex = index;
        }
    });
    return selectedIndex;
}

function findIndex(items, target) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].name === target) {
            return i;
        }
    }
    return null;
}
