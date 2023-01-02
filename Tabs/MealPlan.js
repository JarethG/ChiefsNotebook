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

    return (
        <View style={Styles.background}>
            <Text>Home!</Text>
                <FlatList data={meals} keyExtractor={(item) => item} style={{width: "100%"}}
                          keyExtractor={(item, index) => index}
                          renderItem={({item, index}) =><RecipeDisplay recipe={item} key={index} day={Days[index]}/>}/>
        </View>
    );
}