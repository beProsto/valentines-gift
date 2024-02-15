window.onmousemove = (e) => {
    input.x = e.clientX;
    input.y = e.clientY;
    input.dx = e.movementX;
    input.dy = e.movementY;
};

window.onwheel = (e) => {
    input.dzoom = e.deltaY;
    input.zoom += e.deltaY;
};

window.onmousedown = (e) => {
    input.pressed = true;
}
window.onmouseup = (e) => {
    input.pressed = false;
}

window.oncontextmenu = (e) => {
    e.preventDefault();
}