// Lightweight client helpers using Open-Meteo's free, key-less APIs for city
// search and live environment data (UV index, humidity, air quality).

export type CityResult = {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
};

export type EnvironmentData = {
  uvIndex: number | null;
  humidity: number | null;
  aqi: number | null;
};

export function formatCityLabel(city: CityResult) {
  return [city.name, city.country].filter(Boolean).join(", ");
}

export async function searchCities(
  query: string,
  signal?: AbortSignal,
): Promise<CityResult[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", trimmed);
  url.searchParams.set("count", "6");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const res = await fetch(url, { signal });
  if (!res.ok) return [];

  const data = (await res.json()) as {
    results?: Array<{
      id: number;
      name: string;
      country?: string;
      admin1?: string;
      latitude: number;
      longitude: number;
    }>;
  };

  return (data.results ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    country: item.country ?? "",
    admin1: item.admin1,
    latitude: item.latitude,
    longitude: item.longitude,
  }));
}

export async function fetchEnvironment(
  latitude: number,
  longitude: number,
  signal?: AbortSignal,
): Promise<EnvironmentData> {
  const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
  weatherUrl.searchParams.set("latitude", String(latitude));
  weatherUrl.searchParams.set("longitude", String(longitude));
  weatherUrl.searchParams.set("current", "relative_humidity_2m,uv_index");

  const airUrl = new URL(
    "https://air-quality-api.open-meteo.com/v1/air-quality",
  );
  airUrl.searchParams.set("latitude", String(latitude));
  airUrl.searchParams.set("longitude", String(longitude));
  airUrl.searchParams.set("current", "us_aqi");

  const [weatherRes, airRes] = await Promise.allSettled([
    fetch(weatherUrl, { signal }).then((r) => (r.ok ? r.json() : null)),
    fetch(airUrl, { signal }).then((r) => (r.ok ? r.json() : null)),
  ]);

  const weather =
    weatherRes.status === "fulfilled" ? weatherRes.value : null;
  const air = airRes.status === "fulfilled" ? airRes.value : null;

  return {
    uvIndex: weather?.current?.uv_index ?? null,
    humidity: weather?.current?.relative_humidity_2m ?? null,
    aqi: air?.current?.us_aqi ?? null,
  };
}
