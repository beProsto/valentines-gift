// Run the game
const main = async () => {
    // Preload all assets
    await preloadAssets();
    // Initialize the renderer
	const vertCode = await loadTextFile("./assets/vertex-shader.glsl");
	const fragCode = await loadTextFile("./assets/fragment-shader.glsl");
    renderer.setup(vertCode, fragCode);
    
    // Create game objects
    const heart = new GameObject("hearts", "hearts");
    renderer.addGameObject(heart);
    matrix.scale(heart.transform.m4x4, 0.1, 0.1, 0.1);


    // Initiate the game loop
    requestAnimationFrame(getFirstTime);
}; 

// Game Loop
const gameUpdate = (dt, t) => {
    // console.log("a bit dirty but it works so fine")
};

main();
