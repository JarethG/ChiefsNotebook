import {Button, Text, View} from "react-native";
import {Styles} from "../Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import Recipes from "../Recipes/recipes.json"
import {useContext} from "react";
import MealPlanContext from "./MealPlanContext";

export function Settings() {

    const {meals, setMeals} = useContext(MealPlanContext)

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('current-week')
            return jsonValue != null ? JSON.parse(jsonValue) : Array(7).fill(undefined);
        } catch (e) {
            console.log("reading meal data produced an error")
        }
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('current-week', jsonValue)
        } catch (e) {
            console.log("storage error while adding new recipe")
        }
    }

    function addRecipeToPlan(recipe, index) {
        let arr = meals
        recipe.ingredients.forEach((e,i)=>e["onList"]=true)
        arr[index] = recipe;
        setMeals([...arr])
        storeData(arr).then(r => console.log("all done"))
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
                setMeals(Array(7).fill(undefined))
            }}/>
            <Button title={"getasync"} onPress={()=> getData().then(r=>console.log(r))}/>
            <Button title={"reload meal plan"} onPress={()=> [0,1,2,3,4,5,6].forEach(i=> addRecipeToPlan(Recipes[i+1],i))}/>
        </View>
    );
}
