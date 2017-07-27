var thirdMenu = {
    initialComponent: initialComponent
};

initialComponent();

function initialComponent() {
    hideContent();
}

function hideContent() {
    $('.flex-container').css({'display': 'none'});
}
