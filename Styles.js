import {StyleSheet} from "react-native";

export const Styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
    header: {
        fontSize: 24,
        fontWeight: "bold"
    },
    h2: {
        fontSize: 18,
        fontWeight: "bold",
        paddingTop:5,
        paddingBottom:5,
    },
    meal_card: {
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
    meal_card_image: {
        width: 200,
        height: 200,
        borderRadius:5
    },
    shoppingListCategory: {
        fontSize: 30,
        borderColor: "grey",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: "grey",
    },
    shoppingListItem: {
        borderBottomWidth: 1,
        padding: 5
    },
    recipe_name: {
        fontSize: 24,
        fontWeight: "bold",
        paddingBottom:20,
    },
    recipe_step: {
        paddingTop:5,
        paddingBottom:5,

        color:"#484848",
    },
    recipe_ingredient: {
        color:"grey",
        paddingBottom:5,
    },
    recipe_scrollView: {
        backgroundColor: "white",
        flex: 1,
        top: -20,
        borderRadius: 10,
        paddingHorizontal:15
    }
});