
export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  APi_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`

  }
}

export const fetchMovies = async ({ query }: {query: string}) => {

  const end_point = "/discover/movie?sort_by=popularity.desc"

  const response = await fetch(end_point,{
    method: 'GET',
    headers: TMDB_CONFIG.headers
  })

  if(!response.ok) {
    // @ts-ignore
    throw new Error('Failed to fetch moveis:', response.statusText)
  }

  const data = await response.json()
  return data.results

}

{/*
const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
*/}