function createImageCache() {
  let images = []
  let imgPromises = []
  let hasFinishedLoading = false

  function loadSingleImage(name, src) {
    imgPromises.push(new Promise((resolve, reject) => {
      let img = new Image()
      img.src = src

      hasFinishedLoading = false
      
      try {
        img.onload = () => {
          images.push({ name, img })
          hasFinishedLoading = true

          resolve({
            name,
            img
          })
        }
      } catch (err) {
        reject(err)
      }
    }))
  }

  function loadImages(arr) {
    arr.forEach(item => {
      loadSingleImage(item.name, item.src)
    })
  }
  
  function imagesOnLoad(callback) {
    // callback(arr)
    Promise.all(imgPromises).then(callback)
  }

  function getImages() {
    if (hasFinishedLoading) {
      return images
    } else {
      throw console.warn('Image hasn\'t finished loading. You may use getImages() in the callback of the imagesOnLoad function.')
    }
  }

  return {
    loadSingleImage,
    loadImages,
    getImages,
    imagesOnLoad
  }
}

module.exports = createImageCache
