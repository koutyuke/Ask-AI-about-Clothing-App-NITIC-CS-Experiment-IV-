import type { Weathers } from "@/src/types/weather";

const getWeather = async (locationCode: string): Promise<Weathers> => {
  const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${locationCode}.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.length || !data[0].timeSeries) {
      throw new Error("Invalid data format or empty data received");
    }

    // 次の日の0時の降水確率を取得
    const timeDefines = data[0].timeSeries[0].timeDefines;

    const today = new Date();

    const nextDayMidnight = new Date(today);

    nextDayMidnight.setDate(today.getDate() + 1);

    nextDayMidnight.setHours(0, 0, 0, 0);

    const index = timeDefines.findIndex((time: string | number | Date) => {
      const date = new Date(time);
      return date.toISOString() === nextDayMidnight.toISOString();
    });
    const tomorrowRainyPercent =
      data[0].timeSeries[1].areas[0].pops[index] || null;

    return {
      today: {
        weather: data[0].timeSeries[0].areas[0].weathers[0],
        wind: data[0].timeSeries[0].areas[0].winds[0],
        rainyPercent: data[0].timeSeries[1].areas[0].pops[0] || null,
        temp: {
          max: data[0].timeSeries[2].areas[0].temps[1] || null,
          min: data[0].timeSeries[2].areas[0].temps[0] || null,
        },
      },
      tomorrow: {
        weather: data[0].timeSeries[0].areas[0].weathers[1],
        wind: data[0].timeSeries[0].areas[0].winds[1],
        rainyPercent: tomorrowRainyPercent,
        temp: {
          max: data[0].timeSeries[2].areas[0].temps[3] || null,
          min: data[0].timeSeries[2].areas[0].temps[2] || null,
        },
      },
      afterTomorrow: {
        weather: data[0].timeSeries[0].areas[0].weathers[2],
        wind: data[0].timeSeries[0].areas[0].winds[2],
        rainyPercent: data[1].timeSeries[0].areas[0].pops[1] || null,
        temp: {
          max: data[1].timeSeries[1].areas[0].tempsMax[1] || null,
          min: data[1].timeSeries[1].areas[0].tempsMin[1] || null,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export { getWeather };

// const displayWeather = async (locationCode: LocationCode) => {
//   try {
//     const weatherData = await getWeather(locationCode);
//     console.log("Today's Weather:");
//     console.log(`Weather: ${weatherData.today.weather}`);
//     console.log(`Wind: ${weatherData.today.wind}`);

//     weatherData.today.rainyPercent.forEach((slot) => {
//       console.log(`Rainy Percent : ${slot.percent}`);
//     });

//     console.log(
//       `Temperature: Max : ${weatherData.today.temp.max}, Min : ${weatherData.today.temp.min}`
//     );

//     console.log("\nTomorrow's Weather:");
//     console.log(`Weather: ${weatherData.tomorrow.weather}`);
//     console.log(`Wind: ${weatherData.tomorrow.wind}`);
//     weatherData.tomorrow.rainyPercent.forEach((slot) => {
//       console.log(`Rainy Percent : ${slot.percent}`);
//     });
//     console.log(
//       `Temperature: Max : ${weatherData.tomorrow.temp.max}, Min : ${weatherData.tomorrow.temp.min}`
//     );

//     console.log("\nDay After Tomorrow's Weather:");
//     console.log(`Weather: ${weatherData.afterTomorrow.weather}`);
//     console.log(`Wind: ${weatherData.afterTomorrow.wind}`);
//     weatherData.afterTomorrow.rainyPercent.forEach((slot) => {
//       console.log(`Rainy Percent : ${slot.percent}`);
//     });
//     console.log(
//       `Temperature: Max : ${weatherData.afterTomorrow.temp.max}, Min : ${weatherData.afterTomorrow.temp.min}`
//     );
//   } catch (error) {
//     console.error("Error displaying weather data:", error);
//   }
// };

// // Example usage:
// displayWeather("130000");
