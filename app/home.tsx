import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import className from "twrnc";
import PersonIcon from "@/assets/PersonIcon";
import Bellicon from "@/assets/Bellicon";
import SearchIcon from "@/assets/SearchIcon";
import categories from "../assets/data/categories.json"; // Assuming you still use local categories for display

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [recipes, setRecipes] = useState([]); // State to hold recipes
  const [loading, setLoading] = useState(false); // State to handle loading
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  // Fetch recipes when category is selected
  const fetchRecipesByCategory = async (category) => {
    setLoading(true);
    setSelectedCategory(category);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      setRecipes(data.meals || []); // Handle the case where there are no meals
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
    setLoading(false);
  };

  // Filter categories based on search query
  const filteredCategories = categories.categories.filter(category =>
    category.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={className`flex-1`}>
        {/* Header */}
        <View style={className`p-5 flex-row items-center justify-between`}>
          <PersonIcon />
          <Bellicon />
        </View>

        {/* Greeting Text */}
        <View style={className`p-5 pt-0`}>
          <Text style={className`font-semibold text-lg`}>Hello, Spaqoo</Text>
          <Text style={className`font-bold text-3xl`}>
            Make your own food, stay at
            <Text style={className`text-orange-500`}> home </Text>
          </Text>
        </View>

        {/* Search Input */}
        <View
          style={className`bg-gray-200 p-1 px-2 rounded-full mx-5 flex-row items-center justify-start gap-2`}
        >
          <TextInput
            placeholder="Search category (e.g., beef)"
            style={className`flex-1 text-lg font-semibold text-gray-500 p-3 rounded-l-full`}
            value={searchQuery} // Bind the search query to the TextInput
            onChangeText={setSearchQuery} // Update state on input change
          />
          <SearchIcon />
        </View>

        {/* Categories */}
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={className`gap-5 p-5`}
            data={filteredCategories} // Use filtered categories for display
            keyExtractor={(item) => item.idCategory}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => fetchRecipesByCategory(item.strCategory)} // Fetch recipes on category press
              >
                <View>
                  <Image
                    source={{ uri: item.strCategoryThumb }}
                    style={className`h-12 w-12 rounded-full`}
                  />
                  <Text
                    style={className`font-semibold text-gray-500 mt-1 text-center`}
                  >
                    {item.strCategory}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Recipes Section */}
        <View>
          <Text style={className`px-5 text-3xl font-semibold`}>Recipes</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#ff6347" />
          ) : selectedCategory === null ? (
            <FlatList
              data={filteredCategories} // Display filtered categories if no category is selected
              numColumns={2}
              keyExtractor={(item) => item.idCategory}
              contentContainerStyle={className`p-5`}
              columnWrapperStyle={className`justify-between mb-5`}
              renderItem={({ item }) => (
                <View>
                  <Image
                    source={{ uri: item.strCategoryThumb }}
                    style={className`w-42 h-28 rounded-lg`}
                  />
                  <Text
                    style={className`font-semibold text-gray-500 mt-1 text-center`}
                  >
                    {item.strCategory}
                  </Text>
                </View>
              )}
            />
          ) : recipes.length === 0 ? (
            <Text style={className`text-center text-gray-500 mt-5`}>
              No recipes found for this category. Please try another category.
            </Text>
          ) : (
            <FlatList
              data={recipes} // Use the fetched recipes here
              numColumns={2}
              keyExtractor={(item) => item.idMeal}
              contentContainerStyle={className`p-5`}
              columnWrapperStyle={className`justify-between mb-5`}
              renderItem={({ item }) => (
                <View>
                  <Image
                    source={{ uri: item.strMealThumb }}
                    style={className`w-42 h-28 rounded-lg`}
                  />
                  <Text
                    style={className`font-semibold text-gray-500 mt-1 text-center`}
                  >
                    {item.strMeal.length > 20
                      ? `${item.strMeal.slice(0, 20)}...`
                      : item.strMeal}
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
