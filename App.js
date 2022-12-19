import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Styles} from "./Styles";
import {Ionicons} from "@expo/vector-icons";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
            <ScrollView style={{width:"100%"}} contentContainerStyle={{alignItems:"center"}}>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) =>
                    <View key={index} style={{width:"90%"}}>
                        <Text>{day}</Text>
                        <View style={Styles.mealCard}>
                            <View><Text>image</Text></View>
                            <Text>meal name</Text>
                            <View style={{flexDirection:"row",width:"100%",justifyContent:'space-around'}}>
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
            <Tab.Navigator>
                <Tab.Screen name="Meal Plan" component={MealPlan} options={{
                    tabBarIcon: ({color}) => <Ionicons name="calendar-outline" size={24} color="black"/>
                }}/>
                <Tab.Screen name="History" component={History} options={{
                    tabBarIcon: ({color}) => <Ionicons name="bar-chart-outline" size={24} color="black"/>
                }}/>
                <Tab.Screen name="Settings" component={SettingsScreen} options={{
                    tabBarIcon: ({color}) => <Ionicons name="settings-outline" size={24} color="black"/>
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}