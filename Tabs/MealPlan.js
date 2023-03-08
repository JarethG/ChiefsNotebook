import {useContext} from "react";
import {FlatList, Text, View} from "react-native";
import {Styles} from "../Styles";
import * as React from "react";
import MealPlanContext, {StoreAsyncData} from "./MealPlanContext";
import {Ionicons} from "@expo/vector-icons";
import {RecipeDisplay} from "../Recipes/RecipeDisplay";

export function MealPlan() {


    const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const {meals, setMeals} = useContext(MealPlanContext)

    function removeMeal(index) {
        let arr = meals
        arr[index] = undefined;
        setMeals([...arr])
        StoreAsyncData(arr, "current-week").then(r => console.log("meal successfully removed"))
    }

    const RenderItem = ({recipe,index}) => {
        return recipe==undefined?null:<>
            <RecipeDisplay recipe={recipe} day={Days[index]}/>
            <Ionicons name="remove-circle-outline" size={50} color="black" onPress={() =>removeMeal(index)}
                      style={{position: "absolute", right: 5,top:5}}/>
            </>
    }

    return (
        <View style={Styles.background}>
            {meals.every(e=> e==undefined) ?
                <Text style={{alignSelf:"center"}}>You have no meals selected, try finding some in the Browse tab below.</Text>
                :
                <FlatList data={meals} keyExtractor={(item) => item} style={{width: "100%"}}
                          keyExtractor={(item, index) => index}
                          renderItem={({item, index}) => <RenderItem recipe={item} index={index} key={index}/>}/>
            }
        </View>
    );
}