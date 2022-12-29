import {useContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Button, FlatList, Image, Modal, Pressable, ScrollView, Text, View} from "react-native";
import {Styles} from "../Styles";
import {Ionicons} from "@expo/vector-icons";
import {localImage} from "../assets/localImageLoader";
import MyRecipes from "../Recipes/MyRecipes.json";
import Recipes from "../Recipes/recipes.json"
import * as React from "react";
import MealPlanContext from "./MealPlanContext";

export function Browse() {

    const {meals, setMeals} = useContext(MealPlanContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [recipe, setRecipe] = useState({name: "", ingredients: [], steps: []});

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('current-week', jsonValue)
        } catch (e) {
            console.log("storage error while adding new recipe")
        }
    }

    function addRecipeToPlan(recipe, index) {
        let arr = meals
        arr[index] = recipe;
        setMeals([...arr])
        setModalVisible(false)
        storeData(arr)
    }


    const RenderItem = ({recipe}) => {
        const [adding, setAdding] = useState(false)
        return <View style={Styles.mealCard}>
            <Ionicons name="add-circle-outline" size={50} color="black" onPress={() => setAdding(!adding)}
                      style={{position: "absolute", right: 0}}/>
            <Pressable onPress={() => {
                setRecipe(recipe);
                setModalVisible(true)
            }}>
                {recipe.imageURL ?
                    <Image source={{uri: recipe.imageURL}} style={{width: 200, height: 200}}/>
                    :
                    <Image source={localImage(recipe.name)} style={{width: 200, height: 200}}/>

                }
                <Text>
                    {recipe.name}
                </Text>
            </Pressable>
            {adding ? <View style={{
                position: "absolute",
                right: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}>
                {/*{Days.map((e,i)=><Button title={e} key={i}/>)}*/}
                {meals.map((e, i) => <Button title={(e == undefined ? "empty" : e.name)}
                                             onPress={() => addRecipeToPlan(recipe, i)} key={i}/>)}
            </View> : null}
        </View>
    }

    const Recipe = () => {
        return <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <ScrollView style={{backgroundColor: "white", flex: 1}}>
                <Text style={Styles.header}> {recipe.name}</Text>
                {recipe.ingredients.map((e, i) => {
                    return <Text key={i}>
                        {e.quantity} {e.name}
                        {/*{e.type}*/}
                    </Text>
                })}
                {recipe.steps.map((e, i) => {
                    return <Text key={i} style={Styles.recipe_steps}>
                        {e}
                    </Text>
                })}
            </ScrollView>
            <View>
                <Button title={"back"} onPress={() => setModalVisible(false)}/>
            </View>
        </Modal>
    }


    return (
        <View style={Styles.background}>
            <Text>Search</Text>
            <FlatList data={[...Recipes,...MyRecipes]} keyExtractor={(item) => item} style={{width: "100%"}}
                      keyExtractor={(item, index) => index}
                      renderItem={({item, index}) => <RenderItem recipe={item} key={index}/>}/>
            <Recipe/>
        </View>
    );
}