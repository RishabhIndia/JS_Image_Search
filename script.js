const btn = document.querySelector("#search-btn");
const input = document.querySelector("input");
let viewmore = document.querySelector(".viewbtn");
let currentPage = 1; // Track the current page number

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let text = input.value;
  currentPage = 1; // Reset current page when a new search is performed
  searchImage(text, currentPage);
});

function searchImage(text, page) {
  fetch(
    `https://api.unsplash.com/search/photos?client_id=66MGlspZ4wrX1sRO-SqBAH857uVdyzTHWnwCuOUtZIE&query=${text}&page=${page}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let main = document.querySelector(".image-container");
      if (page === 1) {
        main.innerHTML = ""; // Clear previous results if it's the first page
      }
      data.results.forEach((item) => {
        let imgdiv = document.createElement("div");
        let img = document.createElement("img");
        img.src = item.urls.thumb;
        let p = document.createElement("p");
        p.innerText = item.alt_description;
        imgdiv.append(img, p);
        main.append(imgdiv);
      });
    })
    .catch((error) => console.error(error));
}

viewmore.addEventListener("click", () => {
  let text = input.value;
  currentPage++; // Increment current page when "View More" is clicked
  searchImage(text, currentPage);
});
