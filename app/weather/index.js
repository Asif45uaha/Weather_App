import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as Progress from "react-native-progress"

const WeatherPage = () => {

    const api_key = "84278f11ef3d94bcd9ea606b94a1b0cb"
    const [loading, setLoading] = useState(false)
    const [cityVal, setCityVal] = useState("")
    const [weatherData, setWeatherData] = useState({})

    const fetchWeatherData = async () => {
        setCityVal("")
        setLoading(true)
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityVal.toLowerCase()}&appid=${api_key}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            const data = await res.json()
            setWeatherData(data)
        } catch (error) {
            Alert.alert(error?.message)
        }
        finally {
            setLoading(false)
        }
    }

    return loading ? <View className="flex flex-1 bg-black justify-center items-center">
        <Progress.Circle animated={true} size={100} indeterminate={true} color='blue' borderWidth={5} />
    </View> : (
        <View className="bg-black flex-1">
            <View className="flex flex-row items-center justify-center py-4 w-full gap-2">
                <TextInput
                    onChangeText={(text) => setCityVal(text)}
                    placeholder='Enter a city'
                    className="placeholder:text-black border-2 border-emerald-600  p-2 rounded-xl bg-gray-200 px-4 w-[80%]" />
                <Pressable onPress={fetchWeatherData} className="bg-emerald-700 p-3 rounded-xl ">
                    <Text className="text-white"><EvilIcons name="search" size={30} color="white" /></Text>
                </Pressable>
            </View>
            {
                Object.keys(weatherData).length > 0 &&
                <View className="flex flex-col gap-4">
                    <View className="flex flex-row items-center justify-center gap-2">
                        <EvilIcons name="location" size={30} color="white" />
                        <Text className="text-white text-xl font-bold">{weatherData?.name}({weatherData?.sys?.country})</Text>
                    </View>

                    <View className="relative flex flex-col items-center justify-center gap-2">
                        {
                            weatherData && <Image className="h-64 w-64 object-contain" source={{
                                uri: `http://openweathermap.org/img/wn/${weatherData && weatherData?.weather[0]?.icon}@4x.png`
                            }} />
                        }
                        <Text className="text-white absolute bottom-4 text-md font-medium">{weatherData?.weather[0].main}</Text>
                    </View>
                    <View className="flex flex-row justify-between px-8 p-2 py-8 rounded-xl ">
                        <View className="flex flex-col gap-8  p-4">
                            <View className="flex flex-row items-center justify-center gap-2 bg-gray-700 py-4 px-2 rounded-xl">
                                <FontAwesome6 name="temperature-empty" size={40} color="white" />
                                <Text className="text-white text-xl font-bold">{(weatherData?.main?.temp - 273).toFixed(2)} &deg;C</Text>
                            </View>
                            <View className="flex flex-row items-center justify-start gap-2 bg-gray-700 py-4 px-2 rounded-xl">
                                <Entypo name="air" size={40} color="white" />
                                <Text className="text-white text-xl font-bold">{weatherData?.wind?.speed} km/h</Text>
                            </View>
                        </View>
                        <View className="flex flex-col gap-8 p-4">
                            <View className="flex flex-row items-center justify-start gap-2 bg-gray-700 py-4 px-2 rounded-xl">
                                <FontAwesome5 name="temperature-low" size={40} color="white" />
                                <Text className="text-white text-xl font-bold">{(weatherData?.main?.temp_min - 273).toFixed(2)} &deg;C</Text>
                            </View>
                            <View className="flex flex-row items-center justify-start gap-2 bg-gray-700 py-4 px-2 rounded-xl bg-clip-padding bg-opacity-10 ">
                                <FontAwesome5 name="temperature-high" size={40} color="white" />
                                <Text className="text-white text-xl font-bold">{(weatherData?.main?.temp_max - 273).toFixed(2)} &deg;C</Text>
                            </View>
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}
export default WeatherPage
const styles = StyleSheet.create({})