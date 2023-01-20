import {Button, FlatList, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {Styles} from "../Styles";
import MyRecipes from "../Recipes/MyRecipes.json";
import Recipes from "../Recipes/recipes.json"
import Ingredients from "../Recipes/ingredients.json"
import * as React from "react";
import {RecipeDisplay} from "../Recipes/RecipeDisplay";
import {UpdateShoppingList} from "./Shopping";
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";

export function Browse() {

    const [pageToggle, setPageToggle] = useState(false)
    const [recipes,setRecipes] = useState([...Recipes, ...MyRecipes])

    const RenderItem = ({recipe}) => {
        return <>
            <RecipeDisplay recipe={recipe}/>
            <UpdateShoppingList newRecipe={recipe}/>
        </>
    }

    const Search = () => {

        const [suggestions, setSuggestions] = useState([])
        const [ingredientFilters,setIngredientFilters] = useState(["grated Parmesan cheese"])

        function getIngredientMatches(s) {
            return Ingredients.filter(e => e.includes(s.toLowerCase()))
        }

        function addIngredientFilter(e) {
            setIngredientFilters(prev=>[...prev,e])
        }

        function removeIngredientFilter(index) {
            setIngredientFilters(prev=>prev.filter((e,i)=>i!=index))
        }

        const IngredientTag = ({ingredientName,index}) => {
            return(
                <Pressable style={Styles.ingredient_tag} onPress={()=>removeIngredientFilter(index)}>
                    <Ionicons name="close-circle-outline" size={18} color="black" />
                    <Text>{ingredientName}</Text>
                </Pressable>
            )
        }

        function search() {
            let arr = [...Recipes, ...MyRecipes];
            ingredientFilters.forEach((e) => {
                arr = arr.filter(r => r.ingredients.some(i=>i.name==e))
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
                    ingredientFilters.map((e,i)=><IngredientTag key={i} ingredientName={e} index={i}/>)}
                </View>
                <ScrollView>
                    {
                        suggestions.map((e, index) =>
                            <Pressable onPress={()=>addIngredientFilter(e)} key={index}>
                                <Text style={Styles.search_box_suggestions}>{e}</Text>
                            </Pressable>
                        )
                    }
                </ScrollView>
                <Button title={"search"} onPress={()=>search()}/>
            </View>
        )
    }

    return (
        <View style={Styles.background}>
            <Button title={"switch"} onPress={() => setPageToggle(!pageToggle)}/>
            {pageToggle ?
                <FlatList data={recipes} keyExtractor={(item) => item} style={{width: "100%"}}
                          keyExtractor={(item, index) => index}
                          renderItem={({item, index}) => <RenderItem recipe={item} key={index}/>}/>
                :
                <Search/>
            }
        </View>
    );
}