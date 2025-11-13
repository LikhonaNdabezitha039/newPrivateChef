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
    
    return (
      <View>
        <Text style={styles.sectionHeader}>{courseName}</Text>
        {items.map((item) => (
          <View key={item.id} style={styles.menuItem}>
            <Image source={item.image} style={styles.menuImage} />
            <Text style={styles.menuItemTitle}>
              {item.name} - R{item.price.toFixed(2)}
            </Text>
            <Text style={styles.menuDescription}>{item.description}</Text>
          </View>
        ))}
        {/* Display average at the bottom of each course */}
        {items.length > 0 && (
          <Text style={styles.courseAverage}>
            Average price ({courseName}): R{avg.toFixed(2)}
          </Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./Images/chef_logo.png")} style={styles.logoImage} />
        <Text style={styles.appName}>Christofel</Text>
      </View>

      <Text style={styles.menuTitle}>Full Menu</Text>

      <CourseBlock courseName="Starters" />
      <CourseBlock courseName="Main Courses" />
      <CourseBlock courseName="Desserts" />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

//Add menu Item Screen Chef can add menu items to menu
//Price input allows numbers and a single dot (which is represent the a comma decimal separator)
//Remove button deletes item from the menu items list
//The total number of items in menu is shown on top of the current items list
function AddItemScreen(){
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("MenuContext not found");
  const { productCatalogue, addNewItem, removeItem } = ctx;

  //Local form state
  const [itemName, setItemName] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<StoreItem["category"]>("Starters");
  const [itemPrice, setItemPrice] = useState<string>(""); //keep as string for typing and numeric sanitization
  const [itemDescription, setItemDescription] = useState<string>("");

  //The price input handler to allow only numbers and a single dot
  const handlePriceChange = (text: string) => {
    const sanitized = text.replace(/[^0-9.]/g, "");
    const parts = sanitized.split(".");
    const normalized = parts.length <= 2 ? sanitized : parts[0] + "." + parts.slice(1).join("");
    setItemPrice(normalized);
  };

  //Add action linked to Add button.
  //Uses addNewItem from context with a validation.
  const onAdd = () => {
    if (!itemName.trim() || !itemCategory || !itemPrice.trim()) {
      //simple visual feedback
      alert("Please enter the name, category and price.");
      return;
    }

    //call context method (it validates prices)
    addNewItem({
      name: itemName,
      category: itemCategory,
      price: Number(itemPrice),
      description: itemDescription,
    });

    //clear fields
    setItemName("");
    setItemCategory("Starters");
    setItemPrice("");
    setItemDescription("");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./Images/chef_logo.png")} style={styles.logoImage} />
        <Text style={styles.appName}>Christofel</Text>
      </View>
      <Text style={styles.title}>Add Menu Item</Text>
      <TextInput
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
        style={styles.input}
      />

      {/*Category dropdown menu*/}
      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={itemCategory}
          onValueChange={(val) => setItemCategory(val as StoreItem["category"])}
          style={styles.picker}
        >
          <Picker.Item label="Starters" value="Starters" />
          <Picker.Item label="Main Courses" value="Main Courses" />
          <Picker.Item label="Desserts" value="Desserts" />
        </Picker>
      </View>

      {/*Price input — numeric values only*/}
      <TextInput
        placeholder="Item Price (e.g. 56.99)"
        value={itemPrice}
        onChangeText={handlePriceChange}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Item Description"
        value={itemDescription}
        onChangeText={setItemDescription}
        style={styles.input}
      />

      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <Button title="Add Item" onPress={onAdd} color="#e63946" />
      </View>

      {/*Total number of items in the menu (rubric requirement)*/}
      <Text style={styles.totalCount}>Total Items: {productCatalogue.length}</Text>

      <Text style={[styles.menuTitle, { marginTop: 10 }]}>Current Menu Items</Text>

      {/*List of items with a Remove button*/}
      <FlatList
        data={productCatalogue}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <View style={styles.displayItem}>
            <Text style={styles.displayText}>
              {item.name} - R{item.price.toFixed(2)}
            </Text>
            <Text style={styles.displayText}>
              {item.category} - {item.description}
            </Text>
            <View style={{ marginTop: 10 }}>
              {/*Remove item from menu button*/}
              <Button title="Remove" color="#e63946" onPress={() => removeItem(item.id)} />
            </View>
          </View>
        )}
        style={styles.itemList}
      />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

//FilterScreen, the user selects course from the dropdown menu
//Filtered items are displayed only for the chosen course
function FilterScreen(){
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("MenuContext not found");
  const { productCatalogue } = ctx;
  const [selected, setSelected] = useState<StoreItem["category"]>("Starters");

  const filtered = productCatalogue.filter((i) => i.category === selected);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./Images/chef_logo.png")} style={styles.logoImage} />
        <Text style={styles.appName}>Christofel</Text>
      </View>

      {/*The title of the screen*/}
      <Text style={styles.title}>Filter by Courses</Text>

      <View style={styles.pickerWrap}>{/*The dropdown menu*/}
        <Picker selectedValue={selected} onValueChange={(v) => setSelected(v as any)} style={styles.picker}>
          <Picker.Item label="Starters" value="Starters" />
          <Picker.Item label="Main Courses" value="Main Courses" />
          <Picker.Item label="Desserts" value="Desserts" />
        </Picker>
      </View>

      <Text style={[styles.sectionHeader, { marginLeft: 15 }]}>{selected}</Text>

      {filtered.map((item) => (
        <View key={item.id} style={styles.menuItem}>
          <Image source={item.image} style={styles.menuImage} />
          <Text style={styles.menuItemTitle}>
            {item.name} - R{item.price.toFixed(2)}
          </Text>
          <Text style={styles.menuDescription}>{item.description}</Text>
        </View>
      ))}
      <StatusBar style="auto" />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
