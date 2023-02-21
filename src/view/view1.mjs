import { controller } from "../controller/controller.mjs";

export const view1 = {
  init: function () {
    //make a outer div and append it to container
    const outerDiv = document.createElement("div");
    const container = document.querySelector(".container");

    outerDiv.classList.add("outer-div");
    container.appendChild(outerDiv);

    this.attachEventListener();
  },

  render: function (arr) {
    const outerDiv = document.querySelector(".outer-div");
    outerDiv.innerHTML = "";
    arr.forEach((ele) => {
      const addList = document.createElement("div");
      addList.setAttribute("data-key", ele.id);
      const span = document.createElement("span");
      span.classList.add("check");
      span.textContent = ele.name;
      addList.classList.add("list-item");
      addList.appendChild(span);
      const adminButton = document.createElement("button");
      adminButton.setAttribute("value", "Pro");
      adminButton.innerHTML = "pro";
      addList.appendChild(adminButton);

      outerDiv.appendChild(addList);
    });
  },

  attachEventListener: function () {
    const outerDiv = document.querySelector(".outer-div");
    outerDiv.addEventListener("click", (e) => {
      let selectedElement = e.target;
      const form = document.getElementsByTagName("form")[0];
      form.style.visibility = "hidden";
      if (
        selectedElement.hasAttribute("data-key") ||
        selectedElement.tagName === "BUTTON" ||
        selectedElement.tagName === "SPAN"
      ) {
        if (
          selectedElement.tagName === "BUTTON" ||
          selectedElement.tagName === "SPAN"
        ) {
          selectedElement = selectedElement.parentElement;
        }
        const idOfImage = selectedElement.getAttribute("data-key");
        controller.handleView1(idOfImage);
      }

      if (e.target.tagName === "BUTTON") {
        //pro button
        let form = document.getElementsByTagName("form")[0];
        form.style.visibility = "visible";
        controller.handleProButton();
      }
    });
  },
};
