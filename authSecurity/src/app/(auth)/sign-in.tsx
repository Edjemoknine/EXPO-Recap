import {View, Text, ActivityIndicator, Modal, Button, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import {useAuth} from "@clerk/expo";
import {AuthView, UserButton} from "@clerk/expo/native";

const SignIn = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false)

    const { isSignedIn, isLoaded } = useAuth({ treatPendingAsSignedOut: false })
    if (!isLoaded) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {isSignedIn ? <UserButton /> : <Button title="Sign in" onPress={() => setIsAuthOpen(true)} />}
            <Modal
                animationType="slide"
                visible={isAuthOpen}
                presentationStyle="pageSheet"
                onRequestClose={() => setIsAuthOpen(false)}
            >
                <AuthView  onDismiss={() => setIsAuthOpen(false)} />
            </Modal>
        </View>
    )
}
export default SignIn
const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})