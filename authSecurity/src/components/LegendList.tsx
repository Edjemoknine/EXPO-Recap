import {View, Text, StyleSheet} from 'react-native'
import React, {useRef} from 'react'
import {Image} from "expo-image";
import {LegendList, LegendListRef, LegendListRenderItemProps} from "@legendapp/list/react-native";
import {cities} from "@/utils/data";

const Item = React.memo(({item}: LegendListRenderItemProps<any>) => {
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
const LegenedListComponent = () => {
    const listRef = useRef<LegendListRef | null>(null)
    return (
        <LegendList
            // Required Props
            data={cities}
            renderItem={({item}) => <Item item={item}/>}
            estimatedItemSize={10}
            // Recommended props (Improves performance)
            keyExtractor={(item) => item.id}
            recycleItems={true}

            // Recommended if data can change
            maintainVisibleContentPosition

            ref={listRef}
            alignItemsAtEnd
            maintainScrollAtEnd
            maintainScrollAtEndThreshold={0.1}
        />
    )
}
export default LegenedListComponent
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