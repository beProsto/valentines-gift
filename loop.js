let lastTime = 0;
// Main Game Loop
const loopUpdate = (time) => {
    // Get Delta Time
    const deltaTime = (time - lastTime) / 1000;
    lastTime = time;

    // Game logic
    gameUpdate(deltaTime, time);

    // Rendering
    renderer.update(deltaTime, time);

    // console.log(`x: ${input.x}, delta: ${input.dx}`);
    // console.log(`Mouse Button: ${mouse.button}`)    
    
    // Update input
    inputUpdate();

    // Requesting next frame
    requestAnimationFrame(loopUpdate);
};
// Ensure proper delta time calculation
const getFirstTime = (time) => {
    lastTime = time;
    requestAnimationFrame(loopUpdate);
}
