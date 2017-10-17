# canvas-image-cache
> :sun_with_face: A Promise-based utility to cache all the loaded images in canvas.

## Installation:

```
npm install --save canvas-image-cache
```

## Usage
```js
import createImageCache from 'canvas-image-cache'

let imageCache = createImageCache()

const dict = {
  ship: './ship.png',
  universe: './universe.png',
  asteroid: './asteroid.png',
  fire: './fire.png'
}

imageCache.loadImages(dict)

// provide a callback after loading
imageCache.imagesOnload(() => {
  console.log('All images are loaded!')

  // the typical use scenario is to start the game loop and begin rendering the canvas
  gameloop()
})
```

And in your gameloop, if you want to render the image in your dict, you don't need to instantiate an `Image` instance again and wait until it's loaded. It's already stored in the `imageCache`:

```js
// for instance, you want to draw ship
function renderShip(context, imageCache) {
  const ship = imageCache.getImages().find(i => i.name === 'ship')

  context.drawImage(ship, dx, dy)
}

// or you could render them all!
function renderAll(context, imageCache) {
  imageCache.getImages().forEach(item => {
    context.drawImage(item.img, dx, dy)
  })
}
```

## Background

Think of the typical way to render an image in canvas, you could do the followings:

```js
function drawImageFromUrl(url) {
  let img = new Image()
  img.src = url

  img.onload = () => {
    // you have to wait until the image has been fully loaded
    context.drawImage(img, dx, dy)
  }
}
```

This works fine in most of the cases. However, if you are in game development, say, you have a game loop function that repeatedly renders every image in 30 milliseconds. Between when you `let img = new Image()` and `img.onload`, your canvas is totally blank, which could cause a flickering/blinking issue.

For more details, see https://stackoverflow.com/questions/17261080/html5-canvas-blinking-on-drawing 

And this utility fixes the issue mentioned above. The general idea is to load all the needed images in the game and cache them before the gameloop begins. And then you could leverage the exsisted images instances rather than creating a new one in each rendering.
