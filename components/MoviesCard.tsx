import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const MoviesCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
  console.log(poster_path)
  return (
    <Link href={`/movies/${id}`} asChild >
      <TouchableOpacity className="w-[30%]">
        <Image source={{
          uri: poster_path
          ? `https://image.tmdb.org/t/p/w500/${poster_path}`
          : `https://placeholde.co/600x400/1a1a1a/ffffff.png`

          }}
          className='w-full h-52 rounded-lg'
          resizeMode='cover'
          />

          <Text className='text-white text-sm font-bold mt-2'>{title}</Text>

      </TouchableOpacity>
    </Link>


  )
}

export default MoviesCard