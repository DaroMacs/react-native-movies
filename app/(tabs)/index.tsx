import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import fetchMovies from "@/services/api";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    error,
    isLoading,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full absolute z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        <View className="flex-1 mt-5 ">
          <SearchBar
            onPress={() => {
              router.push("/search");
            }}
            placeholder="Search for a movie"
          />

          {isLoading && (
            <ActivityIndicator size="large" color="#ab8bff" className="mt-5" />
          )}

          {movies?.results.map((movie: Movie) => (
            <Text className="text-white" key={movie.id}>
              {movie.title}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
