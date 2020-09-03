import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';

class Queue {
  items: any;
  constructor() {
    this.items = [];
  }
  self() {
    return this.items;
  }
  enqueue(element: any) {
    // adding element to the queue 
    this.items.push(element);
    console.log(this.items)
  }
  dequeue() {
    if (this.isEmpty())
      return "Underflow";
    return this.items.shift();
  }
  // isEmpty function 
  isEmpty() {
    // return true if the queue is empty. 
    return this.items.length == 0;
  }
  // printQueue function 
  printQueue() {
    var str = "";
    for (var i = 0; i < this.items.length; i++)
      str += this.items[i] + " ";
    return str;
  }
}

export default function App() {
  const [queueState, setQueue] = useState([]);
  const [barista, setBarista] = useState([]);
  type THEMENU = {
    title: string;
    time: number;
    boolean: boolean;
  }
  const theMenu: THEMENU[] = [{ title: "Cafe Au Lait", time: 4, boolean: true }, { title: "Cappuccino", time: 10, boolean: true }, { title: "Expresso", time: 15, boolean: true }]
  const addToTicketingSystem = (value: THEMENU) => {
    setTimeout(() => {
      value.boolean = false;
      setQueue(state => {
        return [...state, value];
      })
    }, value.time * 1000);
    setQueue(state => [...state, value]);


  }
  const preparingByBarista = (value: number): boolean => {
    let INTERVAL = true;
    setTimeout(() => {
      INTERVAL = false;
      return INTERVAL;
    }, (value * 1000));
    return INTERVAL;
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text>Menu</Text>
        {theMenu.map((item, index) => (
          <Button
            key={index}
            title={item.title}
            onPress={() => addToTicketingSystem(item)}
          />
        ))}
      </View>
      <View>
        <Text>Barista</Text>
        {
          queueState.map((item, index: number) => (
            <View key={index} style={styles.baristaView}>
              <Text style={styles.baristaList} key={index}>{item.title}</Text>

              {item.boolean ? <ActivityIndicator animating /> : null}
            </View>
          ))
        }
      </View>
      <View>
        <Text>Coffee Counter</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baristaList: {
    color: 'red'
  },
  baristaView: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
