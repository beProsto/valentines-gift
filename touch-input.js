const calcDistance = (x1, y1, x2, y2) => {
    const triW = x1 - x2;
    const triH = y1 - y2;
    return Math.sqrt(triW*triW + triH*triH);
};

window.ontouchstart = (e) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    input.zooming = false;
    if(input.pressed) {
        input.zooming = true;
        input.zoomdistance = calcDistance(touch.clientX, touch.clientY, input.x, input.y);
    }
    else {
        input.x = touch.clientX; 
        input.y = touch.clientY; 
        input.dx = 0;
        input.dy = 0;
        input.lastx = input.x;
        input.lasty = input.y;
        input.pressed = true;
    }

    // console.log("touch started");
};

window.ontouchmove = (e) => {
    e.preventDefault();
	const touch = e.changedTouches[0];
    
    if(input.zooming) {
	    const touch2 = e.changedTouches[1];
        
        const zoomdistance = calcDistance(touch.clientX, touch.clientY, touch2.clientX, touch2.clientY);
        const zoomdifference = zoomdistance - input.zoomdistance;
        input.zoomdistance = zoomdistance;

        input.dzoom += zoomdifference;
        input.zoom += zoomdifference;
    }
    else {
        input.x = touch.clientX; 
        input.y = touch.clientY; 
        input.dx = input.x - input.lastx;
        input.dy = input.y - input.lasty;
        input.lastx = input.x;
        input.lasty = input.y;
    }

    // console.log("touch "+ input.x + " " + input.y + " zoom: " + input.zoom);

};
window.ontouchcancel = window.ontouchend = (e) => {
    e.preventDefault();
    input.zooming = false;
    input.pressed = false;
    // console.log("touch cancelled");
};
