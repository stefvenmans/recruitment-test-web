import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { ListComponent } from './ListComponent'

//styles
import './NavbarComponent.css'

//assets
import {ReactComponent as IconSortOn} from '../assets/icon-sort-on.svg'

export const NavbarComponent = () => {

    //state
    const [dataPokemonGeneral, setDataPokemonGeneral] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const url_pokemon_general = "https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon"
    const {error, isPending, data} = useFetch(url_pokemon_general)
    useEffect(() => {
        if(!error && !isPending)setDataPokemonGeneral(data)
    },[error,isPending,data])

    const handleSearch = (e) => {
        e.preventDefault()
        if(!searchValue == ""){
          let searchResult = []
          searchResult.push(data.filter((it) => {
            if(it.name.includes(searchValue) || containsType(it.types,searchValue) || it.id == searchValue){
              return it
            }}))
          if(!searchResult.includes(undefined)) setDataPokemonGeneral(searchResult[0])
          else setDataPokemonGeneral([])
        }
        else{setDataPokemonGeneral(data)}
    } 

    const containsType = (types, typeToCompare) => {
        let bool = false;
        types.map((it) => {
          if(it.type.name == typeToCompare){
            return bool = true;
          }
        })
        return bool
    }

    const handleSortOn = () => {
        const sortedData = [...dataPokemonGeneral]
        sortedData.sort((a,b) => {
          const nameA = a.name.toUpperCase(); 
          const nameB = b.name.toUpperCase(); 
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0
        })
        setDataPokemonGeneral(sortedData)
      }

    return (
        <div className='navbar-wrapper'>
            <div className='navbar-title-wrapper'>
                <h1>Pokedex</h1>
                <button className='navbar-btn-sort-on' onClick={handleSortOn}>
                    <IconSortOn/>
                </button>
            </div>
            <form className='navbar-search-form' onSubmit={handleSearch}>
                <input 
                    className='navbar-search-form-input'
                    type="text"
                    placeholder="Pokemon zoeken"
                    onChange={(e) => setSearchValue(e.target.value.toLowerCase())}>
                </input>
            </form>
            <div className='navbar-btn-team-fav-wrapper'>
                <button className='navbar-btn-my-team'>Mijn team</button>
                <button className='navbar-btn-favorites'>Favorieten</button>
            </div>
            <div className='list-wrapper'>
                <ListComponent data={dataPokemonGeneral}/>
            </div>
        </div>
    )
}
