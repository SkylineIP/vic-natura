"use client";

import { useEffect, useMemo, useState } from "react";
import {
  APIProvider,
  Map,
  Marker,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useContextDefault } from "@/context/Context";

const MapContent = () => {
  const mapsLibrary = useMapsLibrary("maps");
  const context = useContextDefault();
  const submenu = context?.submenu;
  const [isSatellite, setIsSatellite] = useState(true);

  useEffect(() => {
    if (submenu === "mapa2d") setIsSatellite(false);
    if (submenu === "mapa-satelite") setIsSatellite(true);
  }, [submenu]);

  const markerIcon = useMemo(() => {
    if (!mapsLibrary) return null;
    return {
      url: "/menu/pin.svg",
      scaledSize: new google.maps.Size(120, 120),
    };
  }, [mapsLibrary]);

  return (
    <div className="relative w-full h-full">
      <Map
      // -22.796676613849655, -47.293060704044514
        style={{ width: "100%", height: "100vh" }}
        defaultCenter={{ lat: -22.796676613849655, lng: -47.293060704044514 }}
        // coordenadas do centro do mapa
        // você pode substituir por outras coordenadas
        defaultZoom={18}
        // nível de zoom inicial do mapa
        disableDefaultUI={true}
        // desativa a interface padrão do Google Maps
        gestureHandling={"greedy"}
        // controla o comportamento de gestos do mapa
        mapTypeId={isSatellite ? "satellite" : "roadmap"}
        // controla se o mapa é satélite ou 2D
      >
        {markerIcon && (
          <Marker
            // marcador no mapa
            icon={markerIcon}
            position={{ lat: -22.796676613849655, lng: -47.293060704044514 }}
          />
        )}
      </Map>
    </div>
  );
};

const GoogleMap = () => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  // Certifique-se de que a chave da API está definida no arquivo .env.local
  // para não tenha configure o arquivo .env.local com a chave da API do Google Maps
  // o arquivo .env.local não sobe para produção, então você precisa configurar a chave da API no ambiente de produção também

  return (
    <APIProvider apiKey={API_KEY}>
      <MapContent />
    </APIProvider>
  );
};

export default GoogleMap;
