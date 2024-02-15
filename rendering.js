class Texture {
    constructor(image) {
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    }
    bind() {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }
}
class Mesh {
    constructor(data) {
        this.va = gl.createVertexArray();
        gl.bindVertexArray(this.va);

        this.vb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vb);

        this.stride = 0;
        this.length = 0;
        this.vertices = 0;

        const layout = [3, 2, 3];

        for(let i = 0; i < layout.length; i++) {
            this.stride += layout[i] * 4;
        }

        let istride = 0;
        for(let i = 0; i < layout.length; i++) {
            gl.vertexAttribPointer(i, layout[i], gl.FLOAT, false, this.stride, istride);
            gl.enableVertexAttribArray(i);

            istride += layout[i] * 4;
        }

        this.stride = this.stride / 4;

        this.length = data.length;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

        this.vertices = this.length / this.stride;
    }
    draw() {
        gl.bindVertexArray(this.va);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vb);
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices);
    }
}

const textures = {};
const meshes = {};

class Transform {
    constructor(pos = [0,0,0], rot = [0,0,0], scale = 1) {
        this.pos = pos;
        this.rot = rot;
        this.scale = scale;
        this.m4x4 = matrix.create();
    }

    getMatrix() {
        return this.m4x4;
    }
}

class GameObject {
    constructor(meshName, textureName, transform = new Transform()) {
        this.transform = transform;
        this.meshName = meshName;
        this.textureName = textureName;
    }
}

const renderer = {
    gameObjects: [],
    addGameObject(obj) {
        this.gameObjects.push(obj);
    },
    setup: (vertexShaderCode, fragmentShaderCode) => {
        gl.enable(gl.DEPTH_TEST);

        renderer.shader = gl.createProgram();
        
        renderer.vShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(renderer.vShader, vertexShaderCode);
        gl.compileShader(renderer.vShader);
        gl.attachShader(renderer.shader, renderer.vShader);

        renderer.fShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(renderer.fShader, fragmentShaderCode);
        gl.compileShader(renderer.fShader);
        gl.attachShader(renderer.shader, renderer.fShader);

        gl.linkProgram(renderer.shader);
        gl.useProgram(renderer.shader);

        renderer.projMatrixLocation = gl.getUniformLocation(renderer.shader, "u_Projection");
        renderer.viewMatrixLocation = gl.getUniformLocation(renderer.shader, "u_View");
        renderer.modelMatrixLocation = gl.getUniformLocation(renderer.shader, "u_Model");
        gl.uniformMatrix4fv(renderer.projMatrixLocation, false, matrix.create());
        gl.uniformMatrix4fv(renderer.viewMatrixLocation, false, matrix.create());
        renderer.zoom = 1.0;
        renderer.xrot = 0.0;
        renderer.yrot = 0.0;
    },
    update: (dt) => {
        gl.clearColor(0.3, 0.5, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const cam = matrix.create();
        matrix.perspective(cam, Math.PI / 2, canvas.width/canvas.height, 0.1, 1000);
        gl.uniformMatrix4fv(renderer.projMatrixLocation, false, cam);
        
        renderer.view = matrix.create();
        matrix.scale1to1(renderer.view, renderer.zoom);
        renderer.zoom += input.dzoom/500;
        console.log("zoom " + input.zoom);
        if(input.pressed) {
            renderer.xrot += input.dy / 100;
            renderer.yrot += input.dx / 100;
        }
        matrix.rotatex(renderer.view, renderer.xrot);
        matrix.rotatey(renderer.view, renderer.yrot);
        matrix.translate(renderer.view, 0, 0, -2)
        gl.uniformMatrix4fv(renderer.viewMatrixLocation, false, renderer.view);

        for(const obj of renderer.gameObjects) {
            gl.uniformMatrix4fv(renderer.modelMatrixLocation, false, obj.transform.getMatrix());
            textures[obj.textureName].bind();
            meshes[obj.meshName].draw();
        }
    }
};