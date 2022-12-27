import {Button, Text, View} from "react-native";
import {Styles} from "../Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";

export function Settings() {
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('current-week')
            return jsonValue != null ? JSON.parse(jsonValue) : Array(7).fill(undefined);
        } catch (e) {
            console.log("reading meal data produced an error")
        }
    }

    return (
        <View style={Styles.background}>
            <Text>Settings!</Text>
            <Button title={"clear"} onPress={()=> {
                try {
                    AsyncStorage.clear().then(()=>console.log("cleared"))
                } catch (e) {
                    console.log("storage error while adding new recipe")
                }
            }}/>
            <Button title={"getasync"} onPress={()=> getData().then(r=>console.log(r))}/>
        </View>
    );
}
