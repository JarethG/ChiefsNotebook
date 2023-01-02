import {Pressable, ScrollView, Text, View} from "react-native";
import {Styles} from "../Styles";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import MealPlanContext from "./MealPlanContext";
import Blacklist from "../Recipes/blacklist.json";

export function Shopping() {

    const {meals, setMeals} = useContext(MealPlanContext)
    const Categories = ["pantry", "baking", "dairy", "fruit" , "vegetable", "meat", "condiment",  "misc"]
    const [shoppingList, setShoppingList] = useState({})
    const [checkboxes, setCheckboxes] = useState({})

    //{ingredient : {recipe: {"recipe":amount""}}

    function getAllIngredients() {
        let obj = {}
        Categories.forEach(e => {
            obj[e] = {}
        })
        meals.forEach(meal => meal ?
            meal.ingredients.forEach(ingredient => {
                if(Categories.includes(ingredient.type)) {
                    if( obj[ingredient.type][ingredient.name]!=undefined){
                        obj[ingredient.type][ingredient.name] = obj[ingredient.type][ingredient.name]+1
                    } else {
                        obj[ingredient.type][ingredient.name] = 1
                    }
                } else if(Blacklist.findIndex(e => ingredient.name.includes(e))>0){
                    console.log(ingredient.name + "   " + Blacklist.findIndex(e => e.includes(ingredient.name)))
                }else {
                    if(obj.misc[ingredient.name]!=undefined){
                        obj["misc"][ingredient.name] = obj["misc"][ingredient.name]+1
                    } else {
                        obj["misc"][ingredient.name] = 1
                    }
                }
            }) : null)
        return obj
    }

    useEffect(() => {
        let checks = {}
        Categories.forEach(e => {
            checks[e] = []
        })
        meals.forEach(meal => meal ?
            meal.ingredients.forEach(ingredient => {
                if(Categories.includes(ingredient.type)) {
                    checks[ingredient.type] = [...checks[ingredient.type], false]
                } else {
                    checks["misc"] = [...checks["misc"], false]
                }
            }) : null)
        setShoppingList(getAllIngredients)
        setCheckboxes(checks)

    }, [meals])

    return (
        <View style={Styles.background}>
        <ScrollView style={{width:"90%"}}>
            {Object.keys(shoppingList).map((cat, index) => {
                return <View key={index} style={{alignSelf:"flex-start",width:"100%"}}>
                    <Text style={Styles.shoppingListCategory}>{cat}</Text>
                    {Object.keys(shoppingList[cat]).map((e, i) => {
                        return <Pressable  key={i} style={[checkboxes[cat][i]?{backgroundColor:"#999"}:null, Styles.shoppingListItem]}
                        onPress={()=> {
                        let arr = Object.create(checkboxes)
                            arr[cat][i]= ! arr[cat][i]
                            setCheckboxes(arr)
                        }
                        }>

                            <Text>{shoppingList[cat][e]} {e}</Text>

                        </Pressable>
                    })}
                </View>
            })}
        </ScrollView>
        </View>
    );
}