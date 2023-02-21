import { controller } from "../controller/controller.mjs";

export const view2 = {
  init: function () {
    //make a image-voewer div and append it to container
    const imageViewer = document.createElement("div");
    const container = document.querySelector(".container");
    imageViewer.classList.add("img-viewer");
    container.appendChild(imageViewer);

    this.attachEventListener();
  },

  render: function (obj) {
    const imageViewer = document.querySelector(".img-viewer");

    //add title node to img-viewer
    const titleImage = document.createElement("div");
    const textNodeForImage = document.createTextNode(obj.name);
    titleImage.appendChild(textNodeForImage);

    //add-image to img-viewer
    const Image = document.createElement("img");
    Image.setAttribute("src", obj.image.src);
    Image.setAttribute("alt", obj.image.alt);
    Image.setAttribute("data-key", obj.id);

    //showing how many times an image has been clicked
    const counterNode = document.createElement("div");
    const textNodeForCounter = document.createTextNode(obj.counter);
    counterNode.appendChild(textNodeForCounter);

    //Substitute an image with current image:
    imageViewer.innerHTML = "";
    imageViewer.appendChild(titleImage);
    imageViewer.appendChild(Image);
    imageViewer.appendChild(counterNode);
  },

  attachEventListener: function () {
    let imageViewer = document.querySelector(".img-viewer");
    imageViewer.addEventListener("click", (e) => {
      if (e.target.tagName !== "IMG") {
        return;
      }
      controller.handleView2();
    });
  },
};
