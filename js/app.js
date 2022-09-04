const loadCategories = async () => {
    document.getElementById('error-message-pgraph').style.display = 'none';
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => displayErrorMessage())
    // const response = await fetch(url);
    // const data = await response.json();
    // displayCategories(data.data.news_category);

}
const displayErrorMessage = (error) => {
    const errorMessagePgraph = document.getElementById('error-message-pgraph');
    errorMessagePgraph.style.display = 'block';
    alert(error);
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

    toggleSpinner(true);
    document.getElementById('error-message-pgraph').style.display = 'none';
    let categoryIdString = category_id.toString();
    if (categoryIdString.length < 1) {
        categoryIdString = "0" + category_id_in_string;
    }

    fetch(`https://openapi.programming-hero.com/api/news/category/${categoryIdString}`)
        .then(response => response.json())
        .then(data => displaySingleCategoryItemCount(data.data, category_name))
        .catch(error => displayErrorMessage())

    // const sortedResponse = news.total_view.sort(function (a, b) { return parseInt(a.news.total_view) - parseInt(b.news.total_view) });
    // console.log(sortedResponse)
}

const displaySingleCategoryItemCount = (data, category_name) => {
    //console.log(data);
    const singleCategoriesTotalItemCount = document.getElementById('singleCategoriesTotalItemCount');
    singleCategoriesTotalItemCount.innerHTML = `
       <p class="p-3 text-black-75"> Total <span class="fw-semibold text-black"> ${data.length} </span> news found for category <span class="fw-semibold fst-italic text-black"> ${category_name}</span></p>
    `;
    displaySingleCategoryNewsDetails(data);
    toggleSpinner(false);
}

const displaySingleCategoryNewsDetails = (categoryWiseNews) => {

    const categoryWiseNewsContainer = document.getElementById('categoryWiseNewsContainer');

    // Sorting News order by View
    categoryWiseNews.sort(function (a, b) {
        return b.total_view - a.total_view;
    });

    categoryWiseNewsContainer.innerHTML = ``;
    categoryWiseNews.forEach(news => {
        console.log(news);

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        
          <div class="border rounded d-flex justify-content-between flex-column flex-lg-row bg-white shadow border-0">
            <div class="col-lg-3 text-center text-lg-start">
                    <img src="${news.thumbnail_url}" class="h-100 w-75 w-md-50 w-lg-100 p-0 p-md-5p-lg-0" alt="related picture of a news">
            </div>

            <div class="col-lg-9 ps-2 pe-4 d-flex align-items-center mt-3 p-3">
                <div>
                    <h5>${news.title ? news.title : 'No Title Found'}</h5>
                    <small>${news.details ? news.details.slice(0, 300) + '...' : 'No Details Found'}</small>
                    <div class="d-flex flex-row justify-content-between align-items-center mt-3">
                        <!-- author part-->
                        <div class= "d-flex flex-row justify-content-between align-items-center">
                            <!-- image part-->
                            <img style="width:40px; height:40px; border-radius:30px" src="${news.author.img ? news.author.img : 'No Image'}" class="me-1" alt="picture of the author">

                            <div class="mt-3">
                                <small class="ps-2 p-0 fs-6"> ${news.author.name ? news.author.name : 'No Author Name Found'} </small>
                                <p><small class="ps-2 p-0 m-0 fs-6 text-muted">${news.author.published_date ? news.author.published_date.slice(0, 10) : 'No Date Found'}</small></p>
                            </div>
                        </div>

                        <div class="pe-3">
                            <i class="fa-solid fa-eye"></i> <small class="ps-2">${news.total_view ? news.total_view : 'No View'}</small>
                        </div>

                        <div class="me-5 text-primary fw-semibold">
                            <button onclick="loadSingleNewsOpenModal('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target = "#singleNewsModal">Show Details <i class="fa-solid fa-angles-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        `;
        categoryWiseNewsContainer.appendChild(div);

        //Stop ToggleSpinner
        toggleSpinner(false);
    });
}


const toggleSpinner = isLoading => {
    const newsLoader = document.getElementById('newsLoader');
    if (isLoading === true) {
        newsLoader.classList.remove('d-none');
    }
    else {
        newsLoader.classList.add('d-none');
    }
}

const loadSingleNewsOpenModal = (news_id) => {

    document.getElementById('error-message-pgraph').style.display = 'none';

    fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
        .then(response => response.json())
        .then(data => displaySingleNewsOpenModal(data.data[0]))
        .catch(error => displayErrorMessage())
}

displaySingleNewsOpenModal = (newsId) => {
    console.log(newsId);
    const newsDetails = document.getElementById('news-details');

    newsDetails.innerHTML = `
            <div class = "justify-content-center align-items-center">
                <a href=""><img id="profile-picture" src="${newsId.thumbnail_url}" alt="profile-picture"></a>
            </div>
    <p>News Title: ${newsId.title ? newsId.title : 'No Title Found'}</p>
    <p>Author Name: ${newsId.author.name ? newsId.author.name : 'No Author Name Found'}</p>
    <p>Rating: ${newsId.rating.number ? newsId.rating.number : 'No Rating Found'}</p>
    <p>Badge: ${newsId.rating.badge ? newsId.rating.badge : 'No Badge Found'}</p>
    <p>Total View: ${newsId.total_view ? newsId.total_view : 'No Total View Found'}</p>
    
    `;
}