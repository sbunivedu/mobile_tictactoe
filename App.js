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

const squares = [
  'x', 'o', 'x',
  'o', 'x', 'o',
  null, null, null,
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

export default function App() {
  return (
    <View>
      <View style={styles.board}>
        <View style={styles.row}>
          <Square value={squares[0]}/>
          <Square value={squares[1]}/>
          <Square value={squares[2]}/>
        </View>
        <View style={styles.row}>
          <Square value={squares[3]}/>
          <Square value={squares[4]}/>
          <Square value={squares[5]}/>
        </View>
        <View style={styles.row}>
          <Square value={squares[6]}/>
          <Square value={squares[7]}/>
          <Square value={squares[8]}/>
        </View>
      </View>
      <View style={styles.next_player}>
        <Text>hello</Text>
      </View>
      <ScrollView
        //contentContainerStyle={{ flexGrow: 1 }}
        style={styles.steplist}>
        {items.map((item) => (
          <TouchableOpacity
            style={styles.step}
            activeOpacity={0.7}
            key={item.id}
            onPress={() => {
            }}>
            <Text style={styles.step}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
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
