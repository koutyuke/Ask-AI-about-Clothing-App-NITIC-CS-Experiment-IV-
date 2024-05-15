import type { AreaCode, LocationType } from "@/src/types/location";
import codes from "./list_code.json";

// APIからのレスポンスの型を定義
type APIResponse = {
  results: {
    muniCd: string;
    lv01Nm: string;
  };
};

// 緯度と経度を引数にとる非同期関数の定義
const getMuniCd = async (lat: number, lon: number): Promise<string> => {
  const url = `https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${lat}&lon=${lon}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: APIResponse = await response.json();

  return data.results.muniCd;
};

// 自治体のコードを引数にとり、最も近い予報区のコードを持つエリアを返す関数
const findNearestAreaCode = (code: string): AreaCode => {
  let closestArea = codes[0];
  let modifiedCode = code;

  while (modifiedCode.length < 6) {
    modifiedCode += "0";
  }

  let smallestDiff = Math.abs(
    Number.parseInt(modifiedCode) - Number.parseInt(codes[0]!.code)
  );

  // biome-ignore lint/complexity/noForEach: <explanation>
  codes.forEach((area) => {
    const currentDiff = Math.abs(
      Number.parseInt(modifiedCode) - Number.parseInt(area.code)
    );
    if (currentDiff < smallestDiff) {
      closestArea = area;
      smallestDiff = currentDiff;
    }
  });

  return closestArea!;
};

// 緯度と経度を引数にとり、最も近いエリアのコードと名前を返す関数
const getLocationCode = async (location: LocationType): Promise<AreaCode> => {
  const localCode = await getMuniCd(location.latitude, location.longitude);
  const nearestArea = findNearestAreaCode(localCode);

  return {
    code: nearestArea.code,
    name: nearestArea.name,
  };
};

export { getLocationCode };

// 関数の使用例
// getLocationCode({ latitude: 35.021077, longitude: 135.761731 }).then((area) => {
//   console.log(area);
// });
