import React from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

//assets
import {ReactComponent as IconGoBack} from '../assets/icon-chevron-left.svg'

//style
import './DetailsComponent.css'
import { InfoComponent } from './InfoComponent'
import { StatisticsComponent } from './StatisticsComponent'

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

    return (
        <div className='details-wrapper' style={{background: data_pokemon_species ? pokemonColors[ data_pokemon_species.color.name] : 'rgb(255,255,255'}}>
            {props.view=="mobile" && (
                <Link className='btn-go-back-wrapper' to='/'>
                    <IconGoBack/>
                <h3>Terug</h3>
            </Link>
            )}
            {data_pokemon && url_pokemon_species && data_pokemon_evolution_chain && (
                <>
                    <h1 className={"details-title"}>{data_pokemon.name}</h1>
                    <img className='details-img'
                        src={data_pokemon["sprites"]["other"]["official-artwork"]["front_default"]}
                        alt={data_pokemon.name}
                    />
                    <InfoComponent data_pokemon={data_pokemon} data_pokemon_species={data_pokemon_species}/>
                    <StatisticsComponent data_pokemon={data_pokemon} data_pokemon_species={data_pokemon_species}/>
                </>
            )}
        </div>
    )
}
