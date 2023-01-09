import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { ListComponent } from './ListComponent'

//styles
import './NavbarComponent.css'

//assets
import {ReactComponent as IconSortOn} from '../assets/icon-sort-on.svg'
import {ReactComponent as IconClose} from '../assets/icon-close.svg'
import {ReactComponent as IconGoBack} from '../assets/icon-chevron-left.svg'
import { useCollection } from '../hooks/useCollection'

export const NavbarComponent = () => {

    //state
    const [dataPokemonGeneral, setDataPokemonGeneral] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [showDialogSortOn, setShowDialogSortOn] = useState(false)
    const [sortOnValue, setSortOnValue] = useState(-1)
    const [showMyTeamOrFav, setShowMyTeamOrFav] = useState(0)
    const [myTeam, setMyTeam] = useState(null)
    const [favorites, setFavorites] = useState(null)

    const {documents: favoritesFirebase, error: firebase_error_fav, setQuery_fav} = useCollection("favorites", null ,['pokemon_id', 'asc'])//, ['pokemon_id', 'asc'])
    const {documents: myTeamFirebase, error: firebase_erro_my_team, setQuery_my_team} = useCollection("my_team", null ,['pokemon_id', 'asc'])//, ['pokemon_id', 'asc'])
    
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
        setShowDialogSortOn(true)
        const sortedData = [...dataPokemonGeneral]
        switch(sortOnValue){
            case 0: 
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
                break;
            case 1: 
                sortedData.sort((a,b) => {
                    const nameA = a.name.toUpperCase(); 
                    const nameB = b.name.toUpperCase(); 
                    if (nameA > nameB) {
                    return -1;
                    }
                    if (nameA < nameB) {
                    return 1;
                    }
                    return 0
                })
                break;
            case 2: 
                sortedData.sort((a,b) => {
                    const idA = a.id
                    const idB = b.id
                    if (idA < idB) {
                    return -1;
                    }
                    if (idA > idB) {
                    return 1;
                    }
                    return 0
                })
                break;
            case 3: 
                sortedData.sort((a,b) => {
                    const idA = a.id
                    const idB = b.id
                    if (idA > idB) {
                    return -1;
                    }
                    if (idA < idB) {
                    return 1;
                    }
                    return 0
                })
                break;
        }
        setShowDialogSortOn(false)
        setDataPokemonGeneral(sortedData)
    }

    const readMyTeamtFromFirebase = () => {
        // setMyTeam(true)
        if(data && myTeamFirebase){
          let findMyTeam = []
          myTeamFirebase.map(item => {
            findMyTeam.push(data.find((it) => {if(it.id == item.pokemon_id){return it}}))
          }
          )
          setMyTeam(findMyTeam)
        }
    }

    const readFavoritesFromFirebase = () => {
        // setFavo(true)
        if(data && favoritesFirebase){
          let findFavorites = []
          favoritesFirebase.map(item => {
            findFavorites.push(data.find((it) => {if(it.id == item.pokemon_id){return it}}))
          }
          )
          setFavorites(findFavorites)
        }
    }

    return (
        <div className='navbar-wrapper'>
            {showMyTeamOrFav==0 && (
                <>
                    <div className='navbar-title-wrapper'>
                        <h1>Pokedex</h1>
                        <button className='navbar-btn-sort-on' onClick={() => setShowDialogSortOn(!showDialogSortOn)}> 
                        {/* handleSortOn> */}
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
                        <button className='navbar-btn-my-team' 
                            onClick={() => {
                                readMyTeamtFromFirebase()
                                setShowMyTeamOrFav(1)
                            }}>Mijn team</button>
                        <button className='navbar-btn-favorites' 
                            onClick={() => {
                                readFavoritesFromFirebase()
                                setShowMyTeamOrFav(2)
                            }}>Favorieten</button>
                    </div>
                    <div className='list-wrapper'>
                        <ListComponent data={dataPokemonGeneral}/>
                    </div>
                    {showDialogSortOn &&(
                        <div className='navbar-dialog-sort-on'>
                            <button className='navbar-dialog-sort-on-btn-close' onClick={() => setShowDialogSortOn(false)}><IconClose className='svg-close'/></button>
                            <button className='navbar-dialog-sort-on-btn' onClick={() => setSortOnValue(0)} style={sortOnValue==0 ? {background: 'rgb(162,193,87)'} : {background: 'rgb(0 0 0 / 0.1)'}}>Alfabetisch oplopend</button>
                            <button className='navbar-dialog-sort-on-btn' onClick={() => setSortOnValue(1)} style={sortOnValue==1 ? {background: 'rgb(162,193,87)'} : {background: 'rgb(0 0 0 / 0.1)'}}>Alfabetisch aflopend</button>
                            <button className='navbar-dialog-sort-on-btn' onClick={() => setSortOnValue(2)} style={sortOnValue==2 ? {background: 'rgb(162,193,87)'} : {background: 'rgb(0 0 0 / 0.1)'}}>Numeriek oplopend</button>
                            <button className='navbar-dialog-sort-on-btn' onClick={() => setSortOnValue(3)} style={sortOnValue==3 ? {background: 'rgb(162,193,87)'} : {background: 'rgb(0 0 0 / 0.1)'}}>Numeriek aflopend</button>
                            <button className='navbar-dialog-sort-on-btn-apply'onClick={() => handleSortOn()}>Toepassen</button>
                        </div>
                    )}
                </>
            )}
            {showMyTeamOrFav==1 && (
                <div className='navbar-my-team-wrapper'>
                <button className='btn-go-back-wrapper' onClick={() => setShowMyTeamOrFav(0)}>
                    <IconGoBack/>
                    <h3>Terug</h3>
                </button>
                <h1>Mijn team</h1>
                <div className='list-wrapper'>
                    <ListComponent data={myTeam}/>
                </div>
            </div>
            )}
            {showMyTeamOrFav==2 && (
                <div className='navbar-fav-wrapper'>
                    <button className='btn-go-back-wrapper' onClick={() => setShowMyTeamOrFav(0)}>
                        <IconGoBack/>
                        <h3>Terug</h3>
                    </button>
                    <h1>Favorieten</h1>
                    <div className='list-wrapper'>
                        <ListComponent data={favorites}/>
                    </div>
                </div>
            )}
        </div>
    )
}
