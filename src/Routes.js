import React from 'react'
import {BrowserRouter, Route} from "react-router-dom"

import Menu from './Menu'
import Tabuleiro from './Tabuleiro'

function Routes(){
	return(
		<BrowserRouter>
			<Route exact path="/" component={Menu} />
			<Route path='/play/:boardsize/:bombsize' component={Tabuleiro} />
		</BrowserRouter>
	)
}

export default Routes;