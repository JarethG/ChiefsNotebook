import {Button, Modal, Pressable, ScrollView, Text, View} from "react-native";
import {Styles} from "../Styles";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import MealPlanContext, {StoreAsyncData} from "./MealPlanContext";
import Blacklist from "../Recipes/blacklist.json";
import {Ionicons} from "@expo/vector-icons";

export function Shopping() {

    const {meals, setMeals} = useContext(MealPlanContext)
    const Categories = ["pantry", "baking", "dairy", "fruit", "vegetable", "meat", "condiment", "misc", ""]
    const [shoppingList, setShoppingList] = useState({})

    function createShoppingList() {
        let list = {}
        Categories.forEach(e => {
            list[e] = {}
        })
        meals.map(meal => {
            if (meal !== undefined) meal.ingredients.forEach(ingredient => {
                if (Blacklist.findIndex(e => ingredient.name.includes(e)) < 0 && ingredient.onList) {
                    let obj = list[ingredient.type][ingredient.name]
                    obj == undefined ?
                        list[ingredient.type][ingredient.name] = {count: 1, meals: [meal.name], volumes: [ingredient.quantity]}
                        :
                        list[ingredient.type][ingredient.name] = {
                            count: obj.count + 1,
                            meals: [...obj.meals, meal.name],
                            volumes: [...obj.volumes,ingredient.quantity],
                        };
                }
            })
        })
        return list
    }

    useEffect(() => {
        setShoppingList(createShoppingList())
    }, [meals])

    const RenderItem =({category, ingredient})=> {
        const count = shoppingList[category][ingredient].count;
        const [expanded,setExpanded] = useState(false)
        const [checked,setChecked] = useState(false)
       return <Pressable
                   style={[checked ? {backgroundColor: "#999"} : null, Styles.shoppingListItem]}
                   onPress={() => {
                      setChecked(!checked)
                   }}>
           <View style={{flexDirection:"row"}}>
           <Text>{count} {ingredient} </Text>
               <Ionicons name={expanded?"caret-up-circle-outline":"caret-down-circle-outline"} size={24} color="black" onPress={()=>setExpanded(!expanded)}/>
           </View>
           {expanded?<View>{shoppingList[category][ingredient].meals.map((e,i)=> {
              return <Text key={i}>{JSON.stringify(e)} {shoppingList[category][ingredient].volumes[i]}</Text>
           })}</View>
               :null}
        </Pressable>
    }

    return (
        <View style={Styles.background}>

            <ScrollView style={{width: "90%"}}>
                {Object.keys(shoppingList).map((cat, index) => {
                    return <View key={index} style={{alignSelf: "flex-start", width: "100%"}}>
                        <Text style={Styles.shoppingListCategory}>{cat}</Text>
                        {Object.keys(shoppingList[cat]).map((e, i) => {
                            return <RenderItem category={cat} ingredient={e} key={i}/>
                        })}
                    </View>
                })}
            </ScrollView>
            <UpdateShoppingList/>
        </View>
    );
}

export const UpdateShoppingList = ({newRecipe}) => {
    const {meals, setMeals} = useContext(MealPlanContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [recipe, setRecipe] = useState();
    const [day, setDay] = useState()

    function updateShoppingList(recipe, index) {
        let arr = meals
        arr[index] = recipe;
        setMeals([...arr])
        StoreAsyncData(arr, "current-week").then(r => console.log("meal successfully added"))
    }


    return <><Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
    >
        {recipe == undefined ?
            <View style={Styles.meal_card}>
                {meals.map((e, i) => e != undefined ? <View style={{margin: 5}} key={i}>
                    <Button title={e.name}
                            onPress={() => {
                                setRecipe(e)
                                setDay(i)
                            }}/></View> : newRecipe ?
                    <Button key={i} title={"no recipe yet"} onPress={() => {
                        setRecipe(newRecipe)
                        setDay(i)
                    }}/> : null)}
                <Ionicons name="chevron-back-outline" size={32} color="black"
                          onPress={() => setModalVisible(!modalVisible)}
                          style={{position: "absolute", left: 5, top: 5}}/>

            </View> :
            <ScrollView
                contentContainerStyle={{backgroundColor: "white", flex: 1, justifyContent: "center", padding: 10}}>
                <Button title={"back"} onPress={() => {
                    setRecipe(undefined)
                }}/>
                <Text style={Styles.h2}>Add to shopping list</Text>
                {recipe.ingredients.map((e, i) => {
                    return <Pressable style={{justifyContent: "space-between", flexDirection: "row"}}
                                      onPress={() => {
                                          setRecipe(prev => {
                                              const newState = {...prev}
                                              newState.ingredients[i]["onList"] = !newState.ingredients[i]["onList"]
                                              return newState
                                          })
                                      }
                                      } key={i}>
                        <Text>{e.name}</Text>
                        <Ionicons name={e["onList"] ? "ios-checkbox-sharp" : "ios-checkbox-outline"} size={24}
                                  color="black"/>
                    </Pressable>
                })}
                <Button title={"check all"} onPress={()=> setRecipe(prev => {
                    const newState = {...prev}
                     newState.ingredients = prev.ingredients.map(e => {
                        return {...e, onList: true}
                    })
                    return newState
                })}/>
                <Button title={"Confirm Update"} onPress={() => {
                    setModalVisible(false);
                    setRecipe(undefined)
                    updateShoppingList(recipe,day)
                }}/>
            </ScrollView>}
    </Modal>
        <Ionicons name="add-circle-outline" size={50} color="black" onPress={() => setModalVisible(!modalVisible)}
                  style={{position: "absolute", right: 5, top: 5}}/>
    </>
}