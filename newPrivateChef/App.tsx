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
    name: "Cheesy Chicken Quesadilla",
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
    description: "Served with a toasted Portuguese garlic roll.",
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
