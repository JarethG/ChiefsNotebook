import {Button, Image, Modal, Pressable, ScrollView, Text, View} from "react-native";
import {Styles} from "../Styles";
import * as React from "react";
import {localImage} from "../assets/localImageLoader";
import {useState} from "react";

export const RecipeDisplay = ({recipe,day}) => {
    const [modalVisible, setModalVisible] = useState(false);
    return <>
        <View style={Styles.mealCard}>
            <Text style={Styles.header}>{day}</Text>
            <Pressable onPress={() => {
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
        </View>

        <Modal
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
    </>
}