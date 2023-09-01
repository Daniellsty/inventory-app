let title = document.getElementById("product-title");
let quantity = document.getElementById("product-quantity");
let category = document.getElementById("product-category");
const productList = document.getElementById('products-list');
const sortProducts= document.getElementById('sort-products');
const searchInput  = document.getElementById('search-input');
const numOfProducts = document.getElementById('num-products')

import Storage from "./Storage.js";
class ProductView {
  constructor() {
      sortProducts.addEventListener('change',(e)=> this.sortProductsHandler(e) )
      searchInput.addEventListener('input',(e)=> this.searchProductsHandler(e) )
      this.addNewProductBtn =  document.getElementById("add-new-product").addEventListener('click',(e)=> this.addNewProduct(e))
      this.product = [] ;
 
     
  }

  addNewProduct(e) {
    e.preventDefault();

    const titleProduct = title.value;
    const quantityProduct = quantity.value;
    const categoryProduct = category.value;


    if (titleProduct=== '' || quantityProduct=== '' || categoryProduct=== '') return

    Storage.productToSave({
      title: titleProduct,
      quantity: quantityProduct,
      category: categoryProduct,
    });
    this.product = Storage.getAllProduct();

    this.addNewProductElement(this.product);
    
    console.log(Storage.getAllProduct());
    numOfProducts.innerHTML = Storage.getAllProduct().length

    title.value =''
    quantity.value =''
    category.value =''

  }

  setApp() {
    Storage.getAllProduct();
  }

  deleteHandler(id){


    Storage.deleteProduct(id)

    this.product = Storage.getAllProduct();
    this.addNewProductElement(this.product);


    numOfProducts.innerHTML = Storage.getAllProduct().length


  }

  addNewProductElement(products) {
    
    let result = "";
   
    products.forEach((item) => {
      const selectedCategory = Storage.getAllCategory().find((c) =>{
      return parseInt(item.category) === c.id 
      });
    
      result += `<div class="flex items-center justify-between mb-2 w-full min-w-[400px]">
      <span class="text-slate-400">${item.title}</span>
      <div class="flex items-center gap-x-3">
        <span class="text-slate-400">${new Date().toLocaleDateString(
          "fa-IR"
        )}</span>
        <span class="block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm rounded-2xl">${
          selectedCategory.title
        }</span>
        <span
          class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 border-2 border-slate-300 text-slate-300">${
            item.quantity
          }</span>
        <button  class="delete-product border px-2 py-o.5 rounded-2xl border-red-400 text-red-400 " 
        data-product-id=${item.id}>delete</button>
      </div>
    </div>`;

    });   

    productList.innerHTML = result


    const deleteBtn =[...document.querySelectorAll('.delete-product')]

   deleteBtn.forEach((item)=>{
    item.addEventListener('click',(e)=>{

        this.deleteHandler(item.getAttribute('data-product-id'))
    });
   });

  }

  sortProductsHandler(e) {

    const value = e.target.value;
   
    this.product = Storage.getAllProduct(value);
    this.addNewProductElement(this.product);
  
  }

  searchProductsHandler(e){

    const value =e.target.value.trim().toLowerCase()
    
    const filteredProducts = this.product.filter((item)=>{
       return item.title.toLowerCase().includes(value)
    })
    
    this.addNewProductElement(filteredProducts)
    this.product= Storage.getAllProduct()
  }

 

}

export default new ProductView();
