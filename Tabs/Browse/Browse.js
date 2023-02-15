import {Button, FlatList, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {Styles} from "../../Styles";
import MyRecipes from "../../Recipes/MyRecipes.json";
import Recipes from "../../Recipes/recipes.json"
import Ingredients from "../../Recipes/ingredients.json"
import * as React from "react";
import {RecipeDisplay} from "../../Recipes/RecipeDisplay";
import {UpdateShoppingList} from "../Shopping";
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import Search, {SearchResults} from "./Search";

export function Browse() {

    const [recipes, setRecipes] = useState([...Recipes, ...MyRecipes])

    const RenderItem = ({recipe}) => {
        return <>
            <RecipeDisplay recipe={recipe}/>
            <UpdateShoppingList newRecipe={recipe}/>
        </>
    }

    function SearchBar() {
        const [searchString, update] = useState("a");
        return <View>
            <View style={Styles.search_bar_container}>
                <View style={Styles.search_bar}>
                    <Ionicons name="search" size={24} color="black"/>
                    <TextInput
                        style={Styles.search_bar_text}
                        onChangeText={(text) => update(text)
                        }
                        value={searchString}
                        placeholder={"Search"}/>
                </View>
                <View style={Styles.filter_container}>
                    <Ionicons name="filter" size={24} color="black"/>
                </View>
            </View>
            {searchString!=""?
            <SearchResults searchString={searchString}/>
                :null}
        </View>
    }

    return (
        <View style={Styles.background}>
            <SearchBar/>
                <FlatList data={recipes} keyExtractor={(item) => item} style={{width: "100%"}}
                          keyExtractor={(item, index) => index}
                          renderItem={({item, index}) => <RenderItem recipe={item} key={index}/>}/>
        </View>
    );
}