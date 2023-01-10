import React, { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'

//assets
import {ReactComponent as IconGoBack} from '../assets/icon-chevron-left.svg'
import {ReactComponent as IconFavorite} from '../assets/icon-favorite.svg'
import {ReactComponent as IconFavoriteFull} from '../assets/icon-favorite-full.svg'

//style
import './DetailsComponent.css'
import { InfoComponent } from './InfoComponent'
import { StatisticsComponent } from './StatisticsComponent'
import { EvolutionComponent } from './EvolutionComponent'

//custom hooks
import { useFetch } from '../hooks/useFetch'
import { useFirestore } from '../hooks/useFirestore'
import { useCollection } from '../hooks/useCollection'

export const DetailsComponent = (props) => {
    const {id} = useParams()

    const url_pokemon = `https://pokeapi.co/api/v2/pokemon/${id}`
    const url_pokemon_species = `https://pokeapi.co/api/v2/pokemon-species/${id}`
    const url_pokemon_evolution_chain = `https://pokeapi.co/api/v2/evolution-chain/${id}`
    const url_pokemon_general = "https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon"

    const {error: error_pokemon, isPending: isPending_pokemon, data: data_pokemon} = useFetch(url_pokemon)
    const {error: error_pokemon_species, isPending: isPending_pokemon_species, data: data_pokemon_species} = useFetch(url_pokemon_species)
    const {error: error_pokemon_evolution_chain, isPending: isPending_pokemon_evolution_chain, data: data_pokemon_evolution_chain} = useFetch(url_pokemon_evolution_chain)
    const {error: error_pokemon_general, isPending: isPending_pokemon_general, data: data_pokemon_general} = useFetch(url_pokemon_general)

    const pokemonColors = {red: "rgb(213,104,77)", blue: "rgb(134,169,217)", yellow: "rgb(240,213,59)", green: "rgb(153,205,144)", black: "rgb(82,80,79)", brown: "rgb(181,158,129)", purple: "rgb(167,138,176)", gray: "rgb(201,193,183)", white: "rgb(237,240,242)", pink: "rgb(235,191,202)" }

    const {addDocument: addToFavoritesFirebase, deleteDocument: deleteFromFavoritesFirebase, response: response_firebase_fav} = useFirestore('favorites')
    const {addDocument: addToMyTeamFirebase, deleteDocument: deleteFromMyTeamFirebase, response: response_firebase_my_team} = useFirestore('my_team')
    const {documents: favoritesFirebase, error: firebase_error_fav, setQuery_fav} = useCollection("favorites", null ,null)//, ['pokemon_id', 'asc'])
    const {documents: myTeamFirebase, error: firebase_erro_my_team, setQuery_my_team} = useCollection("my_team", null ,null)//, ['pokemon_id', 'asc'])

    const [favorite, setFavorite] = useState(null)
    const [myTeam, setMyTeam] = useState(null)

    let isFavorite = false;
    if(favoritesFirebase){
        isFavorite = favoritesFirebase.find((it) => {if(it.pokemon_id == id.toString()){return it}})
    }

    let isOnMyTeam = false;
    if(myTeamFirebase){
        isOnMyTeam = myTeamFirebase.find((it) => {if(it.pokemon_id == id.toString()){return it}})
    }

    useEffect(() => {
        if(isFavorite){
            setFavorite(true)
        }
        else{
            setFavorite(false)
        }
    },[isFavorite])

    useEffect(() => {
        if(isOnMyTeam){
            setMyTeam(true)
        }
        else{
            setMyTeam(false)
        }
    },[isOnMyTeam])

    console.log('favorite: ', favorite)

    const setFavoriteUnfavorite = () => {
        if(favorite){
            deleteFromFavoritesFirebase(isFavorite.id)
        }
        else{
            addToFavoritesFirebase({pokemon_id: data_pokemon["id"].toString()})
        }
    }

    const setOnMyTeamRemoveFromMyTeam = () => {
        if(myTeam){
            deleteFromMyTeamFirebase(isOnMyTeam.id)
        }
        else{
            addToMyTeamFirebase({pokemon_id: data_pokemon["id"].toString()})
        }
    }

    return (
        <div className='details-wrapper' style={{background: data_pokemon_species ? pokemonColors[ data_pokemon_species.color.name] : 'rgb(255,255,255'}}>
            {props.view=="mobile" && (
                <div className='details-header'>
                    <Link className='btn-go-back-wrapper' to='/'>
                        <IconGoBack/>
                        <h3>Terug</h3>
                    </Link>
                    <button className='details-favorite-btn' onClick={setFavoriteUnfavorite}>{favorite ? (<IconFavoriteFull/>) : (<IconFavorite/>)}</button>
                </div>
            )}
            {data_pokemon && url_pokemon_species && data_pokemon_evolution_chain && (
                <>
                    {props.view=="browser" && (
                        <div className='details-header'>
                            <h1 className={"details-title"}>{data_pokemon.name}</h1>
                            <button className='details-favorite-btn' onClick={setFavoriteUnfavorite}>{favorite ? (<IconFavoriteFull/>) : (<IconFavorite/>)}</button>
                        </div>
                    )}
                    <div className='details-content-wrapper'>
                        <div className='details-col1-wrapper'>
                            <img className='details-img'
                                src={data_pokemon["sprites"]["other"]["official-artwork"]["front_default"]}
                                alt={data_pokemon.name}
                            />
                            
                                <InfoComponent data_pokemon={data_pokemon} data_pokemon_species={data_pokemon_species}/>
                        </div>
                        <div className='details-col2-wrapper'>
                            <StatisticsComponent data_pokemon={data_pokemon} data_pokemon_species={data_pokemon_species}/>
                            <EvolutionComponent data_pokemon_evolution_chain={data_pokemon_evolution_chain} data_pokemon_general={data_pokemon_general}/>
                        </div>
                    </div>
                    <button className='details-my-team-btn' onClick={setOnMyTeamRemoveFromMyTeam}>{myTeam ? ('Verwijder van team') : ('Toevoegen aan team')}</button>
                </>
            )}
        </div>
    )
}
