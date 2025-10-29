class AssetLoader {
    
  static images = new Map();

  static loadImage(path) {

    if (this.images.has(path)) {
      return Promise.resolve(this.images.get(path));
    }

    return new Promise((resolve, reject) => {
      
      const image = new Image();
      
      image.onload = () => {
        this.images.set(path, image);
        resolve(image);
      };
      
      image.onerror = () => reject(new Error(`Cannot Load Image Path: ${path}`));
      image.src = path;
    });
  }

  static preload(paths) {

    return Promise.all(paths.map(path => this.loadImage(path)));
  }

  static get(path) {
    
    return this.images.get(path);
  }
}

export default AssetLoader;