import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'

import { images } from '@/constants/images'
import { icons } from '@/constants/icons';

import MoviesCard from '@/components/MoviesCard'
import SearchBar from '@/components/SearchBar'

import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";

const Search = () => {

 

    const { 
      data: movies, 
      loading: moviesLoading, 
      error: moviesError 
    } = useFetch( () =>  fetchMovies({ query: '' }) , true );

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover' />

      <FlatList 
        data={movies} 
        renderItem={({item}) => <MoviesCard {...item} /> } 
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
              <SearchBar placeholder='Search movies ...' />
            </View>

            {moviesLoading && (
              <ActivityIndicator size='large' color='#0000ff' className='my-3' />
            )}

            {moviesError && (
              <Text className='text-red-500 px-5 my-3'>
                Error: {moviesError.message}
              </Text>
            )}

            {!moviesLoading && !moviesError && 'SEARCH TERM'.trim() && movies?.length > 0 && (
              <Text className='text-xl text-white font-bold'>
                Search Results for{' '}
                <Text className='text-accent'>SEARCH TERM</Text>
              </Text>
            )}
          </>
        }
      />
    </View>
  )
}

export default Search