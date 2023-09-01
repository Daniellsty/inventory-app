export default class Storage{

   

    static getAllCategory(){
 
     const localStorageCategory = JSON.parse(localStorage.getItem('category')) || []
     
     const savedCategory = localStorageCategory.sort((a,b)=>{
         return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
     })
 
     return savedCategory;
 
     }
 
 
     static categoryToSave(category){
 
         const savedCategory = Storage.getAllCategory()
 
         
         category.id = new Date().getTime()
         category.createdAt = new Date().toISOString()
         
         savedCategory.push(category)
         
         
         
         localStorage.setItem('category',JSON.stringify(savedCategory))
     }
 
 
     static getAllProduct(sort = "newest"){
 
         const localStorageProduct = JSON.parse(localStorage.getItem('product')) || []
         
         const savedProduct = localStorageProduct.sort((a,b)=>{
           
             if (sort === "newest") {
                 return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
               } else if (sort === "oldest") {
                 return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
               }
         })
 
     
         return savedProduct;
     
         }
 
         static productToSave(product){
 
             const savedProduct = Storage.getAllProduct()
     
             
             product.id = new Date().getTime()
             product.createdAt = new Date().toISOString()
             
             savedProduct.push(product)
             localStorage.setItem('product',JSON.stringify(savedProduct))
 
             
         }
 
         static deleteProduct(id){
 
             const savedProdocuts = Storage.getAllProduct();
             const filteredProducts = savedProdocuts.filter((p) => p.id !== parseInt(id));
             localStorage.setItem("product", JSON.stringify(filteredProducts));
 
         }
     
 
 
 
 }
 
 new Storage()