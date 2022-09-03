const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const response = await fetch(url);
    const data = await response.json();
    displayCategories(data.data.news_category);
}

const displayCategories = categories => {

    categories.forEach(category => {
        console.log(category);

        const ul = document.getElementById('categoryList');
        const li = document.createElement('li');
        ul.classList.add('no-bullets');
        li.innerHTML = `
        <button class="btn btn-outline-dark border-0"><li class="list-group-item border-0">${category.category_name}</li></button>
        `;
        ul.appendChild(li);
    });
}

loadCategories();