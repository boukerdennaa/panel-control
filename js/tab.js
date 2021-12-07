export const tab = () =>{

let tabs = document.querySelector(".wrapper");
let tabButton = document.querySelectorAll(".tab-button");
let contents = document.querySelectorAll(".content");

tabs.onclick = e => {

  e.preventDefault();

  const id = e.target.dataset.id;
  if (id) {
    tabButton.forEach(btn => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");

    contents.forEach(content => {
      content.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
}
}
