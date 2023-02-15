import {RecipeDisplay} from "../../Recipes/RecipeDisplay";
import {UpdateShoppingList} from "../Shopping";
import {useEffect, useState} from "react";
import Ingredients from "../../Recipes/ingredients.json";
import {Button, Image, Modal, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {Styles} from "../../Styles";
import {Ionicons} from "@expo/vector-icons";
import Recipes from "../../Recipes/recipes.json";
import MyRecipes from "../../Recipes/MyRecipes.json";
import * as React from "react";
import {localImage} from "../../assets/localImageLoader";



const Search = () => {

    const [suggestions, setSuggestions] = useState([])
    const [ingredientFilters, setIngredientFilters] = useState(["grated Parmesan cheese"])
    const [recipes, setRecipes] = useState([...Recipes, ...MyRecipes])
    const [pageToggle, setPageToggle] = useState(false)

    function getIngredientMatches(s) {
        return Ingredients.filter(e => e.includes(s.toLowerCase()))
    }

    function addIngredientFilter(e) {
        setIngredientFilters(prev => [...prev, e])
    }

    function removeIngredientFilter(index) {
        setIngredientFilters(prev => prev.filter((e, i) => i != index))
    }

    const IngredientTag = ({ingredientName, index}) => {
        return (
            <Pressable style={Styles.ingredient_tag} onPress={() => removeIngredientFilter(index)}>
                <Ionicons name="close-circle-outline" size={18} color="black"/>
                <Text>{ingredientName}</Text>
            </Pressable>
        )
    }

    function search() {
        let arr = [...Recipes, ...MyRecipes];
        ingredientFilters.forEach((e) => {
            arr = arr.filter(r => r.ingredients.some(i => i.name == e))
        })
        setRecipes(arr);
        setPageToggle(!pageToggle)
    }

    return (
        <View style={Styles.background}>
            <TextInput placeholder={"Search..."}
                       onChangeText={(s) => setSuggestions(getIngredientMatches(s))}
                       style={Styles.search_box_text}/>
            <View style={Styles.ingredient_tag_container}>{
                ingredientFilters.map((e, i) => <IngredientTag key={i} ingredientName={e} index={i}/>)}
            </View>
            <ScrollView>
                {
                    suggestions.map((e, index) =>
                        <Pressable onPress={() => addIngredientFilter(e)} key={index}>
                            <Text style={Styles.search_box_suggestions}>{e}</Text>search
                        </Pressable>
                    )
                }
            </ScrollView>
            <Button title={"search"} onPress={() => search()}/>
        </View>
    )
}

export const SearchResults = ({searchString}) => {

    useEffect(()=> {
        setSuggestions(getRecipeMatches(searchString));
    },[searchString])

    const [suggestions, setSuggestions] = useState([])
    const recipes = [...Recipes, ...MyRecipes]
    const [zoom,setZoom] = useState();

    function getRecipeMatches(s) {
        return recipes.filter(recipe => recipe.name.toLowerCase().includes(s.toLowerCase()))
    }

    return (
        <View style={{flex:1}}>
            {zoom?<Modal transparent={true}>
                <Image source={zoom} style={Styles.search_result_zoom}/>
            </Modal>:null}
            <ScrollView>
                {suggestions.map((recipe, index) =>
                        <View key={index} style={Styles.search_result_container}>
                            <Pressable onPressIn={()=>setZoom(recipe.imageURL ? {uri: recipe.imageURL} : localImage(recipe.name))}
                            onPressOut={()=>setZoom(undefined)}
                            style={Styles.search_result_image}>
                                <Image source={recipe.imageURL ? {uri: recipe.imageURL} : localImage(recipe.name)} style={Styles.search_result_image}/>
                            </Pressable>
                            <Text style={Styles.search_result_text}>{recipe.name}</Text>
                            <UpdateShoppingList newRecipe={recipe}/>
                        </View>
                    )
                }
            </ScrollView>
        </View>
    )
}


export default Search