import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = props => {
    if (props.sum === 0) {
        return <div> No feedback given </div>
    }
    //const positive = props.good / sum
    return (
        <table>
            <tbody>
                <StatisticLine text="Good" value={props.good} />
                <StatisticLine text="Neutral" value={props.neutral} />
                <StatisticLine text="Bad" value={props.bad} />
                <StatisticLine text="All" value={props.sum} />
                <StatisticLine text="Average" value={props.value / props.sum} />
                <StatisticLine text="Positive" value={props.good / props.sum * 100 + ' %'} />
            </tbody>
        </table>
    )
}

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const StatisticLine = ({ text, value }) => (
    <tr>
        <td> {text} </td>
        <td> {value} </td>
    </tr>
)

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const [sum, setSum] = useState(0)
    const [value, setValue] = useState(0)

    const goodClick = () => {
        setSum(sum + 1)
        setGood(good + 1)
        setValue(value + 1)
    }

    const neutralClick = () => {
        setSum(sum + 1)
        setNeutral(neutral + 1)
        setValue(value + 0)
    }

    const badClick = () => {
        setSum(sum + 1)
        setBad(bad + 1)
        setValue(value - 1)
    }

    return (
        <div>
            <h1> Give Feedback </h1>
            <Button handleClick={goodClick} text="Good" />
            <Button handleClick={neutralClick} text="Neutral" />
            <Button handleClick={badClick} text="Bad" />
            <h1> Statistics </h1>
            <Statistics good={good} neutral={neutral} bad={bad} sum={sum} value={value} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)