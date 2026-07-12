import { Text, View, StyleSheet } from "react-native";
import FlatListComponent from "@/components/FlatList";
import FlashListComponent from "@/components/FlashList";
import LegendListComponent from "@/components/LegendList"

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
{/*<FlatListComponent/>*/}
{/*<FlashListComponent/>*/}
        <LegendListComponent/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});