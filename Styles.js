import {StyleSheet} from "react-native";

export const Styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:"100%"
    },
    header: {
        fontSize: 24,
        fontWeight: "bold"
    },
    recipe_steps: {
        padding:5,
    },
    mealCard: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    shoppingListCategory : {
        fontSize:30,
        borderColor:"grey",
        borderTopWidth:1,
        borderBottomWidth:1,
        backgroundColor:"grey",
    },
    shoppingListItem : {
        borderBottomWidth:1,
        padding:5
    }
});