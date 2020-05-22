import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const MostVotedAnecdote = ({ points, anecdotes }) => {
    let max = 0
    let index = 0

    for (let point in points) {
        if (points[point] > max) {
            max = points[point]
            index = point
        }
    }

    return (
        <>
            <h1> Anecdote with most votes </h1>
            <div> {anecdotes[index]} </div>
            <div> has {points[index]} votes </div>
        </>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })

    const nextAnecdote = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length))
    }

    const handleVote = () => {
        const copy = { ...points }
        copy[selected] += 1
        setPoints(copy)
    }

    return (
        <>
            <h1> Anecdote of the day </h1>
            <div> {props.anecdotes[selected]} </div>
            <div> has {points[selected]} points </div>
            <Button handleClick={handleVote} text="vote" />
            <Button handleClick={nextAnecdote} text="next anecdote" />
            <MostVotedAnecdote points={points} anecdotes={anecdotes}/>
        </>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)