import {Button, Image, Modal, Pressable, ScrollView, Text, View} from "react-native";
import {Styles} from "../Styles";
import * as React from "react";
import {localImage} from "../assets/localImageLoader";
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";

export const RecipeDisplay = ({recipe, day}) => {
    const image = recipe.imageURL ? {uri: recipe.imageURL} : localImage(recipe.name);

    const [modalVisible, setModalVisible] = useState(false);
    return <>
        <View style={Styles.meal_card}>
            <Text style={Styles.header}>{day}</Text>
            <Pressable onPress={() => {
                setModalVisible(true)
            }}>
                <Image source={image} style={Styles.meal_card_image}/>
                <Text>
                    {recipe.name}
                </Text>
            </Pressable>
        </View>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        onRequestClose={()=>setModalVisible(false)}>
            <View style={{backgroundColor: "white", flex: 1}}>
                <Image source={image} style={{postition: "absolute", width: "100%", height: "30%"}}/>
                <Pressable style={{position: "absolute",top:0,flexDirection:"row",alignItems:"center",backgroundColor:"rgba(160,160,160,0.5)",borderRadius:5}}
                           onPress={() => setModalVisible(false)}>
                    <Ionicons name="chevron-back-outline" size={32} color="black"/>
                    <Text style={{fontSize:16}}>All Recipes</Text>
                </Pressable>
                <ScrollView style={Styles.recipe_scrollView}>
                    <Text style={Styles.recipe_name}>{recipe.name}</Text>
                    <Text style={Styles.h2}>Ingredients</Text>
                    {recipe.ingredients.map((e, i) => {
                        return <Text key={i} style={Styles.recipe_ingredient}>
                            {e.quantity} {e.name}
                            {/*{e.type}*/}
                        </Text>
                    })}
                    <Text style={Styles.h2}>Recipe</Text>
                    {recipe.steps.map((e, i) => {
                        return <Text key={i} style={Styles.recipe_step}>{e}</Text>
                    })}
                </ScrollView>
            </View>
        </Modal>

    </>
}