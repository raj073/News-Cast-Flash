const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const response = await fetch(url);
    const data = await response.json();
    displayCategories(data.data.news_category);

}


const displayCategories = categories => {

    categories.forEach(category => {
        // console.log(category);

        const ul = document.getElementById('categoryList');
        const li = document.createElement('li');
        ul.classList.add('no-bullets');
        li.innerHTML = `
        <button onclick="singleCategoryDetails('${category.category_id}','${category.category_name}')" class="btn btn-outline-dark border-0"><li class="list-group-item border-0">${category.category_name}</li></button>
        `;
        ul.appendChild(li);
    });
}
loadCategories();

const singleCategoryDetails = (category_id, category_name) => {

    let categoryIdString = category_id.toString();
    if (categoryIdString.length < 2) {
        categoryIdString = "0" + category_id_in_string;
    }

    fetch(`https://openapi.programming-hero.com/api/news/category/${categoryIdString}`)
        .then(response => response.json())
        .then(data => displaySingleCategoryItemCount(data.data, category_name))
}

const displaySingleCategoryItemCount = (data, category_name) => {
    //console.log(data);
    const singleCategoriesTotalItemCount = document.getElementById('singleCategoriesTotalItemCount');
    singleCategoriesTotalItemCount.innerHTML = `
       <p class="p-3 text-black-75"> Total <span class="fw-semibold text-black"> ${data.length} </span> news found for category <span class="fw-semibold fst-italic text-black"> ${category_name}</span></p>
    `;
    displaySingleCategoryNewsDetails(data);
}

const displaySingleCategoryNewsDetails = (categoryWiseNews) => {

    const categoryWiseNewsContainer = document.getElementById('categoryWiseNewsContainer');
    categoryWiseNewsContainer.innerHTML = ``;
    categoryWiseNews.forEach(news => {
        console.log(news);
        const div = document.createElement('div');
        div.classList.add('col');
        const date = news.author.published_date.split(" ")[0]
        let dateFormat = new Date(date);
        div.innerHTML = `
        
          <div class="border rounded d-flex justify-content-between flex-column flex-lg-row bg-white shadow border-0">
            <div class="col-lg-3 text-center text-lg-start">
                    <img src="${news.thumbnail_url}" class="h-100 w-75 w-md-50 w-lg-100 p-0 p-md-5p-lg-0" alt="related picture of a news">
            </div>

            <div class="col-lg-9 ps-2 pe-4 d-flex align-items-center mt-3 p-3">
                <div>
                    <h5>${news.title}</h5>
                    <small>${news.details}</small>
                    <div class="d-flex flex-row justify-content-between align-items-center mt-3">
                        <!-- author part-->
                        <div class= "d-flex flex-row justify-content-between align-items-center">
                            <!-- image part-->
                            <img style="width:40px; height:40px; border-radius:30px" src="${news.author.img}" class="me-1" alt="picture of the author">

                            <div class="mt-3">
                                <small class="ps-2 p-0 fs-6"> ${getTotalInfo(news.author.name, 'Author name')} </small>
                                <p><small class="ps-2 p-0 m-0 fs-6 text-muted">${getTotalInfo(date, 'Date')}</small></p>
                            </div>
                        </div>

                        <div class="pe-3">
                            <i class="fa-solid fa-eye"></i> <small class="ps-2">${getTotalInfo(news.total_view, 'View info')}</small>
                        </div>

                        <div class="me-5 text-primary fw-semibold">
                            <button type="button" class="btn btn-primary">Show Details <i class="fa-solid fa-angles-right "></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        `;
        categoryWiseNewsContainer.appendChild(div);
    });
}

const getTotalInfo = (value, valueTypeName) => value ? value : valueTypeName + ' Item not found';
