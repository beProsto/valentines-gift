// Here shall the shared variables be stored
const game = {};

// Run the game
const main = async () => {
    // Preload all assets
    await preloadAssets();
    // Initialize the renderer
	const vertCode = await loadTextFile("./assets/vertex-shader.glsl");
	const fragCode = await loadTextFile("./assets/fragment-shader.glsl");
    renderer.setup(vertCode, fragCode);
    
    // Camera Controls
    game.camera = {};
    game.camera.rotationX = Math.PI/5;
    game.camera.rotationY = 0;
    game.camera.zoom = 0.5;

    // Create game objects
    game.fox = new GameObject("fox", "fox");
    game.ocelot = new GameObject("ocelot", "ocelot");
    matrix.scale1to1(game.fox.transformMatrix, 0.05);
    matrix.scale1to1(game.ocelot.transformMatrix, 0.05);
    matrix.translate(game.fox.transformMatrix, 0.0, -0.6, 0.0);
    matrix.translate(game.ocelot.transformMatrix, 0.0, -0.6, 0.0);

    game.heart = new GameObject("hearts", "hearts");
    matrix.scale(game.heart.transformMatrix, 0.1, 0.1, 0.1);
    matrix.translate(game.heart.transformMatrix, 0.0, 2, 0);
    
    game.heartcloud = [];
    game.heartcloudDensity = 100;
    for(let i = 0; i < game.heartcloudDensity; i++) {
        game.heartcloud.push(new GameObject("hearts", "hearts"));
        renderer.addGameObject(game.heartcloud[i]);
        matrix.scale1to1(game.heartcloud[i].transformMatrix, 0.05);
        const position = [Math.random()-0.5, Math.random()+0.1, Math.random()-0.5];
        matrix.translate(game.heartcloud[i].transformMatrix, ...position);
        game.heartcloud[i].velocity = position;
        game.heartcloud[i].rotationSpeed = (Math.abs(position[0])+Math.abs(position[2])) / 10;
        game.heartcloud[i].terminalVelocity = -100;
        game.heartcloud[i].height = position[1];
    }
    
    renderer.addGameObject(game.fox);
    renderer.addGameObject(game.ocelot);
    renderer.addGameObject(game.heart);

    // Initiate the game loop
    requestAnimationFrame(getFirstTime);
}; 

// Game Loop
const gameUpdate = (dt, t) => {
    // Camera controls
    matrix.identity(renderer.camera.viewMatrix);
    matrix.scale1to1(renderer.camera.viewMatrix, game.camera.zoom);
    game.camera.zoom += input.dzoom / 1000;
    game.camera.zoom = Math.max(game.camera.zoom, 0.2);
    console.log("zoom " + input.zoom);
    if(input.pressed) {
        game.camera.rotationX += input.dy / 100;
        game.camera.rotationY += input.dx / 100;
        game.camera.rotationX = Math.max(game.camera.rotationX, -Math.PI/10);
        game.camera.rotationX = Math.min(game.camera.rotationX, Math.PI/2);
    }
    else {
        game.camera.rotationY += -dt;
    }
    matrix.rotatex(renderer.camera.viewMatrix, game.camera.rotationX);
    matrix.rotatey(renderer.camera.viewMatrix, game.camera.rotationY);
    matrix.translate(renderer.camera.viewMatrix, 0.0, 0.0, -1.9)

    // Main heart movement
    matrix.translate(game.heart.transformMatrix, 0.0, Math.sin(t/500)/100, 0);
    matrix.rotatey(game.heart.transformMatrix, -dt);

    // Heart particles
    for(let i = 0; i < game.heartcloudDensity; i++) {
        const xvel = game.heartcloud[i].velocity[0] * dt * 2;
        const yvel = game.heartcloud[i].velocity[1] * dt * 5;
        const zvel = game.heartcloud[i].velocity[2] * dt * 2;
        
        game.heartcloud[i].velocity[1] -= 10*dt*dt;
        game.heartcloud[i].velocity[1] = Math.max(game.heartcloud[i].terminalVelocity * dt, game.heartcloud[i].velocity[1]);
        
        game.heartcloud[i].height += yvel;
        
        matrix.translate(game.heartcloud[i].transformMatrix, xvel, yvel, zvel);
        matrix.rotatey(game.heartcloud[i].transformMatrix, game.heartcloud[i].rotationSpeed);
        if(game.heartcloud[i].height <= -50) {
            const correction = 100;
            matrix.translate(game.heartcloud[i].transformMatrix, 0, correction, 0);
            game.heartcloud[i].height += correction;
            game.heartcloud[i].velocity[0] = 0;
            game.heartcloud[i].velocity[2] = 0;
        }

    }
};

main();
