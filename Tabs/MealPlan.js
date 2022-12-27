import {useContext, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Button, ScrollView, Text, View} from "react-native";
import {Styles} from "../Styles";
import * as React from "react";
import MealPlanContext from "./MealPlanContext";

export function MealPlan() {


    const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const {meals, setMeals} = useContext(MealPlanContext)


    useEffect(() => {
        getData().then(r => setMeals(r))
    }, [])

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
            <Text>Home!</Text>
            <Button title={"p"} onPress={()=> console.log(meals[0].name)}/>
        </View>
    );
}