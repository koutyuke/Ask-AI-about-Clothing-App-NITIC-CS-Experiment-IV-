import { Elysia, t } from "elysia";
import { askAIAboutClothingFromWeather } from "../utils/askAIAboutClothingFromWeather";

const app = new Elysia()
  .get("/", () => {
    return "Hello Elysia";
  })
  .post(
    "/ask",
    async ({ body }) => {
      const answer = await askAIAboutClothingFromWeather(body);
      return answer;
    },
    {
      body: t.Object({
        weather: t.String(),
        wind: t.String(),
        rainyPercent: t.Union([t.Number(), t.String(), t.Null()]),
        temp: t.Object({
          max: t.Union([t.Number(), t.String(), t.Null()]),
          min: t.Union([t.Number(), t.String(), t.Null()]),
        }),
      }),
      response: t.Object({
        summary: t.String(),
        point: t.String(),
        tops: t.String(),
        outerwear: t.String(),
        bottoms: t.String(),
        shoes: t.String(),
        accessories: t.String(),
      }),
    }
  )
  .listen(3001);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
