import { controller } from "../controller/controller.mjs";

export const view3 = {
  init: function (obj) {
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
    inputName.autocomplete = "off";

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
    inputUrl.autocomplete = "off";

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
    inputCounter.autocomplete = "off";
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

    //adding line break
    const br = document.createElement("br");

    //appending childs to form:
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
    container.appendChild(adminDiv);

    this.attachEventHandlers();
  },

  render: function (obj) {
    document.forms[0].reset();

    const name = document.getElementById("name");
    const url = document.getElementById("url");
    const counter = document.getElementById("counter");

    name.setAttribute("value", obj.name);
    url.setAttribute("value", obj.image.src);
    counter.setAttribute("value", +obj.counter);
  },

  attachEventHandlers: function () {
    const form = document.getElementsByTagName("form")[0];
    const name = document.getElementById("name");
    const url = document.getElementById("url");
    const counter = document.getElementById("counter");

    const myFunction = (e) => {
      let obj = {};
      if (e.target.getAttribute("type") === "submit") {
        obj.name = name.value;
        obj.src = url.value;
        obj.counter = counter.value;
        form.style.visibility = "hidden";

        return controller.handleView3(obj);
      }

      if (e.target.getAttribute("type") === "reset") {
        form.style.visibility = "hidden";
      }

      return obj;
    };

    form.addEventListener("click", (e) => {
      myFunction(e);
    });
  },
};
