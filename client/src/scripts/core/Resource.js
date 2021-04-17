// ==========================================================
// resource load
// ==========================================================
class Resource {
  static images = [];

  static preloadImage = function (src, name) {
    const self = this;
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = src;

      image.onload = function () {
        self.images.push({ image, name });
        resolve({ image, name });
      };
      image.onerror = function () {
        reject(new Error('preload error'));
      };
    });
  };

  static preloadImages = function (imagesArray) {
    const promises = imagesArray.map((imageItem) => {
      const { src = null, name = null } = imageItem;
      if (!src || !name)
        throw new Error('Resource: src & name are required parameters!');
      return this.preloadImage(src, name);
    });
    return Promise.all(promises);
  };

  static getImage = function (name) {
    const item = this.images.find((image) => image.name === name);
    return item.image;
  };
}

export default Resource;
