var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productDescription = document.getElementById('productDescription');
var productCategory = document.getElementById('productCategory');
var productContainer = [];
var tableBody = document.getElementById('tableBody');
var curIndex;
var addBtn = document.getElementById('addBtn');

// DISPLAY ITEMS IN LOCAL STORAGE
if (localStorage.getItem('allProducts') != null){
    productContainer = JSON.parse(localStorage.getItem("allProducts"));
    displayProduct(productContainer);
}

function clear(){
    productName.value = "";
    productPrice.value = "";
    productDescription.value = "";
    productCategory.value = "";
}

function displayProduct(arrayContainer){
    var box = ``;
    for (var i = 0; i < arrayContainer.length; i++) {
        box += `<tr>
                        <td>${i+1}</td>
                        <td>${arrayContainer[i].name}</td>
                        <td>${arrayContainer[i].price}</td>
                        <td>${arrayContainer[i].category}</td>
                        <td>${arrayContainer[i].description}</td>
                        <td><button class="btn btn-warning" onclick="getObj(${i});">Update</button><button class="btn btn-danger ms-2" onclick="deleteProduct(${i})">Delete</button></td>
                    </tr>`;
    }
    tableBody.innerHTML = box;
}


function actionOnBtn(){
    if (addBtn.innerHTML=="Add product" && productPriceRegx() && productNameRegx()
        && productCategoryRegx() && productDescriptionRegx()){
        addProduct();
    }else if (addBtn.innerHTML!="Add product" && productPriceRegx() && productNameRegx()
        && productCategoryRegx() && productDescriptionRegx()){
        updateProduct();
    }
}



function addProduct() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value,
        category: productCategory.value,
    }
    productContainer.push(product);
    localStorage.setItem("allProducts", JSON.stringify(productContainer));
    clear();
    displayProduct(productContainer);

}

function deleteProduct(index) {
    productContainer.splice(index, 1);
    localStorage.setItem('allProducts', JSON.stringify(productContainer));
    displayProduct(productContainer);
}

function deleteAllProducts(){
    localStorage.removeItem("allProducts");
    productContainer = [];
    displayProduct(productContainer);
}

function searchProducts(term){
    var filteredProducts = [];
    for (var i = 0; i < productContainer.length; i++){
        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            filteredProducts.push(productContainer[i]);
        }
    }
    displayProduct(filteredProducts);
}

function getObj(index){
    curIndex = index;
    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productDescription.value = productContainer[index].description;
    productCategory.value = productContainer[index].category;
    addBtn.innerHTML = 'Update Product'
}

function updateProduct(){
    var product = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value,
        category: productCategory.value,
    }
    productContainer[curIndex] = product;
    localStorage.setItem("allProducts", JSON.stringify(productContainer));
    displayProduct(productContainer);
    clear();
    addBtn.innerHTML = 'Add product';
}

function productNameRegx (){
    var regx = /^[A-z]{2,}.{1,}$/;
    if (regx.test(productName.value)){
        productName.classList.remove('is-invalid');
        productName.classList.add('is-valid');
        return true;
    }else{
        productName.classList.add('is-invalid');
        productName.classList.remove('is-valid');
        return false;
    }
}

function productPriceRegx (){
    var regx = /^[1-9][0-9]{0,}$/;
    if (regx.test(productPrice.value)){
        productPrice.classList.remove('is-invalid');
        productPrice.classList.add('is-valid');
        return true;
    }else {
        productPrice.classList.remove('is-valid');
        productPrice.classList.add('is-invalid');
        return false;
    }
}

function productCategoryRegx (){
    var regx = /^[A-z]{2,}.{0,}$/;
    if (regx.test(productCategory.value)){
        productCategory.classList.remove('is-invalid');
        productCategory.classList.add('is-valid');
        return true;
    }else{
        productCategory.classList.remove('is-valid');
        productCategory.classList.add('is-invalid');
        return false;
    }
}

function productDescriptionRegx(){
    var regx = /^.{3,}$/;
    if (regx.test(productDescription.value)){
        productDescription.classList.add('is-valid');
        productDescription.classList.remove('is-invalid');
        return true;
    }else {
        productDescription.classList.add('is-invalid');
        productDescription.classList.remove('is-valid');
        return false;
    }
}











