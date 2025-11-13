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
  //The Deserts which are prepared by the chef
  {
    id: "d1",
    name: "Malva Pudding",
    price: 65.99,
    category: "Desserts",
    description:
      "Baked sponge pudding topped with caramel syrup, served warm with vanilla soft serve.",
    image: require("./Images/malva.png"),
  },
  {
    id: "d2",
    name: "Peppermint Crisp Tart",
    price: 59.99,
    category: "Desserts",
    description:
      "Layers of cream and caramel sauce with crushed Peppermint Crisp pieces.",//The description of the desert
    image: require("./Images/peppermint.png"),
  },
  {
    id: "d3",
    name: "Creme Brulee",
    price: 59.99,
    category: "Desserts",
    description: "Vanilla custard topped with a thin layer of caramelised sugar.",
    image: require("./Images/creme_brulee.png"),
  },
  {
    id: "d4",
    name: "Strawberry Cream Cake",
    price: 80.50,//The price of the last item of the menu 
    category: "Desserts",
    description:
      "Layers of soft sponge, rich cream, and fresh strawberries finished with a glaze.",
    image: require("./Images/strawberry_cake.png"),
  },
];
export default function App() {
  //productCatalogue state holds both initial items and new items added by chef
  const [productCatalogue, setProductCatalogue] = useState<StoreItem[]>(initialMenu);
 
  const addNewItem = (item: Omit<StoreItem, "id" | "image">) => {
    //Trim and validate fields
    const name = item.name.trim();
    const category = item.category;
    const price = Number(item.price);
    const description = item.description.trim();

    if (!name || !category || Number.isNaN(price) || price <= 0) {
      // The validation, user should provide a valid input
      console.warn("Invalid item data; item not added.");
      return;
    }

    const newItem: StoreItem = {
      id: "u" + Date.now().toString(),
      name,
      price: Math.round(price * 100) / 100,
      category,
      description,
      image: require("./Images/chef_logo.png"), //logo of the chef
    };

    //When the new item is added, it will appear at the top so chef sees recently added items
    setProductCatalogue((prev) => [newItem, ...prev]);
    Keyboard.dismiss();
  };

  //Remove item immediately on the list of the menu items
  const removeItem = (id: string) => {
    setProductCatalogue((prev) => prev.filter((it) => it.id !== id));
  };

  const menuContextValue: MenuContextType = useMemo(
    () => ({ productCatalogue, addNewItem, removeItem }),
    [productCatalogue]
  );

  //Bottom navigator which displays on all the screens of the app 
  const Tab = createBottomTabNavigator();

  return (
    <MenuContext.Provider value={menuContextValue}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: "#e63946",
            tabBarStyle: { backgroundColor: "#f7e6e6" },
            tabBarLabelStyle: { fontWeight: "600" },
            //tab icons using icons
            tabBarIcon: ({ color, size }) => {
              let name = "home";
              if (route.name === "Home") name = "home-outline";
              else if (route.name === "Add Item") name = "add-circle-outline";
              else if (route.name === "Filter") name = "filter-outline";
              return <Ionicons name={name as any} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Add Item" component={AddItemScreen} />
          <Tab.Screen name="Filter" component={FilterScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </MenuContext.Provider>
  );
}
//HomeScreen shows full menu grouped by course
//Shows average price for each course after the last item of that course
function HomeScreen(){
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("MenuContext not found");
  const { productCatalogue } = ctx;

  //Helper to render a course and its average
  const CourseBlock: React.FC<{ courseName: StoreItem["category"] }> = ({ courseName }) => {
    //Filter items by category in the same order they are stored
    const items = productCatalogue.filter((i) => i.category === courseName);

    //compute average price
    const avg =
      items.length > 0 ? items.reduce((sum, it) => sum + Number(it.price), 0) / items.length : 0;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
