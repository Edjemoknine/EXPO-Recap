import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  useEffect(() => {
    const hitApi = async () => {
      try {
        const response = await fetch("/api/data");
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    hitApi();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 20,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>HomeScreen</Text>
        {/* <Pressable
          onPress={() => {
            router.push("/modal");
          }}
        >
          <Text>Press Modal</Text>
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
