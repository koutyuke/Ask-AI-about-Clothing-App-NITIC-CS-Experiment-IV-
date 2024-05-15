import type { Weather } from "@/src/types/weather";

// const formatDate = (date: Date): string => {
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const day = date.getDate();

//   return `${year}年${month}月${day}日`;
// };

// const generatePrompt = (
//   weather: Weathers,
//   sex: "man" | "woman",
//   today: Date
// ): string => {
//   const todayWeather = weather.today.weather;
//   const formattedDate = formatDate(today);

//   return `今日は${formattedDate}、${todayWeather}です。\n性別: ${sex}`;
// };

const generatePrompt = (weatherData: Weather): string => {
  const { weather, wind, rainyPercent, temp } = weatherData;
  const { max, min } = temp;

  const rainyPercentText = rainyPercent !== null ? `${rainyPercent}%` : "不明";
  const maxTempText = max !== null ? `${max}度` : "不明";
  const minTempText = min !== null ? `${min}度` : "不明";

  return `今日の天気は${weather}です。風は${wind}で、降水確率は${rainyPercentText}です。最高気温は${maxTempText}、最低気温は${minTempText}です。`;
};

export { generatePrompt };

// 使用例

// const main = () => {
//   const sampleWeathers: Weathers = {
//     today: {
//       weather: "晴れ",
//       wind: "北風",
//       rainyPercent: [
//         { timeSlot: "00-06", percent: null },
//         { timeSlot: "06-12", percent: 10 },
//         { timeSlot: "12-18", percent: 20 },
//         { timeSlot: "18-24", percent: 30 },
//       ],
//       temp: {
//         max: 25,
//         min: 15,
//       },
//     },
//     tomorrow: {
//       weather: "曇り",
//       wind: "南風",
//       rainyPercent: [
//         { timeSlot: "00-06", percent: 20 },
//         { timeSlot: "06-12", percent: 30 },
//         { timeSlot: "12-18", percent: 40 },
//         { timeSlot: "18-24", percent: 50 },
//       ],
//       temp: {
//         max: 22,
//         min: 14,
//       },
//     },
//     afterTomorrow: {
//       weather: "雨",
//       wind: "東風",
//       rainyPercent: [
//         { timeSlot: "00-06", percent: 80 },
//         { timeSlot: "06-12", percent: 70 },
//         { timeSlot: "12-18", percent: 60 },
//         { timeSlot: "18-24", percent: 90 },
//       ],
//       temp: {
//         max: 20,
//         min: 16,
//       },
//     },
//   };
//   const today = new Date("2024-05-14");
//   const prompt = generatePrompt(sampleWeathers, "man", today);

//   console.log(prompt); // 今日は2024年05月14日、晴れです。性別: man
// };

// main();
