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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
