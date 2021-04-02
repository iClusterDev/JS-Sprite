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
    return Promise.all(
      imagesArray.map((imageItem) =>
        this.preloadImage(imageItem.src, imageItem.name)
      )
    );
  };

  static getImage = function (name) {
    return this.images.find((item) => item.name === name);
  };
}

export default Resource;
