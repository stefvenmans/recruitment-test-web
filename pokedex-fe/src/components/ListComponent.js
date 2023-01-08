import React from 'react'
import { Link } from 'react-router-dom'

//styles
import './ListComponent.css'

export const ListComponent = (props) => {
  return (
    <>
        {props.data && props.data.map(item => (
        <div className='list-item-wrapper' key={item.id}>
          <Link className='list-item' to={`/${item.id}`}>
            <img 
              className='list-item-img'
              src={item.sprites.front_default}
              alt="new"
            />
            <div className='list-item-title-number-wrapper'>
                <h2 className='list-item-title'>{item.name}</h2>
                <p className='list-item-number'>Nr. {item.id}</p>
            </div>
            <div className='list-item-types-wrapper'>
              {item.types.map(type => 
                <p className="list-item-type" key={type['type']["name"]}>
                    {type['type']["name"]}
                </p>
              )}
            </div>
          </Link>
        </div>
      ))}
    </>
  )
}
