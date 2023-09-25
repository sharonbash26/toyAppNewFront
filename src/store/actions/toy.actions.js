import { toyService } from "../../services/toys.service"
import { ADD_TOY, TOY_UNDO, REMOVE_TOY, SET_TOYS, SET_IS_LOADING, UPDATE_TOY } from "../reducers/toy.reducer.js";
import { store } from "../store.js";



export function loadToys() {
    const { filterBy} = store.getState().toyModule
    const { sort} = store.getState().toyModule
    

    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy,sort)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    return toyService.remove(toyId)
        .catch(err => {
            store.dispatch({ type: TOY_UNDO })
            console.log('TOY action -> Cannot remove TOY', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy.id ? UPDATE_TOY : ADD_TOY
    console.log('toy',toy)
    return toyService.save(toy)
        .then(toyToSave => {
            store.dispatch({ type, toy: toyToSave })
            console.log('toyTosVEE',toyToSave)
            return toyToSave
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}

export function inStock(toy){
    let inStock=toy.inStock?"In Stock":"Not in Stock"
    return inStock
}