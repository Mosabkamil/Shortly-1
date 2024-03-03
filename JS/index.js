const navIconElement = document.querySelector(".bars-model");
const navBarElement = document.getElementById("navBar");
const formElement = document.getElementById("form");
const inputElement = document.getElementById("input");
const spanErrorInputElement = document.querySelector(".span-error");
const shortenButtonElement = document.getElementById("shorten-url");

let database = [];

document.addEventListener("DOMContentLoaded", function () {
  getTodoFormLocalStorage();
});

// ... (rest of your code)

function addId() {
  let id = Math.random();
  return id;
}

function setUrlToLocalStorage() {
  window.localStorage.setItem("url", JSON.stringify(database));
}

function getTodoFormLocalStorage() {
  const data = window.localStorage.getItem("url");
  if (data) {
    const url = JSON.parse(data);
    database = url;
    url.forEach((element) => {
      addUrlToPage(element);
    });
  }
}

window.localStorage.clear();

function createUrlToDatabase(long) {
  const url = new Object();
  url.long_url = long;
  url.short_url = long;
  url.id = addId();
  database.push(url);
  return url;
}

function isLink() {
  // Regular expression to match a URL pattern
  if (
    !/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}([\/\w.-]*)*\/?$/.test(
      inputElement.value
    )
  ) {
    return { valid: false, error: "please add a Link" };
  } else {
    return { valid: true };
  }
}

function addInputError() {
  spanErrorInputElement.innerHTML = validLink.error;
  inputElement.classList.add("error");
}

function removeInputError() {
  spanErrorInputElement.innerHTML = "";
  inputElement.classList.remove("error");
}

// click button
shortenButtonElement.onclick = function (event) {
  event.preventDefault();
  const validLink = isLink();
  if (validLink.valid == true) {
    removeInputError();
    addUrlToPage(createUrlToDatabase(inputElement.value));
    setUrlToLocalStorage();
    // Clear the content inside the input field
    inputElement.value = "";
    console.log(database);
  } else {
    spanErrorInputElement.innerHTML = validLink.error;
    inputElement.classList.add("error");
  }
};

function addUrlToPage(url) {
  const div_Links = document.createElement("div");
  const short_url = document.createElement("div");
  const p_short = document.createElement("p");
  const p_long = document.createElement("p");

  p_long.classList.add("long-link");
  p_long.innerHTML = url.long_url;
  div_Links.classList.add("Links");
  short_url.classList.add("short-link");
  short_url.appendChild(p_short);
  short_url.appendChild(copy(p_short));
  p_short.innerHTML = url.short_url;
  div_Links.appendChild(p_long);
  div_Links.appendChild(short_url);
  document.querySelector(".js").appendChild(div_Links);
}

function copy(p_short) {
  const button = document.createElement("button");
  button.innerHTML = "Copy";
  button.classList.add("copyButton");

  button.onclick = function (e) {
    copyTextToClipboard(p_short);
    console.log("ook");
  };

  return button;
}

function copyTextToClipboard(selector) {
  const textElement = selector;
  if (textElement) {
    // Select the text to be copied
    const textToCopy = textElement.textContent;
    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.setAttribute("value", textToCopy);
    document.body.appendChild(tempInput);
    // Select the text inside the temporary input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); /* For mobile devices */
    // Copy the selected text
    document.execCommand("copy");
    // Remove the temporary input element
    document.body.removeChild(tempInput);
    // Provide feedback to the user
  } else {
    console.error("Element not found with selector:", selector);
  }
}

navIconElement.onclick = function (e) {
  navBarElement.classList.toggle("block");
};
