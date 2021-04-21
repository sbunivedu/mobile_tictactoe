import React, { useState } from 'react'
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions
} from 'react-native'

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

export default function App(){
  const [state, setState] = useState({
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    stepNumber: 0,
    xIsNext: true
  });

  const calculateWinner = (squares) => {
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

  const handleClick = (i) => {
    console.log(i);
     const history = state.history.slice(0, state.stepNumber + 1);
     const current = history[history.length - 1];
     const squares = current.squares.slice();

     if (calculateWinner(squares) || squares[i]) {
       return;
     }

     squares[i] = state.xIsNext ? "X" : "O";
     setState({
       history: history.concat([
         {
           squares: squares
         }
       ]),
       stepNumber: history.length,
       xIsNext: !state.xIsNext,
       screenWidth: null,
       screenHeight: null,
     });
  }

  const jumpTo = (step) => {
    setState({
      history: state.history,
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (state.xIsNext ? "X" : "O");
  }

  const window = useWindowDimensions();
  const SCREEN_WIDTH = window.width;
  const SCREEN_HEIGHT = window.height;
  console.log("width:"+SCREEN_WIDTH+" height:"+SCREEN_HEIGHT);

  return (
    <SafeAreaView style={ SCREEN_HEIGHT > SCREEN_WIDTH?
      styles.ContainerPortrait : styles.ContainerLandscape }>
      <Board
        squares={current.squares}
        onClick={(i)=>handleClick(i)}
      />
      <View style={{alignItems: 'center'}}>
        <Text style={styles.status}>{status}</Text>
      </View>
      <ScrollView
        style={styles.steplist}>
        {history.map((step, move) => {
          const desc = move ?
            'Go to move #' + move :
            'Go to game start';
          return (
            <TouchableOpacity
              style={styles.step}
              activeOpacity={0.7}
              key={move}
              onPress={()=>{jumpTo(move)}}>
              <Text style={styles.step}>{desc}</Text>
            </TouchableOpacity>
         )}
       )}
      </ScrollView>
    </SafeAreaView>
  );
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
    flex: 1,
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
  },
  ContainerPortrait: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  ContainerLandscape: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'center',
    //alignItems: 'center'
  },
})
