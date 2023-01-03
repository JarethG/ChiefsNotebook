import {Button, Modal, Pressable, ScrollView, Text, View} from "react-native";
import {Styles} from "../Styles";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import MealPlanContext from "./MealPlanContext";
import Blacklist from "../Recipes/blacklist.json";
import {RecipeDisplay} from "../Recipes/RecipeDisplay";
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Shopping() {

    const {meals, setMeals} = useContext(MealPlanContext)
    const Categories = ["pantry", "baking", "dairy", "fruit", "vegetable", "meat", "condiment", "misc"]
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
                if (ingredient.onList) {
                    if (Categories.includes(ingredient.type)) {
                        if (obj[ingredient.type][ingredient.name] != undefined) {
                            obj[ingredient.type][ingredient.name] = obj[ingredient.type][ingredient.name] + 1
                        } else {
                            obj[ingredient.type][ingredient.name] = 1
                        }
                    } else if (Blacklist.findIndex(e => ingredient.name.includes(e)) > 0) {
                        console.log(ingredient.name + "   " + Blacklist.findIndex(e => e.includes(ingredient.name)))
                    } else {
                        if (obj.misc[ingredient.name] != undefined) {
                            obj["misc"][ingredient.name] = obj["misc"][ingredient.name] + 1
                        } else {
                            obj["misc"][ingredient.name] = 1
                        }
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
                if (Categories.includes(ingredient.type)) {
                    checks[ingredient.type] = [...checks[ingredient.type], false]
                } else {
                    checks["misc"] = [...checks["misc"], false]
                }
            }) : null)
        setShoppingList(getAllIngredients)
        setCheckboxes(checks)

    }, [meals])

    function updateShoppingList(recipe, index,checks) {
        let arr = meals
        recipe.ingredients.forEach((e,i)=>e["onList"]=checks[i])
        arr[index] = recipe;
        setMeals([...arr])
        storeData(arr)
        console.log(recipe)
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('current-week', jsonValue)
        } catch (e) {
            console.log("storage error while adding new recipe")
        }
    }

    const UpdateShoppingList=()=> {
        const [pickDay, setPickDay] = useState(true)
        const [modalVisible, setModalVisible] = useState(false);
        const [recipe, setRecipe] = useState();
        const [day,setDay] = useState()
        const [checks,setChecks] = useState([])

        return <><Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            {pickDay ?
                <View style={Styles.meal_card}>
                    {meals.map((e, i) => e != undefined ?<View style={{margin: 5}} key={i}>
                        <Button title={e.name}
                                onPress={() => {
                                    setRecipe(e)
                                    setDay(i)
                                    setChecks(e.ingredients.map((e,i)=>e.onList))
                                    setPickDay(!pickDay)
                                }}/></View>:null)}
                    <Ionicons name="chevron-back-outline" size={32} color="black"onPress={() => setModalVisible(!modalVisible)}
                              style={{position: "absolute", left: 5, top: 5}}/>
                </View> :
                <ScrollView
                    contentContainerStyle={{backgroundColor: "white", flex: 1, justifyContent: "center", padding: 10}}>
                    <Button title={"back"} onPress={() => {
                        setChecks([])
                        setPickDay(true)
                        setModalVisible(false)
                    }}/>
                    <Text style={Styles.h2}>Add to shopping list</Text>
                    {recipe ? recipe.ingredients.map((e, i) => {
                        return <Pressable style={{justifyContent: "space-between", flexDirection: "row"}}
                                          onPress={() => {
                                              setChecks(prev => prev.map((e, index) => index == i ? !e : e))
                                          }
                                          } key={i}>
                            <Text>{e.name}</Text>
                            {checks[i] ?
                                <Ionicons name="ios-checkbox-sharp" size={24} color="black"/>
                                :
                                <Ionicons name="ios-checkbox-outline" size={24} color="black"/>}
                        </Pressable>
                    }) : <Text>Error</Text>}
                    <Button title={"Confirm Update"} onPress={() => updateShoppingList(recipe,day,checks)}/>
                </ScrollView>}
        </Modal>
            <Button title={"update shopping list"} onPress={() => setModalVisible(true)}/>
        </>
    }

    return (
        <View style={Styles.background}>
            <UpdateShoppingList/>
            <ScrollView style={{width: "90%"}}>
                {Object.keys(shoppingList).map((cat, index) => {
                    return <View key={index} style={{alignSelf: "flex-start", width: "100%"}}>
                        <Text style={Styles.shoppingListCategory}>{cat}</Text>
                        {Object.keys(shoppingList[cat]).map((e, i) => {
                            return <Pressable key={i}
                                              style={[checkboxes[cat][i] ? {backgroundColor: "#999"} : null, Styles.shoppingListItem]}
                                              onPress={() => {
                                                  let arr = Object.create(checkboxes)
                                                  arr[cat][i] = !arr[cat][i]
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