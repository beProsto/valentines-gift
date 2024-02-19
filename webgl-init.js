// Get WebGL2 context
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2", {xrCompatible: true});

// Ensure the canvas has the same size as the screen
const canvasSizeUpdate = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
};
window.onresize = canvasSizeUpdate;
canvasSizeUpdate();