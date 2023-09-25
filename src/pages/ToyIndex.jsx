import { useDispatch, useSelector } from 'react-redux'
import { ToyList } from '../cmps/ToyList'
import { ToyFilter } from '../cmps/ToyFilter'
import { toyService } from '../services/toys.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy } from '../store/actions/toy.actions'
import { ADD_TOY_TO_CART, SET_FILTER_BY, ADD_TOY, SET_SORT } from '../store/reducers/toy.reducer.js'
import { useEffect, useState } from 'react'
import { ToySort } from '../cmps/ToySort'
import { store } from '../store/store'
import { MyForm } from '../cmps/MyForm'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import Dictaphone from '../cmps/Dictaphone'

export function ToyIndex() {
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    const bindEmoji1 = useDrag(({ down, movement: [mx, my] }) => {
        api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
    });
    const bindEmoji2 = useDrag(({ down, movement: [mx, my] }) => {
        api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
    });
    const bindEmoji3 = useDrag(({ down, movement: [mx, my] }) => {
        api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
    });


    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const sort = useSelector(storeState => storeState.toyModule.sort)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const [recording, setRecording] = useState('')
    // const [sort,setSort]=useState(toyService.getDefaultSort())


    useEffect(() => {
        loadToys(filterBy, sort)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy, sort])

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
    function onSetSort(sort) {
        dispatch({ type: SET_SORT, sort })
    }

    return (<DndProvider backend={HTML5Backend}>


        <section className="toyIndex">
            <h3>Toys Shop</h3>
            <animated.div {...bindEmoji1()} style={{ x, y }} className="emoji">😃</animated.div>
            <animated.div {...bindEmoji2()} style={{ x, y }} className="emoji">👽</animated.div>
            <animated.div {...bindEmoji3()} style={{ x, y }} className="emoji">😈</animated.div>
            <Dictaphone setRecording={setRecording} />
            <MyForm />
            <main>
                <button onClick={onAddToy}>Add Toy ⛐</button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} recording={recording}/>
                <ToySort sort={sort} onSetSort={onSetSort} />

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



    </DndProvider>

    )
}
///UPDATEE UPDATEEE !!!!!