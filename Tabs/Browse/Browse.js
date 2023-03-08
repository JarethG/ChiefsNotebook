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
import {SearchResults} from "./Search";

export function Browse() {

    const [recipes, setRecipes] = useState([...Recipes, ...MyRecipes])
    const [filter, setFilter] = useState("names")

    const RenderItem = ({recipe}) => {
        return <>
            <RecipeDisplay recipe={recipe}/>
            <UpdateShoppingList newRecipe={recipe}/>
        </>
    }

    function SearchBar() {
        const [searchString, update] = useState("");
        return <View>
            <Text style={Styles.h2}>Filter by recipe {filter}'s</Text>
            <View style={Styles.search_bar_container}>
                <View style={Styles.search_bar}>
                    <Ionicons name="search" size={24} color="black"/>
                    <TextInput
                        style={Styles.search_bar_text}
                        onChangeText={(text) => update(text)}
                        value={searchString}
                        placeholder={"Search..."}/>
                </View>
                <Pressable style={Styles.filter_container} onPress={()=>setFilter(filter=="names"?"ingredient":"names")}>
                    <Ionicons name="filter" size={24} color="black"/>
                </Pressable>
            </View>
            {searchString!=""?
            <SearchResults searchString={searchString} filter={filter}/>
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