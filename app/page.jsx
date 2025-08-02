"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplets, Search, Thermometer, Wind } from "lucide-react";
import { getWeatherData } from "./actions";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [weather, setWeather] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (formData) => {
    const city = formData.get("city");

    setLoading(true);
    setError("");
    setWeather("");

    try {
      const { data } = await getWeatherData(city);

      console.log(data);

      if (data && data.weather && data.weather.length > 0) {
        setWeather(data);
      } else {
        setError("ไม่พบข้อมูลสภาพอากาศสำหรับเมืองนี้");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการค้นหาข้อมูลสภาพอากาศ");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gradient-to-b from-sky-400 to-blue-500">
      <div className="w-full max-w-lg space-y-4">
        <form action={handleSearch} className="flex gap-2 flex-col md:flex-row">
          <Input
            name="city"
            type="text"
            placeholder="Enter city name..."
            className="h-10 bg-white/90 focus-visible:ring-1 focus-visible:ring-black focus-visible:outline-none"
            required
          />
          <Button className="h-10 md:w-14" type="submit" disabled={loading}>
            <Search />
          </Button>
        </form>

        {loading && (
          <Card className="bg-white/50 backdrop-blur border-0">
            <CardContent className="flex justify-center items-center py-14">
              <p className="text-gray-600">กำลังค้นหา...</p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="bg-white/50 backdrop-blur border-0">
            <CardContent className="flex justify-center items-center py-14">
              <p className="text-xl font-light text-gray-800">{error}</p>
            </CardContent>
          </Card>
        )}

        {weather && weather.weather && weather.weather[0] && (
          <div>
            <Card className="bg-white/50 backdrop-blur border-0">
              <CardContent className="flex flex-col gap-5 px-16 py-2">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {weather.name}
                  </h2>
                  <div className="flex items-center justify-center gap-2 text-5xl font-bold">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                      width={64}
                      height={64}
                    />
                    <div>{Math.round(weather.main.temp)}&deg;C</div>
                  </div>
                  <p className="text-xl font-light text-gray-700">
                    {weather.weather[0].main}
                  </p>
                </div>

                <div className="flex flex-col mt-6 gap-6 items-center justify-between md:flex-row md:mt-4">
                  <div className="flex flex-col items-center">
                    <Thermometer className="w-6 h-6 mx-auto text-orange-500" />
                    <h2 className="text-lg font-normal text-gray-500">
                      Feels like
                    </h2>
                    <p className="text-lg font-bold text-gray-800">
                      {Math.round(weather.main.feels_like)}&deg;C
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Droplets className="w-6 h-6 mx-auto text-blue-500" />
                    <h2 className="text-lg font-normal text-gray-500">
                      Humidity
                    </h2>
                    <p className="text-lg font-bold text-gray-800">
                      {weather.main.humidity}%
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Wind className="w-6 h-6 mx-auto text-teal-500" />
                    <h2 className="text-lg font-normal text-gray-500">Wind</h2>
                    <p className="text-lg font-bold text-gray-800">
                      {Math.round(weather.wind.speed)} m/s
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
