import React from "react";
import {createAppContainer, createStackNavigator} from "react-navigation";
import {Questions} from "./modules/questions";

const MainNavigator = createStackNavigator(
    {
        Questions: {
            screen: Questions
        },
    },
    {
        initialRouteName: "Questions",
        headerMode: 'none'
    }
);

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;
