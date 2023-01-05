var dataContainer = [];
var links = document.querySelectorAll("#demo");
var layer = document.querySelector(".layer");
var closeBtn = document.querySelector(".fa-times");
var imgLayer = document.querySelector(".layer-container .container img");
var searchInput = document.getElementById("searchInput");
var radioBtn = document.getElementsByName("exampleRadios");
var categoryItem;
var globalCountry;
function getData(category) {
  var req = new XMLHttpRequest();
  req.open(
    "GET",
    ` https://newsapi.org/v2/top-headlines?country=us&category=${category.toLowerCase()}&apiKey=d24728fe817d4eb6b3721e8e7af53a76`
  );
  req.send();
  req.addEventListener("readystatechange", () => {
    if (req.readyState == 4) {
      dataContainer = JSON.parse(req.response).articles;
      console.log(dataContainer);
      display();
    }
  });
}
function display() {
  var box = ``;
  for (var i = 0; i < dataContainer.length; i++) {
    if (dataContainer[i].title && dataContainer[i].description) {
      box += `<div class="col-md-6 col-lg-4">
        <div class="item px-5 p-md-0 clearfix position-relative" id="imgContent">
            <div class="item-container" >
                <img src="${
                  dataContainer[i].urlToImage
                }" class="w-100" height="275" onclick="disLayer(${i})"  alt="">
                <h5 class="bolder">${dataContainer[i].title
                  .split(" ")
                  .splice(0, 7)
                  .join(" ")}</h5>
                <p class="text-muted fs-6">${dataContainer[i].description
                  .split(" ")
                  .splice(0, 7)
                  .join(" ")}</p>
                <p >${dataContainer[i].publishedAt}</p>
                <p class="h6 bold">${dataContainer[i].source.name}</p>
            </div>
                    <a href="${
                      dataContainer[i].url
                    }" class="btn btn-info text-light float-end position-absolute bottom-0 end-0">See more</a>
            </div>
        </div>`;
    }
  }

  document.getElementById("row").innerHTML = box;
}

getData("general");
closeBtn.addEventListener("click", function () {
  layer.classList.add("d-none");
});
for (var index = 0; index < links.length; index++) {
  links[index].addEventListener("click", function (e) {
    for (var i = 0; i < links.length; i++) {
      links[i].classList.remove("active");
    }
    this.classList.add("active");
    categoryItem = e.target.innerHTML;
    getData(categoryItem);
    console.log(categoryItem);
  });
}

searchInput.addEventListener("keyup", function (e) {
  var box = ``;
  for (var i = 0; i < dataContainer.length; i++) {
    if (
      dataContainer[i].title
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      if (dataContainer[i].title && dataContainer[i].description) {
        box += `<div class="col-md-4">
                <div class="item px-5 p-md-0 clearfix position-relative">
                    <div class="item-container">
                        <img src="${
                          dataContainer[i].urlToImage
                        }" onclick="disLayer(${i})" class="w-100" height="275" alt="">
                        <h5 class="bolder">${dataContainer[i].title
                          .split(" ")
                          .splice(0, 7)
                          .join(" ")}</h5>
                        <p class="text-muted fs-6">${dataContainer[
                          i
                        ].description
                          .split(" ")
                          .splice(0, 7)
                          .join(" ")}</p>
                        <p >${dataContainer[i].publishedAt}</p>
                        <p class="h6 bold">${dataContainer[i].source.name}</p>
                    </div>
                            <a href="${
                              dataContainer[i].url
                            }" class="btn btn-info text-light float-end position-absolute bottom-0 end-0">See more</a>
                    </div>
                </div>`;
      }
    }
    document.getElementById("row").innerHTML = box;
  }
});
function disLayer(index) {
  layer.classList.remove("d-none");
  var newImg = dataContainer[index].urlToImage;
  imgLayer.setAttribute("src", newImg);
  var box = `
<p class="my-3 h5 bolder">${dataContainer[index].title}</p>
<p >${dataContainer[index].publishedAt}</p>
<p class="h6 bold"><span>Published at: </span>${dataContainer[index].source.name}</p>
<p class="text-muted">${dataContainer[index].content}</p>
<a href="${dataContainer[index].url}" class="btn btn-info text-light position-absolute bottom-0 end-0">See Ful New From ${dataContainer[index].source.name}</a>
`;
  document.getElementById("imgCont").innerHTML = box;
}
