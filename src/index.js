import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squareValue: null
        }
    }
    render() {
        return (
            // <button className="square"
            //     onClick={
            //         () => {
            //             this.props.onClickingOfASquare()
            //         }}>
            //     {this.props.squareValue}
            // </button>

            <button className="square" onClick={this.props.onClickingOfASquare}>
                {this.props.squareValue}
            </button>

            // <button className="square">
            //     {this.props.squareValue}
            // </button>

            // <button className="square">
            //     {this.props.squareValue}
            // </button>

        );
    }
}

class Board extends React.Component {

    renderSquare(i) {
        // return <Square squareValue={i} />;
        return <Square
            squareValue={this.props.squares[i]} // Global State
            onClickingOfASquare={() => { this.props.onBoardClick(i) }} // Setter
        />
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true
        }
    }

    handleClick(i) {

        const history = this.state.history
        const current = history[history.length - 1]
        const squares = current.squares.slice() // Dont needa slice homie

        // Stop if Written
        if (squares[i] != null) {
            return
        }

        // For Winner
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext
        })
    }

    render() {
        const history = this.state.history
        const current = history[history.length - 1]
        const winner = calculateWinner(current.squares)
        let status;
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return <li>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
        })

        if (winner) {
            status = 'Winner: ' + winner
        } else {
            status = "Next player: " + (this.state.xIsNext ? 'X' : 'O')
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onBoardClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>{moves}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {

    // Winning Lines
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Iterate through winning lines
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        // Check if line corresponds to a match on the board
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}