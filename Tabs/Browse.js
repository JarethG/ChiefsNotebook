import {useContext, useState} from "react";
import {Button, FlatList, Image, Modal, Pressable, ScrollView, Text, View} from "react-native";
import {Styles} from "../Styles";
import {Ionicons} from "@expo/vector-icons";
import MyRecipes from "../Recipes/MyRecipes.json";
import Recipes from "../Recipes/recipes.json"
import * as React from "react";
import MealPlanContext, {StoreAsyncData} from "./MealPlanContext";
import {RecipeDisplay} from "../Recipes/RecipeDisplay";

export function Browse() {

    const {meals, setMeals} = useContext(MealPlanContext)

    function addRecipeToPlan(recipe, index,checks) {
        let arr = meals
        recipe.ingredients.forEach((e,i)=>e["onList"]=checks[i])
        arr[index] = recipe;
        setMeals([...arr])
        StoreAsyncData(arr, "current-week").then(r => console.log("meal successfully added"))
    }


    const RenderItem = ({recipe}) => {
        const [adding, setAdding] = useState(false)
        const [pickDay, setPickDay] = useState(false)
        const [checks,setChecks] = useState(Array(recipe.ingredients.length).fill(false))

        return !adding ?
            <>
                <RecipeDisplay recipe={recipe}/>
                <Ionicons name="add-circle-outline" size={50} color="black" onPress={() => setAdding(!adding)}
                          style={{position: "absolute", right: 5, top: 5}}/>
            </> :
            pickDay?
                <View style={Styles.meal_card}>
                    {meals.map((e, i) => <View style={{margin: 5}} key={i}>
                        <Button title={(e == undefined ? "empty" : e.name)}
                                onPress={() => addRecipeToPlan(recipe,i,checks)}/></View>)}
                    <Ionicons name="remove-circle-outline" size={50} color="black" onPress={() => setAdding(!adding)}
                              style={{position: "absolute", right: 5, top: 5}}/>
                    <Ionicons name="chevron-back-outline" size={32} color="black"   onPress={()=> setPickDay(!pickDay)}
                              style={{position: "absolute", left: 5, top: 5}}/>
                </View>:
                <ScrollView contentContainerStyle={{backgroundColor:"white",flex:1,justifyContent:"center",padding:10}}>
                    <Button title={"back"} onPress={()=>setAdding(false)}/>
                    <Text style={Styles.h2}>Add to shopping list</Text>
                    {recipe?recipe.ingredients.map((e,i)=>{
                        return <Pressable style={{justifyContent:"space-between",flexDirection:"row"}} onPress={()=> {
                            setChecks(prev => prev.map((e,index)=>index==i?!e:e))}
                        } key={i}>
                            <Text>{e.name}</Text>
                            {checks[i]?
                                <Ionicons name="ios-checkbox-sharp" size={24} color="black"/>
                                :
                                <Ionicons name="ios-checkbox-outline" size={24} color="black" />}
                        </Pressable>
                    }):<Text>Error</Text>}
                    <Button title={"Pick day"} onPress={()=>setPickDay(true)}/>
                    <Button title={"Pick all"} onPress={()=>{
                        setChecks(prev => prev.map(()=>true))
                        setPickDay(true)
                    }}/>
                </ScrollView>

    }

    return (
        <View style={Styles.background}>
            <Text>Search</Text>
            <FlatList data={[...Recipes, ...MyRecipes]} keyExtractor={(item) => item} style={{width: "100%"}}
                      keyExtractor={(item, index) => index}
                      renderItem={({item, index}) => <RenderItem recipe={item} key={index}/>}/>
        </View>
    );
}