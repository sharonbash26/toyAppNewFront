import { utilService } from "./util.service"
import { asyncStorageService } from "./async-storage.service"
import { httpService } from "./http.service"
import { userService } from "./user.service"

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'

// var toys = _createToys()

 const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    get,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getLabels
}

function query(filterBy = {},sort) {
    // return asyncStorageService.query(STORAGE_KEY).then(toys => {
    //     console.log('toys',toys)
    //     console.log('filterby',filterBy)
    //     if(filterBy.name){
    //         const regExp=new RegExp(filterBy.name,'i')
    //         toys=toys.filter(toy=>regExp.test(toy.name)) 
    //     }
    //     // if ('inStock' in filterBy && filterBy.inStock !== "") {  
    //     //     toys = toys.filter(toy => toy.inStock === filterBy.inStock);
    //     // }

    //     return toys
    // })
    console.log('filterby',filterBy)
    console.log('sort',sort)
    return httpService.get(BASE_URL, {
        filterBy,
        sort
    })

}

function get(toyId) {
    // return asyncStorageService.get(STORAGE_KEY, toyId)
    return httpService.get(BASE_URL + toyId)

}
function remove(toyId) {
    // return asyncStorageService.remove(STORAGE_KEY, toyId)
    return httpService.delete(BASE_URL + toyId)

}

function save(toy) {
    console.log('save from servies', toy)
    //     if (toy._id) {
    //         return asyncStorageService.put(STORAGE_KEY, toy)
    //     } else {
    //         return asyncStorageService.post(STORAGE_KEY, toy)
    //     }
    if (toy.id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

// function _createToys() {
//     console.log('start create toys')
//     let toys = utilService.loadFromStorage(STORAGE_KEY)
//     if (!toys || !toys.length) {
//         toys = [{
//             _id: utilService.makeId(),
//             name: 'Talking Doll',
//             price: 123,
//             labels: ['Doll', 'Battery Powered', 'Baby'],
//             createdAt: 1631031801011,
//             inStock: true
//         },
//         {
//             _id: utilService.makeId(),
//             name: 'Robot',
//             price: 250,
//             labels: ['Battery Powered'],
//             createdAt: 1631031801022,
//             inStock: true
//         }, {
//             _id: utilService.makeId(),
//             name: 'Dog Toy',
//             price: 50,
//             labels: ['Doll', 'Battery Powered', 'Baby'],
//             createdAt: 1631031702011,
//             inStock: false
//         }

//         ]
//     }
//     utilService.saveToStorage(STORAGE_KEY, toys)
//     console.log('all toysss', toys)
//     return toys
// }

function getEmptyToy() {
    return {
        name: 'Doll',
        price: utilService.getRandomIntInclusive(1000, 9000),
        labels:['Box Game','Art'],
        inStock:true
    }
}
function getDefaultFilter() {
    return { name: '', inStock: '' }
}

function getLabels(){
    return labels
}

function getDefaultSort() {
    return {
        by: 'name',
        asc: true
    }
}