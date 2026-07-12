import {View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Button} from 'react-native'
import React, {useRef, useState} from 'react'
import {cities} from "@/utils/data";
 const Item=({item}:any)=> {
   return ( <View style={styles.card}>
        <Image
            source={{uri: item.image}}
            style={styles.image}
            resizeMode="cover"
        />
        <Text>{item.name}</Text>
       <Text>{item.country}</Text>
    </View>)
}
const FlatListComponent = () => {
    const flatListRef = useRef<FlatList>(null);
    const [refreshing, setRefreshing] = useState(false);
    const fetchData = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }
    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                initialNumToRender={8}
                maxToRenderPerBatch={8}
                removeClippedSubviews
                onViewableItemsChanged={({ viewableItems }) => {
                    console.log(viewableItems);
                }}
                getItemLayout={(_, index) => ({
                    length: 200,
                    offset: 200 * Math.floor(index / 2),
                    index,
                })}
                onScrollToIndexFailed={(info) => {
                    flatListRef.current?.scrollToOffset({
                        offset: info.averageItemLength * info.index,
                        animated: true,
                    });

                    setTimeout(() => {
                        flatListRef.current?.scrollToIndex({
                            index: info.index,
                            animated: true,
                        });
                    }, 300);
                }}
                refreshing={refreshing}
                onRefresh={fetchData}
                onEndReached={fetchData}
                onEndReachedThreshold={0.5}
                // numColumns={2}
                data={cities}
                renderItem={({item})=> <Item item={item}/>}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => (
                    <View
                        style={{
                            height: 12,
                            backgroundColor: "rgba(255,55,255,0.2)",
                        }}
                    />
                )}
                ListEmptyComponent={
                    <Text>No cities found.</Text>
                }
                ListFooterComponent={
                    <ActivityIndicator />
                }
                contentContainerStyle={{
                    padding: 5,
                    flexGrow: 1,
                    width: "100%",
                    gap: 5,
                }}
                ListHeaderComponent={<>
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
                                index: 9,
                                animated: true,
                            });
                        }}
                    />
                    <FlatList data={cities} style={{width:"100%"}} renderItem={({item})=>
                    <View style={{width:90,height:90,marginHorizontal:5}}>
                    <Image source={{uri: item.image}}
                           style={{width:"100%",height:"100%",borderRadius:100}}
                           resizeMode="cover"/>
                    </View>} keyExtractor={(item) => item.id} horizontal showsHorizontalScrollIndicator={false}/>
                </>}
            />
            <Button
                title="Scroll to Top"
                onPress={() => {
                    flatListRef.current?.scrollToOffset({
                        offset: 0,
                        animated: true,
                    });
                }}
            />
        </View>
    )
}
export default FlatListComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        width: "50%",
        padding: 10,
    },
    image: {
        width: "100%",
        height: 180,
    },
})