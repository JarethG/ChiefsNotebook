import * as React from 'react';
import {Button, FlatList, Image, Modal, Pressable, ScrollView, Text, View} from 'react-native';
import {Styles} from "./Styles";
import {Ionicons} from "@expo/vector-icons";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Recipes from "./Recipes/recipes.json"
import {useState} from "react";

function History() {
    return (
        <View style={Styles.background}>
            <Text>History!</Text>
        </View>
    );
}

function MealPlan() {
    return (
        <View style={Styles.background}>
            <ScrollView style={{width: "100%"}} contentContainerStyle={{alignItems: "center"}}>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) =>
                    <View key={index} style={{width: "90%"}}>
                        <Text>{day}</Text>
                        <View style={Styles.mealCard}>
                            <View><Text>image</Text></View>
                            <Text>meal name</Text>
                            <View style={{flexDirection: "row", width: "100%", justifyContent: 'space-around'}}>
                                <Text>time</Text>
                                <Text>skill level</Text>
                                <Text>serving size</Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
            <Text>Home!</Text>
        </View>
    );
}

function Browse() {

    const [modalVisible, setModalVisible] = useState(false);
    const [recipe, setRecipe] = useState({name: "",ingredients:[],steps:[]});

    const RenderItem = ({recipe}) => {
        return <Pressable style={Styles.mealCard} onPress={() => {
            setRecipe(recipe);
            setModalVisible(true)
        }}>
            <Image source={{uri: recipe.imageURL}} style={{width: 200, height: 200}}/>
            <Text>
                {recipe.name}
            </Text>
        </Pressable>
    }

    const Recipe = () => {
        return <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <ScrollView style={ {backgroundColor: "white",flex:1}}>
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
            <FlatList data={Recipes} keyExtractor={(item) => item} style={{width: "100%"}}
                      keyExtractor={(item, index) => index}
                      renderItem={({item, index}) => <RenderItem recipe={item} key={index}/>}/>
            <Recipe/>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={Styles.background}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Browse">
                <Tab.Screen name="Meal Plan" component={MealPlan} options={{
                    tabBarIcon: ({color}) => <Ionicons name="calendar-outline" size={24} color="black"/>
                }}/>
                <Tab.Screen name="History" component={History} options={{
                    tabBarIcon: ({color}) => <Ionicons name="bar-chart-outline" size={24} color="black"/>
                }}/>
                <Tab.Screen name="Browse" component={Browse} options={{
                    tabBarIcon: ({color}) => <Ionicons name="search" size={24} color="black"/>
                }}/>
                <Tab.Screen name="Settings" component={SettingsScreen} options={{
                    tabBarIcon: ({color}) => <Ionicons name="settings-outline" size={24} color="black"/>
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}