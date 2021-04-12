import React from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image } from 'react-native'

const items = [
  { id: '0', text: 'step0' },
  { id: '1', text: 'step1' },
  { id: '2', text: 'step2' },
  { id: '3', text: 'step3' },
  { id: '4', text: 'step4' },
  { id: '5', text: 'step5' },
  { id: '6', text: 'step6' },
]

function Square(props) {
  if(props.value == 'X' ){
    return (
      <Image
        style={styles.image}
        source={require('./images/x.png')}
      />
    )
  }else if(props.value == 'O'){
    return (
      <Image
        style={styles.image}
        source={require('./images/o.png')}
      />
    )
  }else{
    return (
      <TouchableOpacity onPress={()=>{
        console.log("hello");
        props.onClick();
      }}>
        <Image
          style={styles.image}
          source={require('./images/blank.png')}
        />
      </TouchableOpacity>
    )
  };
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <View style={styles.board}>
        <View style={styles.row}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View style={styles.row}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View style={styles.row}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </View>
      </View>
    );
  }
}

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick(i) {
    console.log(i);
     const history = this.state.history.slice(0, this.state.stepNumber + 1);
     const current = history[history.length - 1];
     const squares = current.squares.slice();

     if (this.calculateWinner(squares) || squares[i]) {
       return;
     }

     squares[i] = this.state.xIsNext ? "X" : "O";
     this.setState({
       history: history.concat([
         {
           squares: squares
         }
       ]),
       stepNumber: history.length,
       xIsNext: !this.state.xIsNext
     });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

/*
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (

        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
*/

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <View>
        <Board
          squares={current.squares}
          onClick={(i)=>this.handleClick(i)}
        />
        <View style={{alignItems: 'center'}}>
          <Text style={styles.status}>{status}</Text>
        </View>
        <ScrollView
          //contentContainerStyle={{ flexGrow: 1 }}
          style={styles.steplist}>
          {history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
              /*
            return (

              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );*/
            return (
              <TouchableOpacity
                style={styles.step}
                activeOpacity={0.7}
                key={move}
                onPress={()=>{this.jumpTo(move)}}>
                <Text style={styles.step}>{desc}</Text>
              </TouchableOpacity>
           )}
         )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  status: {
    borderWidth:1,
    borderColor: 'black',
    marginBottom: 10,
    fontSize: 30,
  },
  board: {
    //flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 50,
    height: 50,
    //backgroundColor: '#3B6CD4',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
  steplist: {
    //flex: 1,
    //margin: 50,
    borderWidth: 1,
    //borderColor: 'black',
  },
  step: {
    padding: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'skyblue',
    fontSize: 30,
  }
})
