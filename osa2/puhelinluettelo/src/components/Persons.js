import React from 'react'

const Persons = (props) => {
    return (
        props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase())).map(person =>
            <div key={person.name} >
                {person.name} {person.number} <button onClick={() => props.deleteP(person.id)}>delete</button>
            </div>
        )
    )
}

export default Persons