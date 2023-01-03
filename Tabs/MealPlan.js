import {useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Button, FlatList, Image, Modal, Pressable, ScrollView, Text, View} from "react-native";
import {Styles} from "../Styles";
import * as React from "react";
import MealPlanContext from "./MealPlanContext";
import Recipes from "../Recipes/recipes.json";
import MyRecipes from "../Recipes/MyRecipes.json";
import {Ionicons} from "@expo/vector-icons";
import {localImage} from "../assets/localImageLoader";
import {RecipeDisplay} from "../Recipes/RecipeDisplay";

export function MealPlan() {


    const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const {meals, setMeals} = useContext(MealPlanContext)

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('current-week', jsonValue)
        } catch (e) {
            console.log("storage error while adding new recipe")
        }
    }

    const storeAsyncData = async (value,key) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.log("storage error while storing ",key)
        }
    }

    function removeMeal(index) {
        let arr = meals
        arr[index] = undefined;
        setMeals([...arr])
        storeData(arr).then(r => console.log("removed"))
    }

    const RenderItem = ({recipe,index}) => {

        return recipe==undefined?null:<>
            <RecipeDisplay recipe={recipe} day={Days[index]}/>
            <Ionicons name="remove-circle-outline" size={50} color="black" onPress={() =>removeMeal(index)}
                      style={{position: "absolute", right: 5,top:5}}/>
            </>
    }

    return (
        <View style={Styles.background}>
                <FlatList data={meals} keyExtractor={(item) => item} style={{width: "100%"}}
                          keyExtractor={(item, index) => index}
                          renderItem={({item, index}) =><RenderItem recipe={item} index={index} key={index}/>}/>
        </View>
    );
}