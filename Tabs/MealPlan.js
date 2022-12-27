import {useContext, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Button, ScrollView, Text, View} from "react-native";
import {Styles} from "../Styles";
import * as React from "react";
import MealPlanContext from "./MealPlanContext";

export function MealPlan() {


    const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const {meals, setMeals} = useContext(MealPlanContext)





    return (
        <View style={Styles.background}>
            <Text>Home!</Text>
            <ScrollView style={{width: "100%"}} contentContainerStyle={{alignItems: "center"}}>
                {meals.map((meal, index) =>
                    <View key={index} style={{width: "90%"}}>
                        <Text>{Days[index]}</Text>
                        <View style={Styles.mealCard}>
                            <View><Text>image</Text></View>
                            <Text>{meal != undefined ? meal.name : "meal name"}</Text>
                            <View style={{flexDirection: "row", width: "100%", justifyContent: 'space-around'}}>
                                <Text>time</Text>
                                <Text>skill level</Text>
                                <Text>serving size</Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}