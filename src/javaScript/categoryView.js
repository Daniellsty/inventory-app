import Storage from './Storage.js'
let categoryTitle = document.getElementById('category-title')
const categoryButton = document.getElementById('add-new-category')
let categoryDiscription = document.getElementById('category-description')
const categorieList = document.getElementById('product-category')
 class CategoryView{
    constructor(){

        categoryButton.addEventListener('click',(e)=>  this.addNewCategory(e))
        this.category = []
    }

    addNewCategory(e){
        e.preventDefault()
        const categoryTitleValue = categoryTitle.value
        const categoryDiscriptionValue = categoryDiscription.value
        
        if(categoryTitleValue === '' || categoryDiscriptionValue === '' ) return

        Storage.categoryToSave({title:categoryTitleValue,description:categoryDiscriptionValue})
        this.category = Storage.getAllCategory()

        this.createCategoryElement(this.category)
        categoryTitle.value='';
        categoryDiscription.value='';
    }

    setApp(){

        this.category = Storage.getAllCategory()

    }

    createCategoryElement(category){

        let result = '<option value=""> select a category ... </option>'
         category.map((item)=>{


        return result +=   `<option value=${item.id}> ${item.title} </option>`
        })

        categorieList.innerHTML = result
        
    }

    

}


export default new CategoryView()