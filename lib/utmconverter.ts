import proj4 from "proj4";

// Definição do sistema de coordenadas UTM (Zone 36S para Moçambique/Beira)
proj4.defs(
  "EPSG:32736",
  "+proj=utm +zone=36 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs"
);

export function convertLatLonToUTM(
  latitude: number,
  longitude: number
): { easting: number; northing: number; zone: string } {
  try {
    // Converter para UTM
    const [easting, northing] = proj4("EPSG:4326", "EPSG:32736", [
      longitude,
      latitude,
    ]);

    // Determinar a zona UTM automaticamente
    const zone = Math.floor((longitude + 180) / 6) + 1;
    const hemisphere = latitude >= 0 ? "N" : "S";

    return {
      easting: Math.round(easting * 100) / 100, // Arredonda para 2 casas decimais
      northing: Math.round(northing * 100) / 100,
      zone: `${zone}${hemisphere}`,
    };
  } catch (error) {
    throw new Error("Erro na conversão de coordenadas: " + error);
  }
}

// Conversão reversa UTM → Lat/Lon
export function convertUTMToLatLon(
  easting: number,
  northing: number,
  zoneNumber: number,
  hemisphere: "N" | "S" = "S"
): { latitude: number; longitude: number } {
  try {
    // Construir o código EPSG baseado na zona e hemisfério
    const epsgCode = `EPSG:${32700 + zoneNumber}${
      hemisphere === "N" ? "6" : "7"
    }`;

    // Verificar se a definição já existe, se não, adicionar
    if (!proj4.defs(epsgCode)) {
      const direction = hemisphere === "N" ? "" : " +south";
      proj4.defs(
        epsgCode,
        `+proj=utm +zone=${zoneNumber}${direction} +ellps=WGS84 +datum=WGS84 +units=m +no_defs`
      );
    }

    // Converter de UTM para WGS84 (Lat/Lon)
    const [longitude, latitude] = proj4(epsgCode, "EPSG:4326", [
      easting,
      northing,
    ]);

    return {
      latitude: Math.round(latitude * 1000000) / 1000000, // 6 casas decimais
      longitude: Math.round(longitude * 1000000) / 1000000,
    };
  } catch (error) {
    throw new Error("Erro na conversão reversa de coordenadas: " + error);
  }
}

// // Exemplo de uso:
// const coordinates = convertLatLonToUTM(-19.817, 34.85);
// console.log(coordinates); // { easting: 800000, northing: 7800000, zone: '36S' }
