type Weather = {
  weather: string;
  wind: string;
  rainyPercent: number | string | null;
  temp: {
    max: number | string | null;
    min: number | string | null;
  };
};

type Weathers = {
  today: Weather;
  tomorrow: Weather;
  afterTomorrow: Weather;
};

export type { Weather, Weathers };
