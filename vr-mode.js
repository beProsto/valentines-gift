const vrButton = document.getElementById("vr-button");
const vr = {
    session: null,
    refSpace: null
}

vrButton.onclick = async () => {
    if(!navigator.xr) {
        alert("The browser doesn't support VR");
        return;
    }

    const supported = await navigator.xr.isSessionSupported("immersive-vr");
    if(!supported) {
        alert("VR Session not supported");
        return;
    }

	if(vr.session) { 
		vr.session.end(); // request our session to end
        return;
    }
    
	vr.session = await navigator.xr.requestSession("immersive-vr");
	vr.session.addEventListener("end", onSessionEnded); 

	// initWebGL2({xrCompatible: true}); // we initialize WebGL2, in a way that makes it compatible with WebXR

	vr.session.updateRenderState({baseLayer: new XRWebGLLayer(vr.session, gl)}); // this line simply sets our session's WebGL context to our WebGL2 context
	vr.refSpace = await vr.session.requestReferenceSpace("local");
    vr.session.requestAnimationFrame(onSessionFrame);
};

const onSessionEnded = () => {
    vr.session = null;
};

const onSessionFrame = (t, frame) => { // this function will happen every frame
	const session = frame.session; // frame is a frame handling object - it's used to get frame sessions, frame WebGL layers and some more things
	session.requestAnimationFrame(onSessionFrame); // we simply set our animation frame function to be this function again
	let pose = frame.getViewerPose(vr.refSpace); // gets the pose of the headset, relative to the previously gotten referance space

	if(pose) { // if the pose was possible to get (if the headset responds)
		let glLayer = session.renderState.baseLayer; // get the WebGL layer (it contains some important information we need)

		gl.bindFramebuffer(gl.FRAMEBUFFER, glLayer.framebuffer); // sets the framebuffer (drawing target of WebGL) to be our WebXR display's framebuffer
		gl.clearColor(0.4, 0.7, 0.9, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // clears the framebuffer (in the next episode we'll implement our ezgfx renderer here - for now, let's just use vanilla WebGL2, as we're not doing anything else than clearing the screen)
		for(let view of pose.views) { // we go through every single view out of our camera's views
			let viewport = glLayer.getViewport(view); // we get the viewport of our view (the place on the screen where things will be drawn)
			gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height); // we set our viewport appropriately

			// Here we will draw our scenes
		}
	}
};
