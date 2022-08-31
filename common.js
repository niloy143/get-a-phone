function hideShow(showNow, idName) {
    const element = document.getElementById(idName);
    if(showNow) {
        element.classList.add('d-block');
        element.classList.remove('d-none');
    }
    else {
        element.classList.add('d-none');
        element.classList.remove('d-block');
    }
}
