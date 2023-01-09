import React from 'react'
import { ListComponent } from './ListComponent';

//styles
import './EvolutionComponent.css'

export const EvolutionComponent = (props) => {
    const evolvesTo = (parrent) => {
        let objToReturn = [];
        objToReturn.push(parrent["species"]["name"])
        if(parrent["evolves_to"][0]){
          objToReturn.push(...evolvesTo(parrent["evolves_to"][0]))
        }
        return objToReturn
    }

    let evolvesToJSON = []
    let i=0;
    if(props.data_pokemon_evolution_chain && props.data_pokemon_general){
        evolvesTo(props.data_pokemon_evolution_chain["chain"]).map(name => {
        evolvesToJSON.push(props.data_pokemon_general.find((it) => {if(it.name == name){return it}}))
        i++
        })
    }

    return (
        <div className='evolution-wrapper'> 
            {!evolvesToJSON.includes(undefined) && (
                <>
                    <h4>Evolutie</h4>
                    <ListComponent data={evolvesToJSON}/>
                </>
            )}
        </div>
    )
}
