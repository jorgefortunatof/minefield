import React, {useState, useEffect}  from 'react'
import {Link} from 'react-router-dom'
import './tabuleiro.css';

//Props = wasClicked | onClick | id | value
function Square (props){
	const clicked = props.wasClicked(props.value)

	return(
		<button 
					disabled={clicked ? 'disabled': ''}
					className={`square ${clicked ? 'clicked': ''} ${props.value === 'X'? 'bomb': ''}
					${props.value >= 0 ? ' color-'+props.value: ''}
					`}
					onClick={() => {props.onClick(props.id)}}>

					{props.value != null? props.value: ''}

		</button>
	);
}


function Tabuleiro ({match}){
	const boardSize = match.params.boardsize
	const bombSize = match.params.bombsize

	const [tabuleiro, setTabuleiro] = 
	useState(Array(Number(boardSize)).fill(null))
	const [bombs, setBombs] = useState([])
	const [over, setOver] = useState(false)

	//EFECT TABULEIRO AO INICIALIZAR
	useEffect(() => {
		generateBombs()
	}
	// eslint-disable-next-line
	, [])

	useEffect(() => {
		const didWin = () => {
			let count = 0
		
			for (let x of tabuleiro){
				if(x !== "X" && x !== null){
					count ++
				}
			}
	
			if (count === boardSize - bombSize){
			  let new_tab = tabuleiro.slice()
				new_tab = new_tab.map( x => x === null ? x = "X" : x )
	
				setTabuleiro(new_tab)
				setOver(true)
			}
	
		}

		if (over === false){
			didWin()
		}
	
	}	// eslint-disable-next-line
	, [tabuleiro])


	//FUNCOES
	const generateBombs = () => {
		const bomb = []

		while (bomb.length < bombSize){
			let pos = Math.floor(Math.random() * (boardSize))

			if (bomb.indexOf(pos) === -1){
				bomb.push(pos)
			}
		}

		setBombs(bomb)
	}
	
	//CLICK NO BOTAO
	const handleClick = (id) => {

		if(over === false){
			let new_tab = tabuleiro.slice()

			if (new_tab[id] === null){
				if(bombs.indexOf(id) !== -1){
					setOver(true)
					new_tab[id] = "X"
				}else{
					let totBombs = countBombs(new_tab, id)
					new_tab[id] = totBombs
				}

				setTabuleiro(new_tab)
			}
		}else{
			reset()
		}
	}

	//VE SE JA FOI CLICADO
	const wasClicked = (value) => {
		if (value !== '' && value !== null) {
			return true
		}
		return false
	}


	//BOMBAS AO REDOR DA POS
	const countBombs = (lista, id) => {
		let len = boardSize**0.5
		let topo = [...Array(len).keys()]
		let pos = {
			topL: [id + 1, id + len + 1, id + len],
			topR: [id - 1, id + len, id + len - 1],
			top: [id - 1, id + 1,
			 id + len, id + len -1 , id + len + 1],

			leftB: [id - len, id + 1, id - len + 1],
			left: [id - len, id - len + 1, id + 1
			,id + len, id + len + 1],

			bottomR: [id - len, id - len - 1, id - 1],
			bottom: [id + 1, id - 1, id - len, id - len - 1,
			id - len + 1],

			right: [id + len, id - len, id + len - 1,
			 id - 1, id - len - 1],

			center: [id + len, id + len + 1, id + len -1, id - len,id - len -1, id - len + 1, id + 1, id - 1],
		}

		
		let totBombs = 0

		//TOPO
		if (id in topo){
			//Esquerda
			if(id === 0){
				for(let x of pos.topL){
					if(bombs.indexOf(x) !== -1){
						totBombs += 1
					}
				}

				if(totBombs === 0){
					lista[id] = 0
					for(let x of pos.topL){
						if(lista[x] === null){
							lista[x] = countBombs(lista, x)
						}
					}
				}

			//Direita
			}else if (id === len-1) {
				for(let x of pos.topR){
					if(bombs.indexOf(x) !== -1){
						totBombs += 1
					}
				}

				if(totBombs === 0){
					lista[id] = 0
					for(let x of pos.topR){
						if(lista[x] === null){
							lista[x] = countBombs(lista, x)
						}
					}
				}

			//Centro
			}else{
				for(let x of pos.top){
					if(bombs.indexOf(x) !== -1){
						totBombs += 1
					}
				}
				if(totBombs === 0){
					lista[id] = 0
					for(let x of pos.top){
						if(lista[x] === null){
							lista[x] = countBombs(lista, x)
						}
					}
				}
			}
		
		//ESQUERDA
		}else if (id % len === 0){
			//Fundo
			if (len**2 - len === id) {
				for(let x of pos.leftB){
					if(bombs.indexOf(x) !== -1){
						totBombs += 1
					}
				}

				if(totBombs === 0){
					lista[id] = 0
					for(let x of pos.leftB){
						if(lista[x] === null){
							lista[x] = countBombs(lista, x)
						}
					}
				}

			//Centro
			}else{
				for(let x of pos.left){
					if(bombs.indexOf(x) !== -1){
						totBombs += 1
					}
				}

				if(totBombs === 0){
					lista[id] = 0
					for(let x of pos.left){
						if(lista[x] === null){
							lista[x] = countBombs(lista, x)
						}
					}
				}
			}

		//FUNDO
		}else if (id >= len**2-len && id <= len**2 -1){
			//Direita
			if(id === len**2 -1){
				for(let x of pos.bottomR){
					if(bombs.indexOf(x) !== -1){
						totBombs += 1
					}
				}

				if(totBombs === 0){
					lista[id] = 0
					for(let x of pos.bottomR){
						if(lista[x] === null){
							lista[x] = countBombs(lista, x)
						}
					}
				}

			//Centro
			}else{
				for(let x of pos.bottom){
					if(bombs.indexOf(x) !== -1){
						totBombs += 1
					}
				}

				if(totBombs === 0){
					lista[id] = 0
					for(let x of pos.bottom){
						if(lista[x] === null){
							lista[x] = countBombs(lista, x)
						}
					}
				}

			}

		//DIREITA
		}else if ((id + 1) % len === 0){
				for(let x of pos.right){
					if(bombs.indexOf(x) !== -1){
						totBombs += 1
					}
				}

				if(totBombs === 0){
					lista[id] = 0
					for(let x of pos.right){
						if(lista[x] === null){
							lista[x] = countBombs(lista, x)
						}
					}
				}

		//CENTRO
		}else{
			for(let x of pos.center){
				if(bombs.indexOf(x) !== -1){
					totBombs += 1
				}
			}

			if(totBombs === 0){
				lista[id] = 0
				for(let x of pos.center){
					if(lista[x] === null){
						lista[x] = countBombs(lista, x)
					}
				}
			}
		}
		
		return totBombs
  }

	//VE SE GANHOU


	//RESETA O JOGO
	const reset = () => {
		setTabuleiro(Array(Number(boardSize)).fill(null))
		setBombs([])
		setOver(false)
		generateBombs()
	}

	//RENDERIZA
	return(
		<div>
			<div 
			className="tabuleiro"
			style={{
			display: 'grid',
			gridTemplateColumns:`repeat(${(boardSize**0.5)}, 1fr)`,
			gridTemplateRows:`repeat(${(boardSize**0.5)}, 1fr)`
			}
			}
			>
				{tabuleiro.map(
					(i, indexI) =>
						<Square 
						value={i}
						onClick={handleClick}
						wasClicked={wasClicked}
						id={indexI}
						key={`square-${indexI}`}
						/>
				)}
			</div>

			<div className="container-botao">
				<Link to="/">
					<button className="botao">
						VOLTAR AO MENU
					</button>
				</Link>
					<button className="botao" onClick={reset}>
						RESETAR
					</button>
			</div>

		</div>
	);
}

export default Tabuleiro