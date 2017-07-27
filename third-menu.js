var thirdMenu = {
    initialComponent: initialComponent,
    hideContent: hideContent,
    showContent: showContent
};

initialComponent();

function initialComponent() {
    hideContent();
}

function hideContent() {
    $('.flex-container').css({'display': 'none'});
}

function showContent() {
    $('.flex-container').css({'display': 'flex'});
}
