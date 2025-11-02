// Defines the AssetLoader class, responsible for loading and caching game assets (images);
class AssetLoader {
    
    // A static Map to store loaded Image objects, keyed by their file path.
    // This serves as the cache, ensuring images are loaded only once;
    static images = new Map();

    // Returns a Promise that resolves with the HTML Image element.
    static loadImage(path) {

        // If the image is already in the map, return it immediately wrapped in a resolved Promise;
        if (this.images.has(path)) {
            return Promise.resolve(this.images.get(path));
        }

        // Load the Image: If not cached, create a new Promise to handle the asynchronous loading;
        return new Promise((resolve, reject) => {
            
            const image = new Image(); // Creates a new HTML <img> element instance;
            
            // Set up the 'onload' event handler:
            image.onload = () => {
                // When the image finishes loading, cache it and resolve the Promise with the image object;
                this.images.set(path, image);
                resolve(image);
            };
            
            // Set up the 'onerror' event handler:
            image.onerror = () => reject(new Error(`Cannot Load Image Path: ${path}`));
            
            // Starts the loading process by setting the source attribute;
            image.src = path;
        });
    }

    // Takes an array of image paths and returns a Promise that resolves when ALL images are loaded.
    static preload(paths) {

        // Uses Promise.all to load every path via loadImage.
        // The resulting Promise array only resolves when all individual image loading Promises resolve;
        return Promise.all(paths.map(path => this.loadImage(path)));
    }

    // Assumes the image has already been loaded via loadImage or preload.
    static get(path) {
        
        return this.images.get(path);
    }
}

// Exports the static utility class;
export default AssetLoader;