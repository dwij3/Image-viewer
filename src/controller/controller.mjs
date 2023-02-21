import { model } from "../model/model.mjs";
import { view1 } from "../view/view1.mjs";
import { view2 } from "../view/view2.mjs";
import { view3 } from "../view/view3.mjs";

export const controller = {
  init: function (arr) {
    //controller initialize the model,view1 and view2 and view3
    model.init(arr);
    view1.init();

    const listOfImages = model.getImages();
    const CurrentlySelectedImage = model.getCurrentImg();
    view1.render(listOfImages);

    view2.init();
    view2.render(listOfImages[CurrentlySelectedImage]);

    view3.init(listOfImages[CurrentlySelectedImage]);
    view3.render(listOfImages[CurrentlySelectedImage]);
  },

  addImage: function (obj) {
    //adding images to model
    model.add(obj);
    const listOfImages = model.getImages();
    view1.render(listOfImages);
    view2.render(listOfImages[0]);
  },

  handleView1: function (id) {
    const getImages = model.getImages();
    const obj = getImages.find((ele) => ele.id === +id);
    model.setCurrentImg(obj.id);
    view2.render(getImages[obj.id]);
  },

  handleProButton: function () {
    const id = model.getCurrentImg();
    const listOfImages = model.getImages();
    view3.render(listOfImages[id]);
  },

  handleView2: function () {
    const CurrentlySelectedImage = model.getCurrentImg();
    const modelArray = model.getImages();
    model.incrementCounter();
    view2.render(modelArray[CurrentlySelectedImage]);
    view3.render(modelArray[CurrentlySelectedImage]);
  },

  handleView3: function (obj) {
    const CurrentlySelectedImage = model.getCurrentImg();
    const listOfImages = model.getImages();
    model.setName(obj.name);
    model.setImageUrl(obj.src);
    model.setCounter(obj.counter);

    view1.render(listOfImages);
    view2.render(listOfImages[CurrentlySelectedImage]);
  },
};
