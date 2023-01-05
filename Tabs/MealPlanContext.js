import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MealPlanContext = React.createContext([]);

export const StoreAsyncData = async (value,key) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.log("storage error while storing ",key)
    }
}
export default MealPlanContext;