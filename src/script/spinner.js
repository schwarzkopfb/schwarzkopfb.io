window.onload = function () {
    const el = document.querySelector('#spinner')
    el.classList.add('fade-out')

    setTimeout(function() {
        el.parentNode.removeChild(el)
    }, 500)
}
