import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personsService from './services/personsService'
import Notification from './components/Notification'
import './App.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('a new name')
    const [newNumber, setNewNumber] = useState('phone number')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState('info')

    useEffect(() => {
        personsService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addName = (event) => {
        event.preventDefault()
        const person = {
            name: newName,
            number: newNumber
        }

        if (persons.some(person => person.name === newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                updateNumber(newName)
            }
        }

        else if (!(persons.some(person => person.name === newName))) {
            personsService
                .create(person)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                })
            setMessageType('info')
            setMessage(`Added ${newName}`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }

        setNewName('')
        setNewNumber('')
    }

    const deletePersonInfo = (id) => {
        const person = persons.find(p => p.id === id)
        
        personsService
            .deletePerson(person.id)
            .then(response => {
                setPersons(persons.filter(p => p.id !== id))
            })
        setMessageType('info')
        setMessage(`Deleted ${person.name}`)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const updateNumber = (namej) => {
        console.log(namej)
        const personToUpdate = persons.find(p => p.name === namej)
        const changedInfo = {...personToUpdate, number: newNumber}

        personsService
            .update(personToUpdate.id, changedInfo)
            .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
                setMessageType('info')
                setMessage(`Updated number of ${personToUpdate.name}`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
            .catch(error => {
                setMessageType('error')
                setMessage(`'${personToUpdate.name}' was already deleted from server`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            setPersons(persons.filter(p => p.id !== personToUpdate.id))
            })
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} messageType={messageType} />
            <Filter filter={filter} handleFilterChange={handleFilterChange} />

            <h2>Add a new</h2>
            <PersonForm
                addName={addName}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h3>Numbers</h3>
            <Persons
                persons={persons}
                filter={filter}
                deleteP={deletePersonInfo}
            />
        </div>
    )

}

export default App