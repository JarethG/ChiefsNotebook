import {Text, View} from "react-native";
import {Styles} from "../Styles";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import MealPlanContext from "./MealPlanContext";

export function Shopping() {

    const {meals, setMeals} = useContext(MealPlanContext)
    const Categories = ["Pantry", "Baking", "Dairy", "Meat",  "Misc"]
    const [shoppingList, setShoppingList] = useState({})

    useEffect(() => {
        let obj = {}
        Categories.forEach(e => obj[e] = [])
        meals.forEach(meal => meal ?
            meal.ingredients.forEach(ingredient => {
                Categories.includes(ingredient.type) ?
                    obj[ingredient.type] = [...obj[ingredient.type], ingredient.name]
                    :
                    obj["Misc"] = [...obj["Misc"], ingredient.name]
            }) : null)
        setShoppingList(obj)
    }, [meals])

    return (
        <View style={Styles.background}>
            {Object.keys(shoppingList).map((cat, index) => {
                return <View key={index} style={{alignSelf:"flex-start"}}>
                    <Text style={{fontSize:30}}>{cat}</Text>
                    {shoppingList[cat].map((e, i) => {
                        return <Text key={i}>{e}</Text>
                    })}
                </View>
            })}
        </View>
    );
}