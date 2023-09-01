
import ProductView from "./ProductView.js"
import CategoryView from "./CategoryView.js"
import Storage from "./Storage.js"
const numOfProducts = document.getElementById('num-products')

document.addEventListener('DOMContentLoaded',(e)=>{
  
    
    CategoryView.setApp()
    CategoryView.createCategoryElement(CategoryView.category)

    ProductView.setApp()
    ProductView.addNewProductElement(Storage.getAllProduct())

    numOfProducts.innerHTML = Storage.getAllProduct().length


})
