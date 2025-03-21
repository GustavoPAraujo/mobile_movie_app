import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import { images } from '@/constants/images'
import { icons } from '@/constants/icons';

import MoviesCard from '@/components/MoviesCard'
import SearchBar from '@/components/SearchBar'

import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from '@/services/appwrite';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');


  const {
    data: movies,
    loading: moviesLoading, 
    error: moviesError,
    refetch: loadMovies,
    reset
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    updateSearchCount(searchQuery, movies[0])
    console.log(searchQuery)
    console.log(movies[0])

    const timeout = setTimeout(
      async () => {

        if(searchQuery.trim()) {
          await loadMovies()
        } else {
          reset()
        }
      }, 500)

      return () => clearTimeout(timeout)
  }, [searchQuery])

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover' />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MoviesCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className=' w-full flex-row items-center justify-center mt-20'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>

            <View className='my-5'>
              <SearchBar 
                placeholder='Search movies ...' 
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator size='large' color='#0000ff' className='my-3' />
            )}

            {moviesError && (
              <Text className='text-red-500 px-5 my-3'>
                Error: {moviesError.message}
              </Text>
            )}

            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-xl text-white font-bold'>
                Search Results for{' '}
                <Text className='text-accent'>{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View>
              <Text className='text-center text-gray-500 mt-20'>
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default Search