import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";
import { FlatList } from "react-native-gesture-handler";

//constant COLORS = [
//{red: 255, green: 128, blue: 0, id: "0"},
//{green: 0, green: 128, blue: 255, id: "1"},
//{blue: 255, green: 128, blue: 0, id: "2"},
//];

function HomeScreen({ navigation }) {
  const [colorArray, setColorArray] = useState([
    { red: 255, green: 128, blue: 128, id: "0" },
    { green: 0, red: 128, blue: 255, id: "1" },
    { blue: 128, red: 0, green: 255, id: "2" },
  ]);

  function renderItem({ item }) {
    //return <BlockRGB red={item.red} green={item.green} blue={item.blue} />;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailsScreen", { ...item })}
      >
        <BlockRGB red={item.red} green={item.green} blue={item.blue} />
      </TouchableOpacity>
    );
  }

  function addColor() {
    let newColor = {
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256),
      id: colorArray.length.toString(),
    };
    setColorArray([...colorArray, newColor]);
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={addColor} title="Add color" />,
    });
  });

  function resetColor() {
    setColorArray([]);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ height: 40, justifyContent: "center" }}
        onPress={addColor}
      >
        <Text style={{ color: "red" }}></Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ height: 40, justifyContent: "center" }}
        onPress={resetColor}
      ></TouchableOpacity>

      <FlatList style={styles.list} data={colorArray} renderItem={renderItem} />
    </View>
  );
}

function DetailsScreen({ route }) {
  //Destructure this objct so we don't have to type route.params.red etc

  const { red, green, blue } = route.params;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgb(${red}, ${green}, $(blue))` },
      ]}
    >
      <View style={{ padding: 30 }}>
        <Text style={styles.detailText}>Red: {red}</Text>
        <Text style={styles.detailText}>Red: {green}</Text>
        <Text style={styles.detailText}>Red: {blue}</Text>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Kueh Lapis" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  list: {
    width: "100%",
  },
});
