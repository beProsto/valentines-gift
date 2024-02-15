const matrix = {
    create: () => {
        const m = new Float32Array(16);
        matrix.identity(m);
        return m;
    },
    identity: (m) => {
        for(let i = 0; i < 16; i++) m[i] = 0.0;
        m[0] = m[5] = m[10] = m[15] = 1.0;
    },
    perspective: (m, degrees, aspect, near, far) => {
        for(let i = 0; i < 16; i++) m[i] = 0.0;
        const frustumScale = 1.0 / Math.tan(degrees / 2.0);
        m[0] = frustumScale / aspect;
        m[5] = frustumScale;
        m[10] = (far + near) / (near - far);
        m[14] = (2 * far * near) / (near - far);
        m[11] = -1.0;
    },
    translate: (m, x, y, z) => {
        m[12] += x;
        m[13] += y;
        m[14] += z;
    },
    rotatez: (m, degrees) => {
        const s = Math.sin(degrees);
        const c = Math.cos(degrees);
        const in00 = m[0];
        const in01 = m[1];
        const in02 = m[2];
        const in03 = m[3];
        const in10 = m[4];
        const in11 = m[5];
        const in12 = m[6];
        const in13 = m[7];
    
        m[0] = in00 * c + in10 * s;
        m[1] = in01 * c + in11 * s;
        m[2] = in02 * c + in12 * s;
        m[3] = in03 * c + in13 * s;
        m[4] = in10 * c - in00 * s;
        m[5] = in11 * c - in01 * s;
        m[6] = in12 * c - in02 * s;
        m[7] = in13 * c - in03 * s;
    },
    rotatey: (m, degrees) => {			
        const s = Math.sin(degrees);
        const c = Math.cos(degrees);
        const in00 = m[0];
        const in01 = m[1];
        const in02 = m[2];
        const in03 = m[3];
        const in20 = m[8];
        const in21 = m[9];
        const in22 = m[10];
        const in23 = m[11];
    
        m[0] = in00 * c - in20 * s;
        m[1] = in01 * c - in21 * s;
        m[2] = in02 * c - in22 * s;
        m[3] = in03 * c - in23 * s;
        m[8] = in00 * s + in20 * c;
        m[9] = in01 * s + in21 * c;
        m[10] = in02 * s + in22 * c;
        m[11] = in03 * s + in23 * c;
    },
    rotatex: (m, degrees) => {
        const s = Math.sin(degrees);
        const c = Math.cos(degrees);
        const in10 = m[4];
        const in11 = m[5];
        const in12 = m[6];
        const in13 = m[7];
        const in20 = m[8];
        const in21 = m[9];
        const in22 = m[10];
        const in23 = m[11];
    
        m[4] = in10 * c + in20 * s;
        m[5] = in11 * c + in21 * s;
        m[6] = in12 * c + in22 * s;
        m[7] = in13 * c + in23 * s;
        m[8] = in20 * c - in10 * s;
        m[9] = in21 * c - in11 * s;
        m[10] = in22 * c - in12 * s;
        m[11] = in23 * c - in13 * s;
    },
    scale: (m, x, y, z) => {
        m[0] *= x;
        m[5] *= y;
        m[10] *= z;
    },
    scale1to1: (m, s) => {
        matrix.scale(m, s, s, s);
    }
};