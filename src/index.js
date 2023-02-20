let model = {
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

  getArray: function () {
    return this.arrOfImg;
  },

  setCurrentImg: function (x) {
    this.currentImg = x;
    // console.log("model's currentImg: set ", x, this.currentImg);
  },

  getCurrentImg: function () {
    // console.log("model's currentImg: get ", this.currentImg);
    return this.currentImg;
  },

  updateCounter: function (obj) {
    obj.counter++;
  },
};

let octopus = {
  init: function (arr) {
    //octopus initialize the model,view1 and view2
    model.init(arr);
    view1.init();

    const listArray = model.getArray();
    const setImage = model.getCurrentImg();
    view1.render(listArray);

    view2.init();
    view2.render(listArray[setImage]);

    view3.init(model.getArray()[model.getCurrentImg()]);
    view3.render(model.getArray()[model.getCurrentImg()]);

    //adding event handlers to image and list-array-of-images:
    this.updateView2();
  },

  add: function (obj) {
    //adding images to model
    model.add(obj);
    view1.render(model.getArray());
    view2.render(model.getArray()[0]);
  },

  updateView2: function () {
    const outerDiv = document.querySelector(".outer-div");
    outerDiv.addEventListener("click", (e) => {
      // console.log(e.target.tagName);
      let ele = e.target;
      const form = document.getElementsByTagName("form")[0];
      form.style.display = "none";
      if (ele.hasAttribute("data-key") || ele.tagName === "BUTTON") {
        if (ele.tagName === "BUTTON") {
          ele = ele.parentElement;
        }

        const id = ele.getAttribute("data-key");
        const modelArray = model.getArray();
        const obj = modelArray.find((ele) => ele.id === +id);
        model.setCurrentImg(obj.id);
        view2.render(modelArray[obj.id]);

        // view3.render(modelArray[obj.id]);
      }
      if (e.target.tagName === "BUTTON") {
        console.log("I am in pro Button");
        let form = document.getElementsByTagName("form")[0];
        // console.log(form);
        form.style.display = "block";
        const id = model.getCurrentImg();
        console.log("VALUE:", id, model.getArray()[id]);
        // console.log(model.getCurrentImg());
        view3.render(model.getArray()[id]);
      }
    });

    let imageViewer = document.querySelector(".img-viewer");
    imageViewer.addEventListener("click", (e) => {
      if (e.target.tagName !== "IMG") {
        return;
      }
      const id = model.getCurrentImg();
      // console.log(id);
      const modelArray = model.getArray();
      const obj = modelArray.find((ele) => ele.id === +id);
      model.updateCounter(obj);
      // console.log(id, model.getArray()[id].counter);
      view2.render(model.getArray()[id]);
      view3.render(model.getArray()[id]);
    });

    //view3
    const form = document.getElementsByTagName("form")[0];
    const name = document.getElementById("name");
    const url = document.getElementById("url");
    const counter = document.getElementById("counter");

    form.addEventListener("click", function (e) {
      if (e.target.getAttribute("type") === "submit") {
        // console.log("Form", name.value, url.value, counter.value);
        // let updateArray = model.getArray()[id];
        const id = model.getCurrentImg();
        console.log("oo", model.currentImg, id);
        model.getArray()[id].name = name.value;
        model.getArray()[id].image.src = url.value;
        model.getArray()[id].counter = counter.value;

        // console.log("update", updateArray);
        // console.log("id", id);
        // console.log(model.getArray());

        view1.render(model.getArray());
        view2.render(model.getArray()[id]);

        form.style.display = "none";
      }

      if (e.target.getAttribute("type") === "cancel") {
        form.style.display = "none";
      }
    });
  },
};

let view1 = {
  init: () => {
    //make a outer div and append it to container
    const outerDiv = document.createElement("div");
    const container = document.querySelector(".container");

    outerDiv.classList.add("outer-div");
    container.appendChild(outerDiv);
    // container.appendChild(adminButton);
  },

  render: function (arr) {
    const outerDiv = document.querySelector(".outer-div");
    outerDiv.innerHTML = "";
    arr.forEach((ele) => {
      const addList = document.createElement("div");
      addList.setAttribute("data-key", ele.id);
      const textNode = document.createTextNode(ele.name);
      addList.classList.add("list-item");
      addList.appendChild(textNode);
      const adminButton = document.createElement("button");
      adminButton.setAttribute("value", "Pro");
      adminButton.innerHTML = "pro";
      addList.appendChild(adminButton);

      outerDiv.appendChild(addList);
    });
  },
};

