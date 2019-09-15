import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Menu.css'

function Menu () {
	const [bombs, setBombs] = useState([])
	const [boardSize, setBoardSize] = useState(16)
	const [bombSize, setBombSize] = useState(5)


	//QNT DE BOMBAS DE 5 EM 5 PARA OPÇÕES DE ACORDO
	//COM O SIZE ESCOLHIDO
	useEffect(() =>{
		const bombRefresh = () =>{
			let arrayBombs = []
			for(let i = 5; i < boardSize; i += 5){
				if (i < boardSize){
					arrayBombs.push(i) 
				}
			}
			setBombs(arrayBombs)
		}

		bombRefresh()
	}, [boardSize])



	
	return(
		<div className="container-menu">
			<div className="container-select">
				<label>Tamanho do Tabuleiro:
					<select onChange={(e) => {
						setBoardSize(e.target.value)
					}}>
						<option key={'op1'} value='16'>16</option>
						<option key={'op2'} value='36'>36</option>
						<option key={'op3'} value='64'>64</option>
						<option key={'op4'} value='100'>100</option>
					</select>
				</label>

				<label>Quantidade de Bombas:
					<select onChange={(e) => {setBombSize(e.target.value)}}>
						{
							bombs.map((x, ind) => 
								<option key={`bomb-${ind}`} value={x}>{x}</option>
							)
						}
					</select>
				</label>
			</div>

			<div className="botao-menu">
				<Link to={`/play/${boardSize}/${bombSize}`}>
					<button>INICIAR</button>
				</Link>
			</div>

		</div>
	)

}

export default Menu