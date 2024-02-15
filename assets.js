// Meshes and textures to preload
const preloadTextures = {
    hearts: "./assets/hearts-texture.png"
};
const preloadMeshes   = {
    hearts: "./assets/hearts.obj",
    tri: "./assets/tri.obj"
};

const preloadAssets = async () => {
    // Load all textures
    for(textureName in preloadTextures) {
        const textureUrl = preloadTextures[textureName];
        console.log(`Loading Texture '${textureName}' from '${textureUrl}'`);

        const image = await loadImageFile(textureUrl);
        textures[textureName] = new Texture(image);
    }

    // Load all meshes 
    for(meshName in preloadMeshes) {
        const meshUrl = preloadMeshes[meshName];
        console.log(`Loading Mesh '${meshName}' from '${meshUrl}'`);

        const data = await loadObjFile(meshUrl);
        meshes[meshName] = new Mesh(data);
    }
};