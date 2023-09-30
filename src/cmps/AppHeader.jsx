import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from "react"
import { SET_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { MyForm } from './MyForm.jsx'

export function AppHeader() {
    const dispatch = useDispatch()
    const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)
    return (
        <header className="app-header">


            <div className='main-nav'>
                <nav>
                    <NavLink className="custom-nav-link" to="/">Home</NavLink>
                    <NavLink className="custom-nav-link" to="/toy">Toys</NavLink>
                    <NavLink className="custom-nav-link" to="/about">About</NavLink>
                </nav>
                <MyForm />
            </div>
            
            <h1>Cute <span>Toys </span>for <br></br><span>Cute</span> Kids</h1>
            <p>Buy all kinds of intellectual games, toys, puzzles <br></br>in our online store and give
                your child the<br></br> pleasure of love & entertainment.</p>
            <button className='order-now'>Order Now</button>

        </header>
    )
}