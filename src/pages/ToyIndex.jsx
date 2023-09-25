import { useDispatch, useSelector } from 'react-redux'
import { ToyList } from '../cmps/ToyList'
import { ToyFilter } from '../cmps/ToyFilter'
import { toyService } from '../services/toys.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy } from '../store/actions/toy.actions'
import { ADD_TOY_TO_CART, SET_FILTER_BY, ADD_TOY,SET_SORT } from '../store/reducers/toy.reducer.js'
import { useEffect, useState } from 'react'
import { ToySort } from '../cmps/ToySort'
import { store } from '../store/store'
// import Dictaphone from '../cmps/Dictaphone'

export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const sort=useSelector(storeState=>storeState.toyModule.sort)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    // const [sort,setSort]=useState(toyService.getDefaultSort())


    useEffect(() => {
        loadToys(filterBy,sort)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy,sort])

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove ')
            })
    }
    // function onSetSort(sort) {
    //     setSort(sort)
    // }
    
    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        if (target.type === 'checkbox') value = target.checked
        if (target.type === 'select-multiple') value = Array.from(target.selectedOptions, (option) => option.value)
        setFilterBy({ ...filterBy, [field]: value })
    }
    
    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        saveToy(toyToSave)
            .then(savedToy => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                console.log('Cannot add toy', err)
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?', toy.price)
        console.log('new price', price)
        const toyToSave = { ...toy, price }
        console.log('toyToSave', toyToSave)
        saveToy(toyToSave)
            .then(savedToy => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                console.log('Cannot update toy', err)
                showErrorMsg('Cannot update toy')
            })
    }

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }
    function onSetSort(sort){
        dispatch({type:SET_SORT,sort})
    }

    return (
        <section className="toyIndex">
            <h3>Toys Shop</h3>
            {/* <Dictaphone /> */}
            <main>
                <button onClick={onAddToy}>Add Toy ⛐</button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <ToySort sort={sort} onSetSort={onSetSort}/>

                {!isLoading && <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                    onEditToy={onEditToy}
                // addToCart={addToCart}
                />
                }

                {isLoading && <div>Loading...</div>}
                <hr />
            </main>
        </section>
    )
}
///UPDATEE UPDATEEE !!!!!