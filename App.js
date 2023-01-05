import * as React from 'react';
import {Ionicons} from "@expo/vector-icons";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useContext, useEffect, useState} from "react";
import {Browse} from "./Tabs/Browse";
import {MealPlan} from "./Tabs/MealPlan";
import {History} from "./Tabs/History";
import {Settings} from "./Tabs/Settings"

import MealPlanContext from "./Tabs/MealPlanContext";
import {Shopping} from "./Tabs/Shopping";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

export default function App() {

    const [meals, setMeals] = useState(Array(7).fill(undefined))
    const value = {meals, setMeals}

    useEffect(() => {
        getData().then(r => setMeals(r))
    }, [])

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('current-week')
            return jsonValue != null ? JSON.parse(jsonValue).map(e=>e==null?undefined:e) : Array(7).fill(undefined);
        } catch (e) {
            console.log("reading meal data produced an error")
        }
    }

    return (
        <NavigationContainer>
            <MealPlanContext.Provider value={value}>
                <Tab.Navigator initialRouteName="Shopping">
                    <Tab.Screen name="Shopping" component={Shopping} options={{
                        tabBarIcon: ({color}) => <Ionicons name="bar-chart-outline" size={24} color="black"/>
                    }}/>
                    <Tab.Screen name="Meal Plan" component={MealPlan} options={{
                        tabBarIcon: ({color}) => <Ionicons name="calendar-outline" size={24} color="black"
                                                           options={{unmountOnBlur: true}}/>
                    }}/>
                    <Tab.Screen name="Browse" component={Browse} options={{
                        tabBarIcon: ({color}) => <Ionicons name="search" size={24} color="black"/>
                    }}/>
                    <Tab.Screen name="Settings" component={Settings} options={{
                        tabBarIcon: ({color}) => <Ionicons name="settings-outline" size={24} color="black"/>
                    }}/>
                </Tab.Navigator>
            </MealPlanContext.Provider>
        </NavigationContainer>
    );
}