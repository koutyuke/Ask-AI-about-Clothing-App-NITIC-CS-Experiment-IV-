import { Text, View } from "react-native";

import * as Location from "expo-location";
import { useEffect, useState } from "react";
import type { LocationType } from "../types/location";
import type { ClothingRecommendation } from "../utils/askAIAboutClothingFromWeather";
import { getWeather } from "../utils/getWeather";
import { getLocationCode } from "../utils/locationCode";

const Page = () => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [area, setArea] = useState<string | null>(null);
  const [aiAdvice, setAiAdvice] = useState<ClothingRecommendation | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      setLocation({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });

      const area = await getLocationCode({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setArea(area.name);

      const weathers = await getWeather(area.code);

      const answer = await fetch("http://10.0.2.2:3001/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(weathers.today),
      })
        .then((res) => res.json() as Promise<ClothingRecommendation>)
        .catch((e) => {
          setErrorMsg(e.message);
          return null;
        });

      setAiAdvice(answer);
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : location ? (
        <View style={{ gap: 8 }}>
          <View>
            <Text>Location: </Text>
            <Text>{`Longitude: ${location.longitude}`}</Text>
            <Text>{`Latitude: ${location.latitude}`}</Text>
          </View>
          <Text>{`Area: ${area}`}</Text>
          {aiAdvice ? (
            <View
              style={{
                width: 300,
              }}
            >
              <Text>{`Weather: ${aiAdvice.summary}`}</Text>

              <Text>{`Tops: ${aiAdvice.tops}`}</Text>
              <Text>{`Outerwear: ${aiAdvice.outerwear}`}</Text>
              <Text>{`Bottoms: ${aiAdvice.bottoms}`}</Text>
              <Text>{`Shoes: ${aiAdvice.shoes}`}</Text>
              <Text>{`Accessories: ${aiAdvice.accessories}`}</Text>
            </View>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default Page;
