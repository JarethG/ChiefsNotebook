import {FlatList,Text, View} from "react-native";
import {Styles} from "../Styles";
import MyRecipes from "../Recipes/MyRecipes.json";
import Recipes from "../Recipes/recipes.json"
import * as React from "react";
import {RecipeDisplay} from "../Recipes/RecipeDisplay";
import {UpdateShoppingList} from "./Shopping";

export function Browse() {

    const RenderItem = ({recipe}) => {
        return<>
                <RecipeDisplay recipe={recipe}/>
                <UpdateShoppingList newRecipe={recipe}/>
            </>
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