let view2 = {
  init: () => {
    //make a image-voewer div and append it to container
    const outerDiv = document.createElement("div");
    const container = document.querySelector(".container");
    outerDiv.classList.add("img-viewer");
    container.appendChild(outerDiv);
  },

  render: function (obj) {
    console.log(obj);
    const outerDiv = document.querySelector(".img-viewer");

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
    outerDiv.innerHTML = "";
    outerDiv.appendChild(titleImage);
    outerDiv.appendChild(Image);
    outerDiv.appendChild(counterNode);
  },
};

let view3 = {
  init: function (obj) {
    // console.log(obj);
    const adminDiv = document.createElement("div");

    const form = document.createElement("form");
    form.setAttribute("method", "post");

    //create a label and input for name:
    // <label for="name"> </label>
    // <input type="text" value=obj.name id="name" />
    const labelName = document.createElement("label");
    labelName.setAttribute("for", "name");
    labelName.innerText = "Name:";
    const inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("value", obj.name);
    inputName.setAttribute("id", "name");
    inputName.setAttribute("data-key", obj.id);

    //create a label and input for url:
    // <label for="url"> </label>
    // <input type="text" value=obj.image.src id="url">
    const labelUrl = document.createElement("label");
    labelUrl.setAttribute("for", "url");
    labelUrl.innerText = "URL:";
    const inputUrl = document.createElement("input");
    inputUrl.setAttribute("type", "text");
    inputUrl.setAttribute("value", obj.image.src);
    inputUrl.setAttribute("id", "url");

    //create a label and input for counter:
    // <label for="counter"> </label>
    // <input type="text" value=obj.counter id="counter">
    const labelCounter = document.createElement("label");
    labelCounter.setAttribute("for", "counter");
    labelCounter.innerText = "Counter:";
    const inputCounter = document.createElement("input");
    inputCounter.setAttribute("type", "text");
    inputCounter.setAttribute("value", obj.counter);
    inputCounter.setAttribute("id", "counter");

    //create a cancel button
    //<buttton> cancel </buttton>
    const cancelButton = document.createElement("input");
    cancelButton.setAttribute("type", "reset");
    cancelButton.setAttribute("value", "cancel");

    //create a submit button
    //<input type="submit" value="submit">
    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "submit");

    const br = document.createElement("br");

    form.appendChild(labelName);
    form.appendChild(inputName);
    form.appendChild(br.cloneNode());

    form.appendChild(labelUrl);
    form.appendChild(inputUrl);
    form.appendChild(br.cloneNode());

    form.appendChild(labelCounter);
    form.appendChild(inputCounter);
    form.appendChild(br.cloneNode());

    form.appendChild(cancelButton);
    form.appendChild(submitButton);

    adminDiv.innerHTML = "";
    adminDiv.appendChild(form);
    adminDiv.classList.add("admin");
    const container = document.querySelector(".container");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
    });

    if (container.childElementCount > 2)
      container.removeChild(container.lastElementChild);
    container.appendChild(adminDiv);
  },

  render: function (obj) {
    // console.log("in veiw3 render");
    console.log(obj);
    document.forms[0].reset();

    const name = document.getElementById("name");
    const url = document.getElementById("url");
    const counter = document.getElementById("counter");

    name.setAttribute("value", obj.name);
    // name.innerText = obj.name;
    name.setAttribute("data-key", obj.id);
    url.setAttribute("value", obj.image.src);
    // url.innerText = obj.image.src;
    counter.setAttribute("value", +obj.counter);
    // counter.innerText = obj.counter;
    console.log(counter.getAttribute("value"));
  },
};

let arr = [
  {
    id: 0,
    name: "image-1",
    image: {
      src: "https://picsum.photos/id/1/500/500",
      alt: "image-1",
    },
    counter: 0,
  },
  {
    id: 1,
    name: "image-2",
    image: {
      src: "https://picsum.photos/id/2/500/500",
      alt: "image-2",
    },
    counter: 0,
  },
  {
    id: 2,
    name: "image-3",
    image: {
      src: "https://picsum.photos/id/3/500/500",
      alt: "image-3",
    },
    counter: 0,
  },
  {
    id: 3,
    name: "image-4",
    image: {
      src: "https://picsum.photos/id/4/500/500",
      alt: "image-4",
    },
    counter: 0,
  },
  {
    id: 4,
    name: "image-5",
    image: {
      src: "https://picsum.photos/id/5/500/500",
      alt: "image-1",
    },
    counter: 0,
  },
  {
    id: 0,
    name: "image-6",
    image: {
      src: "https://picsum.photos/id/6/500/500",
      alt: "image-1",
    },
    counter: 0,
  },
];

octopus.init(arr);
