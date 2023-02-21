export const model = {
  //In model we will only store array of objects and updates
  //related to obj of image
  arrOfImg: [],
  currentImg: 0,

  init: function (arr) {
    this.arrOfImg = [...arr];
  },

  add: function (obj) {
    this.arrOfImg.push(obj);
  },

  getImages: function () {
    return this.arrOfImg;
  },

  setCurrentImg: function (x) {
    this.currentImg = x;
  },

  getCurrentImg: function () {
    return this.currentImg;
  },

  setCounter: function (cnt) {
    this.arrOfImg[this.currentImg].counter = cnt;
  },

  setName: function (name) {
    this.arrOfImg[this.currentImg].name = name;
  },

  setImageUrl: function (src) {
    this.arrOfImg[this.currentImg].image.src = src;
    console.log(this.arrOfImg);
  },

  incrementCounter: function () {
    this.arrOfImg[this.currentImg].counter++;
  }
};
