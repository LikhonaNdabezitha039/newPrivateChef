//The import of the important libraries on the app
import React, { useMemo, useState, createContext, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList,
         ScrollView, Image, Keyboard } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "@expo/vector-icons/Ionicons"; //For the icons
import { StatusBar } from "expo-status-bar";

//Types of data structures
//A single menu item stored in the catalogue
type StoreItem = {
  id: string;
  name: string;
  price: number; // numeric price (in Rands)
  category: "Starters" | "Main Courses" | "Desserts";
  description: string;
  image: any; 
};

//Context payload to share menu between screens.
type MenuContextType = {
  productCatalogue: StoreItem[];
  addNewItem: (item: Omit<StoreItem, "id" | "image">) => void;
  removeItem: (id: string) => void;
};

//Menu context
const MenuContext = createContext<MenuContextType | undefined>(undefined);

//Initial menu data (converted to typed objects) Prices are numeric so averages calculate correctly.
const initialMenu: StoreItem[] = [
  // Starters
  {
    id: "s1",
    name: "Cheesy Chicken Quesadilla",//The first item on the menu of the chef
    price: 95.99,
    category: "Starters",
    description:
      "Your choice of Blueberry Watermelon, Dragon Fruit Raspberry, Very Cherry Berry, Blue Lemonade or Strawberry & Passion Fruit.",
    image: require("./Images/cheesy_q.png"),
  },
  {
    id: "s2",
    name: "Buffalo Wings (12)",
    price: 139.99,
    category: "Starters",
    description: "Served with Durky Sauce and Roquefort Dressing.",
    image: require("./Images/buffalo_wings.png"),
  },
  {
    id: "s3",
    name: "Spicy Chicken Livers",
    price: 84.99,
    category: "Starters",
    description: "Served with a toasted Portuguese garlic roll.",//The item description
    image: require("./Images/spicy_livers.png"),
  },
  {
    id: "s4",
    name: "Queen Prawns",
    price: 97.99,
    category: "Starters",
    description:
      "4 Queen prawns grilled in your choice of lemon OR garlic butter. Served on savoury rice with peri-peri sauce.",
    image: require("./Images/queen_prawns.png"),
  },
  //Main Courses of what the chef has prepared on the menu
  {
    id: "m1",
    name: "Ribs & Quarter Chicken",
    price: 349.99,
    category: "Main Courses",
    description: "Marinated pork ribs with a quarter chicken.",
    image: require("./Images/ribs.png"),
  },
  {
    id: "m2",
    name: "Rump & Buffalo Wings",
    price: 235.99, //the price of the meal
    category: "Main Courses",
    description: "200g Rump steak and buffalo wings.",
    image: require("./Images/rump_wings.png"),
  },
  {
    id: "m3",
    name: "Cheddamelt Steak 300g",//Name of the meal 
    price: 279.99,
    category: "Main Courses",
    description: "Marinated pork ribs with a quarter chicken.",
    image: require("./Images/cheddamelt.png"),//This is the image showing the meal
  },
  {
    id: "m4",
    name: "Pork Spare Ribs 800g",
    price: 330.99,
    category: "Main Courses",//The category of the meal 
    description: "Succulent pork spare ribs marinated in our great-tasting basting.",//And the discription of the meal explain what is the meal served with
    image: require("./Images/pork_ribs.png"),
  },
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
