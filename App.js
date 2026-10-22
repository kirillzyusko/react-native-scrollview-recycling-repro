import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Button,
  Keyboard,
  Text,
  TextInput,
  View,
} from "react-native";

const Stack = createNativeStackNavigator();
let opened = false;

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button
        testID="native-animated.open"
        title="Open ScrollView"
        onPress={() => {
          navigation.push("Details", { reopened: opened });
          opened = true;
        }}
      />
    </View>
  );
}

function Details({ route }) {
  const reopened = route.params.reopened;
  const scroll = useRef(null);
  const y = useRef(new Animated.Value(1457)).current;
  const height = reopened
    ? 671 + 2 / 3
    : y.interpolate({
        inputRange: [0, 1000, 1385 + 1 / 3, 1425 + 1 / 3, 1457, 1600],
        outputRange: [
          454 + 2 / 3,
          454 + 2 / 3,
          414 + 2 / 3,
          414 + 2 / 3,
          454 + 2 / 3,
          671 + 2 / 3,
        ],
        extrapolate: "clamp",
      });

  useEffect(() => {
    if (reopened) {
      return;
    }
    const listener = Keyboard.addListener("keyboardWillHide", () => {
      setTimeout(() => y.setOffset(2000), 100);
    });

    return () => listener.remove();
  }, [reopened, y]);

  return (
    <View style={{ flex: 1, paddingTop: 200 }} testID="native-animated.details">
      <Animated.ScrollView
        ref={scroll}
        automaticallyAdjustKeyboardInsets
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        scrollEventThrottle={1}
        style={{
          height,
          flexGrow: 0,
          flexShrink: 0,
          backgroundColor: "yellow",
        }}
        onScroll={
          reopened
            ? undefined
            : Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
                useNativeDriver: true,
              })
        }
      >
        <View style={{ backgroundColor: "#65b96e", padding: 20 }}>
          <View style={{ height: 350 }} />
          <TextInput
            placeholder="Type a message"
            style={{ height: 40, backgroundColor: "#eee" }}
            testID="native-animated.input"
          />
          {Array.from({ length: 30 }, (_, i) => (
            <Text key={i} style={{ padding: 15 }}>
              Row {i + 1}
            </Text>
          ))}
        </View>
      </Animated.ScrollView>
      <View style={{ position: "absolute", top: 100, left: 20, right: 20 }}>
        <Button
          testID="native-animated.end"
          title="Scroll to end"
          onPress={() => scroll.current?.scrollToEnd({ animated: false })}
        />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={Home} name="Home" />
        <Stack.Screen component={Details} name="Details" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
