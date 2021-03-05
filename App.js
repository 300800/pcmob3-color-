import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  useWindowDimensions,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";
import { FlatList } from "react-native-gesture-handler";

//constant COLORS = [
//{red: 255, green: 128, blue: 0, id: "0"},
//{green: 0, green: 128, blue: 255, id: "1"},
//{blue: 255, green: 128, blue: 0, id: "2"},
//];

const NUM_COLUMNS = 5;

function HomeScreen({ navigation }) {
  const [colorArray, setColorArray] = useState([]);
  const BLOCK_SIZE = useWindowDimensions().width / NUM_COLUMNS;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={addColor} title="Add color" />,
      headerLeft: () => <Button onPress={resetColor} title="Reset" />,
    });
  });

  function renderItem({ item }) {
    //return <BlockRGB red={item.red} green={item.green} blue={item.blue} />;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailsScreen", { ...item })}
      >
        <BlockRGB
          style={{ height: BLOCK_SIZE, width: BLOCK_SIZE }}
          red={item.red}
          green={item.green}
          blue={item.blue}
        />
      </TouchableOpacity>
    );
  }

  //   const [columns, setColumn] = React.useState(numColumns);
  //   return (
  //     <FlatList
  //       style={{ width: "100%" }}
  //       data={columns}
  //       renderItem={renderItem}
  //       numColumns={numColumns}
  //     />
  //   );
  // }

  function addColor() {
    let newColor = {
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256),
      id: colorArray.length.toString(),
    };
    setColorArray([...colorArray, newColor]);
  }

  function resetColor() {
    setColorArray([]);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ height: 40, justifyContent: "center" }}
        onPress={addColor}
      >
        <Text style={{ color: "red", fontWeight: "bold" }}>Add Color</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ height: 40, justifyContent: "center" }}
        onPress={resetColor}
      >
        <Text style={{ color: "blue", fontWeight: "bold" }}>Reset Color</Text>
      </TouchableOpacity>

      <FlatList
        style={{ width: "100%" }}
        data={colorArray}
        renderItem={renderItem}
        //numColumns={NUM_COLUMNS}
      />
    </View>
  );
}

function DetailsScreen({ route }) {
  //Destructure this object so we don't have to type route.params.red etc

  const { red, green, blue } = route.params;

  // define contrasting colors for Text

  const textRed = red > 125 ? 255 - red - 20 : 255 + red + 20;
  const textGreen = green > 125 ? 255 - green - 20 : 255 + green + 20;
  const textBlue = blue > 125 ? 255 - blue - 20 : 255 + blue + 20;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgb(${red}, ${green}, $(blue))` },
      ]}
    >
      <Text style={styles.detailText}>Red: {red}</Text>
      <Text style={styles.detailText}>Green: {green}</Text>
      <Text style={styles.detailText}>Blue: {blue}</Text>
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
