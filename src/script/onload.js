export default function onload(fn) {
    const prev = window.onload

    if (typeof prev !== 'function')
        prev = noop

    window.onload = () => {
        prev()
        fn()
    }
}

function noop() {}