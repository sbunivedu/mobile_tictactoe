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
  if(props.value == 'x' ){
    return (
      <Image
        style={styles.image}
        source={require('./images/x.png')}
      />
    )
  }else if(props.value == 'o'){
    return (
      <Image
        style={styles.image}
        source={require('./images/o.png')}
      />
    )
  }else{
    return (
      <Image
        style={styles.image}
        source={require('./images/blank.png')}
      />
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

  handleClick(i) {
     const history = this.state.history.slice(0, this.state.stepNumber + 1);
     const current = history[history.length - 1];
     const squares = current.squares.slice();
     /*
     if (calculateWinner(squares) || squares[i]) {
       return;
     }*/

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

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    return (
      <View>
        <Board
          squares={current.squares}
          onClick={() => {}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  next_player: {
    borderWidth:1,
    borderColor: 'black',
    alignItems: 'center',
    marginBottom: 10
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
  }
})
