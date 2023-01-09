import React from 'react'

//styles
import './StatisticsComponent.css'

export const StatisticsComponent = (props) => {
  return (
    <div className='stats-wrapper'>
        <h4>Statistiek</h4>
        {props.data_pokemon && props.data_pokemon_species && (
            <div className='stats-content-wrapper'>
                {props.data_pokemon["stats"].map(it =>   
                    <div className='stats-element-wrapper' key={it["stat"]["name"].toString()}><span>{it["stat"]["name"].toString()}</span><p>{it["base_stat"].toString()}</p></div>
                )}
        </div>
        )}
    </div>
  )
}
