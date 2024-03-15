import { Image, Pressable, Text, View } from 'react-native'
import { Link } from 'expo-router'

const index = () => {
    return (
        <View className="bg-black flex flex-1 justify-center items-center">
            <Text className="text-white text-center text-2xl font-bold">Welcome to the Weather App!</Text>
            <View className="flex justify-center items-center">
                <Image source={{
                    uri: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-1024.png"
                }} className="h-64 w-64 rounded-full" />
            </View>
            <Text className="text-white text-md px-4 tracking-widest">
                This is a weather app that uses OpenWeatherMap API to fetch weather data.
                Tap on a below to get real-time weather updates
            </Text>
            <Pressable className="py-4 w-full px-4">
                <Link className='text-white text-center bg-emerald-800 px-4 py-2 rounded-lg' href={"/weather"}>Get</Link>
            </Pressable>
        </View>
    )
}
export default index
