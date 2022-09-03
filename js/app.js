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
}



