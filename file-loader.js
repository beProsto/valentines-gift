const loadTextFile = async (url) => {
    const file = await fetch(url);
    const text = await file.text();
    return text;
};

const loadObjFile = async (url) => {
    const text = await loadTextFile(url);
    return objParser.parse(text);
};

const loadImageFile = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => { resolve(img); };
        img.onerror = () => { reject(); };
        img.src = url;
    });
};