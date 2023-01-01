import {Pressable, ScrollView, Text, View} from "react-native";
import {Styles} from "../Styles";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import MealPlanContext from "./MealPlanContext";

export function Shopping() {

    const {meals, setMeals} = useContext(MealPlanContext)
    const Categories = ["Pantry", "Baking", "Dairy", "Meat",  "Misc", "Fruit"]
    const [shoppingList, setShoppingList] = useState({})
    const [checkboxes, setCheckboxes] = useState({})

    useEffect(() => {
        let obj = {}
        let checks = {}
        Categories.forEach(e => {
            obj[e] = []
            checks[e] = []
        })
        meals.forEach(meal => meal ?
            meal.ingredients.forEach(ingredient => {
                if(Categories.includes(ingredient.type)) {
                    obj[ingredient.type] = [...obj[ingredient.type], ingredient.name]
                    checks[ingredient.type] = [...checks[ingredient.type], false]
                } else {
                    obj["Misc"] = [...obj["Misc"], ingredient.name]
                    checks["Misc"] = [...checks["Misc"], false]
                }
            }) : null)
        setShoppingList(obj)
        setCheckboxes(checks)

    }, [meals])

    return (
        <View style={Styles.background}>
        <ScrollView style={{width:"90%"}}>
            {Object.keys(shoppingList).map((cat, index) => {
                return <View key={index} style={{alignSelf:"flex-start",width:"100%"}}>
                    <Text style={Styles.shoppingListCategory}>{cat}</Text>
                    {shoppingList[cat].map((e, i) => {
                        return <Pressable  key={i} style={[checkboxes[cat][i]?{backgroundColor:"#999"}:null, Styles.shoppingListItem]}
                        onPress={()=> {
                        let arr = Object.create(checkboxes)
                            arr[cat][i]= ! arr[cat][i]
                            setCheckboxes(arr)
                        }
                        }>
                            <Text>{e}</Text>

                        </Pressable>
                    })}
                </View>
            })}
        </ScrollView>
        </View>
    );
}