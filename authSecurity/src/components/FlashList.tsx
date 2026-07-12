import {View, Text, StyleSheet, FlatList, RefreshControl, Button} from 'react-native'
import React, {useRef, useState} from 'react'
import {FlashList} from "@shopify/flash-list";
import {cities} from "@/utils/data";
import {Image} from "expo-image";

const Item = React.memo(({item}: any) => {
    return (
        <View style={styles.card}>
            <Image
                source={{uri: item.image}}
                style={styles.image}
                contentFit={"cover"}
            />
            <Text>{item.name}</Text>
            <Text>{item.country}</Text>
        </View>
    )
})

const FlashListComponent = () => {
    const flatListRef = useRef<FlashListProps>(null);
    const [refreshing, setRefreshing] = useState(false);
    const fetchData = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }
    return (
            <FlashList
                ref={flatListRef}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
                }
                ListHeaderComponent={() => (
<>
                        <Button
                            title="Scroll to End"
                            onPress={() => {
                                flatListRef.current?.scrollToEnd({
                                    animated: true,
                                });
                            }}
                        /> <Button
                            title="Scroll to Index"
                            onPress={() => {
                                flatListRef.current?.scrollToIndex({
                                    index: 6,
                                    animated: true,
                                });
                            }}
                        />
</>
                )}
ListFooterComponent={() => <Button
    title="Scroll to Top"
    onPress={() => {
        flatListRef.current?.scrollToOffset({
            offset: 0,
            animated: true,
        });
    }}
/>}
                masonry
                numColumns={2}
                data={cities}
                renderItem={({ item }) => <Item item={item} />}
                contentContainerStyle={{
                    padding: 10,
                    width: "100%"
                }}
                estimatedItemSize={10}
                keyExtractor={(item) => item.id}
                        />

    )
}
export default FlashListComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",

    },
    card: {
        width: "100%",
        padding: 10,
    },
    image: {
        width: "100%",
        height: 180,
    },
})