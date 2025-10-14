class AssetLoader {
    
  static cache = new Map();

  static loadImage(path) {
    if (this.cache.has(path)) {
      return Promise.resolve(this.cache.get(path));
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.cache.set(path, img);
        resolve(img);
      };
      img.onerror = () => reject(new Error(`Falha ao carregar imagem: ${path}`));
      img.src = path;
    });
  }

  static preload(paths, onProgress) {
    let loaded = 0;
    const total = paths.length;

    return Promise.all(
      paths.map(path =>
        this.loadImage(path).then(img => {
          loaded++;
          if (onProgress) onProgress(loaded / total);
          return img;
        })
      )
    );
  }

  static get(path) {
    return this.cache.get(path);
  }
}

export default AssetLoader;