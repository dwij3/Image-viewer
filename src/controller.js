import { model } from "./model.js";
import { listOfImage } from "./view/listOfImage";
import { imageView } from "./view/imageView";
import { editView } from "./view/editView";

export const controller = {
  init: function (arr) {
    //controller initialize the model,view1 and view2 and view3
    model.init(arr);
    listOfImage.init(
      arr,
      this.handleListImageClick,
      this.handleEditButtonClick
    );

    const listOfImages = model.getImages();
    const currentlySelectedImage = model.getCurrentImg();
    const imageInfo = listOfImages[currentlySelectedImage];
    listOfImage.render(listOfImages);

    imageView.init(this.handleImageClick);
    imageView.render(imageInfo);
    editView.init(imageInfo, this.handleSubmitEditView);
    editView.render(imageInfo);
  },

  handleListImageClick: function (id) {
    const images = model.getImages();
    model.setCurrentImg(id);
    imageView.render(images[id]);
  },

  handleEditButtonClick: function () {
    const id = model.getCurrentImg();
    const listOfImages = model.getImages();
    editView.render(listOfImages[id]);
  },

  handleImageClick: function () {
    const currentlySelectedImage = model.getCurrentImg();
    const listOfImages = model.getImages();
    model.incrementCounter();
    const imageInfo = listOfImages[currentlySelectedImage];
    imageView.render(imageInfo);
    editView.render(imageInfo);
  },

  handleSubmitEditView: function (obj) {
    const currentlySelectedImage = model.getCurrentImg();
    const listOfImages = model.getImages();
    model.setName(obj.name);
    model.setImageUrl(obj.src);
    model.setCounter(obj.counter);

    listOfImage.render(listOfImages);
    imageView.render(listOfImages[currentlySelectedImage]);
  }
};
