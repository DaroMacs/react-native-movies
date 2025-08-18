import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import fetchMovies from "@/services/api";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    error,
    isLoading,
    fetchData,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const getMovies = setTimeout(async () => {
      if (searchQuery.trim()) {
        console.log(searchQuery);
        await fetchData();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(getMovies);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 w-full absolute z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row items-center justify-center mt-20">
              <Image source={icons.logo} className="w-12 h-10 " />
            </View>

            <View className="my-5">
              <SearchBar
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
                placeholder="Search movies"
              />
            </View>

            {isLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-white text-center mt-10">
                Error: {error.message}
              </Text>
            )}

            {!isLoading &&
              !error &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-white font-bold text-xl">
                  Search results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !isLoading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
