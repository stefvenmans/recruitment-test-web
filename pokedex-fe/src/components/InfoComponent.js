import React from 'react'

//style
import './InfoComponent.css'

export const InfoComponent = (props) => {
  return (
    <div className='info-wrapper'>
        <h4>Info</h4>
        {props.data_pokemon && props.data_pokemon_species && (<div className='info-content-wrapper'>
            <p className='info-general-text'>{props.data_pokemon_species["flavor_text_entries"][4]["flavor_text"]}</p>
            <div className='info-element-wrapper'>
                <span>Type</span>
                <div>{props.data_pokemon["types"].map(it =>    
                    <p className="list-item-type" key={it["slot"].toString()}>
                        {it["type"]["name"].toString()}
                    </p>
                    )}
                </div>
            </div>
            <div className='info-element-wrapper'>
                <span>Nummer</span>
                <p>{props.data_pokemon_species["id"]}</p>
            </div>
            <div className='info-element-wrapper'>
                <span>Gewicht</span>
                <p>{props.data_pokemon["weight"]} kg</p>
            </div>
            <div className='info-element-wrapper'>
                <span>Hoogte</span>
                <p>{props.data_pokemon["height"]}m</p>
            </div>
            <div className='info-element-wrapper'>
                <span>Categorie</span>
                <p>Todo</p>
            </div>
            <div className='info-element-wrapper'>
                <span>Geslacht</span>
                <p>{props.data_pokemon_species["has_gender_differences"] ? "true" : "false"} </p>
            </div>
            <div className='info-element-wrapper'>
                <span>Vaardigheden</span>
                <p>{props.data_pokemon["abilities"][0]["ability"]["name"]}</p>
            </div>
        </div>
        )}
    </div>
    
  )
}
