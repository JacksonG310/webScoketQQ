export const debounce = function(fn, time) {
    let timer = null;
    time = time || 200;
    return function() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this);
        }, time);
    }
}