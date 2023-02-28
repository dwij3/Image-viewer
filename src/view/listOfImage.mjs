export const listOfImage = {
  init: function (arr, handleListImageClick, handleEditButtonClick) {
    //make a outer div and append it to container
    const listImageContainer = document.createElement("div");
    const container = document.querySelector(".container");

    listImageContainer.classList.add("list-image-container");
    container.appendChild(listImageContainer);
    this.render(arr);
    this.attachEventListener(handleListImageClick, handleEditButtonClick);
  },

  render: function (arr) {
    const listImageContainer = document.querySelector(".list-image-container");
    listImageContainer.innerHTML = "";
    arr.forEach((ele) => {
      const listItem = document.createElement("div");
      listItem.setAttribute("data-key", ele.id);
      const imageName = document.createElement("span");
      imageName.classList.add("imageName");
      imageName.textContent = ele.name;
      listItem.classList.add("list-item");
      listItem.appendChild(imageName);
      const adminButton = document.createElement("button");
      adminButton.innerHTML = "edit";
      adminButton.classList.add("editbtn");
      listItem.appendChild(adminButton);
      listImageContainer.appendChild(listItem);
    });
  },

  attachEventListener: function (handleListImageClick, handleEditButtonClick) {
    const listImageContainer = document.querySelector(".list-image-container");

    //attaching event-listener to parent component of list-of-images
    // we are checking if there is we clicked on image name or
    // edit button we should take the parent element that contains
    // image-id with that image id we should update model's current-image
    // as well as view2 which is handled by handleListImageClick

    // console.log("Hello", listImageContainer.children, listOfImages);
    listImageContainer.addEventListener("click", (e) => {
      let selectedElement = e.target;
      const form = document.querySelector("form");
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

        const ImageInfo = Array.from(listImageContainer.children);

        ImageInfo.forEach((ele) => {
          ele.classList.remove("toggle");
        });

        selectedElement.classList.add("toggle");
        const idOfImage = selectedElement.getAttribute("data-key");
        handleListImageClick(idOfImage);
      }

      if (e.target.tagName === "BUTTON") {
        //pro button
        let form = document.querySelector("form");
        form.style.visibility = "visible";
        handleEditButtonClick();
      }
    });
  }
};
