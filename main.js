// Run the game
const main = async () => {
    // Preload all assets
    await preloadAssets();
    // Initialize the renderer
	const vertCode = await loadTextFile("./assets/vertex-shader.glsl");
	const fragCode = await loadTextFile("./assets/fragment-shader.glsl");
    renderer.setup(vertCode, fragCode);
    
    // Create game objects
    const fox = new GameObject("fox", "fox");
    renderer.addGameObject(fox);
    matrix.translate(fox.transform.m4x4, 0.5, 0, 0);
    matrix.scale(fox.transform.m4x4, 0.1, 0.1, 0.1);
    
    const ocelot = new GameObject("ocelot", "ocelot");
    renderer.addGameObject(ocelot);
    matrix.translate(ocelot.transform.m4x4, -0.5, 0.3, 0);
    matrix.scale(ocelot.transform.m4x4, 0.1, 0.1, 0.1);

    const hearts = new GameObject("hearts", "hearts");
    matrix.scale(hearts.transform.m4x4, 0.1, 0.1, 0.1);
    matrix.translate(hearts.transform.m4x4, 0.0, 0.5, 0);
    renderer.addGameObject(hearts);

    // Initiate the game loop
    requestAnimationFrame(getFirstTime);
}; 

// Game Loop
const gameUpdate = (dt, t) => {
    // console.log("a bit dirty but it works so fine")
};

main();
