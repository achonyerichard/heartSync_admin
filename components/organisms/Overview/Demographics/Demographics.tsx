"use client";
import { CustomCard } from "@/components/atoms/CustomCard/CustomCard";
import CustomTitle from "@/components/atoms/CustomTitle/CustomTitle";
import { useFetch } from "@/hooks/useHttpRequest";
import { AxiosResponse } from "axios";
import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

// Define the types for the markers
interface MarkerData {
  name: string | string;
  coordinates: [number, number]; // Tuple type to enforce exactly two numbers
  color: string;
  users: number;
}

// GeoJson URL for world map
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const Demographics: React.FC = () => {
  const [marker, setMarker] = useState<{ name: string; value: number; color: string }[] | null>(null);

  function getRandomRGBA() {
    const r = Math.floor(Math.random() * 256); // Red (0-255)
    const g = Math.floor(Math.random() * 256); // Green (0-255)
    const b = Math.floor(Math.random() * 256); // Blue (0-255)
    const a = Math.random().toFixed(2); // Alpha (0-1, with 2 decimal places)

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  const { isLoading: isSubLoading } = useFetch(
    "country_count",
    "profiles/countryCount",
    (data: AxiosResponse) => {
      const mapped = Object.entries(data.data.data).map(([key, value]) => {
        return { name: key, value: value, color: getRandomRGBA() } as {
          name: string;
          value: number;
          color: string;
        };
      });

      setMarker(mapped);
    },
  );

  // Define the markers data with the correct type
  const markers: MarkerData[] = [
    { name: "USA", coordinates: [-100.0, 40.0], color: "hotpink", users: 167 },
    {
      name: "Canada",
      coordinates: [-106.3, 56.13],
      color: "orange",
      users: 233,
    },
    {
      name: "England",
      coordinates: [-3.436, 55.3781],
      color: "blue",
      users: 100,
    },
    {
      name: "Nigeria",
      coordinates: [4.3964, 12.0765],
      color: "black",
      users: 72,
    },
    {
      name: "China",
      coordinates: [104.1954, 35.8617],
      color: "red",
      users: 284,
    },
    {
      name: "Australia",
      coordinates: [133.7751, -25.2744],
      color: "teal",
      users: 144,
    },
  ];

  return (
    <div className="col-span-5">
      <CustomTitle title="Demographics">
        <svg
          width="28"
          height="26"
          viewBox="0 0 28 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 xl:h-8 xl:w-8"
        >
          <path
            d="M26.9225 2.81751C26.7429 2.67739 26.5337 2.58003 26.3108 2.53282C26.088 2.4856 25.8573 2.48977 25.6362 2.54501L18.175 4.41001L10.675 0.660007C10.3546 0.499723 9.98752 0.459374 9.64 0.546257L1.64 2.54626C1.315 2.6266 1.02623 2.81336 0.819641 3.0768C0.613056 3.34025 0.500538 3.66523 0.5 4.00001V22C0.500035 22.2279 0.552011 22.4529 0.651982 22.6577C0.751952 22.8625 0.897288 23.0419 1.07695 23.1821C1.25661 23.3224 1.46587 23.4199 1.68884 23.4672C1.91181 23.5144 2.14263 23.5103 2.36375 23.455L9.825 21.59L17.325 25.34C17.6454 25.5003 18.0125 25.5406 18.36 25.4538L26.36 23.4538C26.685 23.3734 26.9738 23.1866 27.1804 22.9232C27.3869 22.6598 27.4995 22.3348 27.5 22V4.00001C27.5 3.77197 27.4479 3.54695 27.3479 3.34204C27.2478 3.13714 27.1023 2.95775 26.9225 2.81751ZM11.5 4.42751L16.5 6.92751V21.5725L11.5 19.0725V4.42751ZM3.5 5.17751L8.5 3.92751V18.8288L3.5 20.0788V5.17751ZM24.5 20.8288L19.5 22.0788V7.17126L24.5 5.92126V20.8288Z"
            fill="#F75555"
          />
        </svg>
      </CustomTitle>
      <CustomCard className="mb-5 grid-cols-3 gap-x-10 xl:grid">
        {/* World Map */}
        <ComposableMap className="col-span-2">
          <Geographies
            geography={geoUrl}
            style={{
              fill: "#D6D6DA", // Default fill color for countries
              stroke: "#FFFFFF", // Border color between countries
              strokeWidth: 0.75,
              outline: "none",
            }}
            className=""
          >
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, color }: MarkerData) => (
            <Marker key={name} coordinates={coordinates}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.7441 14.873H26.6979C26.4609 12.3132 25.3361 9.91681 23.5182 8.09897C21.7004 6.28113 19.304 5.1563 16.7441 4.9193V1.87305C16.7441 1.60783 16.6388 1.35348 16.4512 1.16594C16.2637 0.978404 16.0094 0.873047 15.7441 0.873047C15.4789 0.873047 15.2246 0.978404 15.037 1.16594C14.8495 1.35348 14.7441 1.60783 14.7441 1.87305V4.9193C12.1843 5.1563 9.7879 6.28113 7.97006 8.09897C6.15222 9.91681 5.02739 12.3132 4.79039 14.873H1.74414C1.47892 14.873 1.22457 14.9784 1.03703 15.1659C0.849497 15.3535 0.744141 15.6078 0.744141 15.873C0.744141 16.1383 0.849497 16.3926 1.03703 16.5802C1.22457 16.7677 1.47892 16.873 1.74414 16.873H4.79039C5.02739 19.4329 6.15222 21.8293 7.97006 23.6471C9.7879 25.465 12.1843 26.5898 14.7441 26.8268V29.873C14.7441 30.1383 14.8495 30.3926 15.037 30.5802C15.2246 30.7677 15.4789 30.873 15.7441 30.873C16.0094 30.873 16.2637 30.7677 16.4512 30.5802C16.6388 30.3926 16.7441 30.1383 16.7441 29.873V26.8268C19.304 26.5898 21.7004 25.465 23.5182 23.6471C25.3361 21.8293 26.4609 19.4329 26.6979 16.873H29.7441C30.0094 16.873 30.2637 16.7677 30.4512 16.5802C30.6388 16.3926 30.7441 16.1383 30.7441 15.873C30.7441 15.6078 30.6388 15.3535 30.4512 15.1659C30.2637 14.9784 30.0094 14.873 29.7441 14.873ZM15.7441 24.873C13.9641 24.873 12.2241 24.3452 10.744 23.3563C9.26397 22.3673 8.11041 20.9617 7.42922 19.3172C6.74804 17.6727 6.56981 15.8631 6.91707 14.1172C7.26434 12.3714 8.12151 10.7678 9.38018 9.50909C10.6389 8.25041 12.2425 7.39325 13.9883 7.04598C15.7342 6.69871 17.5438 6.87694 19.1883 7.55813C20.8328 8.23932 22.2384 9.39287 23.2274 10.8729C24.2163 12.353 24.7441 14.093 24.7441 15.873C24.7415 18.2592 23.7924 20.5468 22.1052 22.2341C20.4179 23.9213 18.1303 24.8704 15.7441 24.873ZM20.7441 15.873C20.7441 16.862 20.4509 17.8287 19.9015 18.6509C19.3521 19.4731 18.5712 20.114 17.6576 20.4924C16.7439 20.8709 15.7386 20.9699 14.7687 20.777C13.7988 20.584 12.9079 20.1078 12.2086 19.4086C11.5093 18.7093 11.0331 17.8184 10.8402 16.8485C10.6473 15.8786 10.7463 14.8733 11.1247 13.9596C11.5032 13.046 12.144 12.2651 12.9663 11.7157C13.7885 11.1663 14.7552 10.873 15.7441 10.873C17.0702 10.873 18.342 11.3998 19.2797 12.3375C20.2174 13.2752 20.7441 14.547 20.7441 15.873Z"
                  fill={color}
                />
              </svg>
            </Marker>
          ))}
        </ComposableMap>

        {/* User Statistics */}
        <div className="flex flex-col justify-evenly max-xl:gap-y-3 xl:py-10">
          {marker?.map(({ name, value, color }) => (
            <div key={name} className="flex items-center justify-between">
              <span className="flex items-center gap-x-2 font-urbanist text-sm font-semibold capitalize xl:text-lg">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 xl:h-8 xl:w-8"
                >
                  <path
                    d="M29.7441 14.873H26.6979C26.4609 12.3132 25.3361 9.91681 23.5182 8.09897C21.7004 6.28113 19.304 5.1563 16.7441 4.9193V1.87305C16.7441 1.60783 16.6388 1.35348 16.4512 1.16594C16.2637 0.978404 16.0094 0.873047 15.7441 0.873047C15.4789 0.873047 15.2246 0.978404 15.037 1.16594C14.8495 1.35348 14.7441 1.60783 14.7441 1.87305V4.9193C12.1843 5.1563 9.7879 6.28113 7.97006 8.09897C6.15222 9.91681 5.02739 12.3132 4.79039 14.873H1.74414C1.47892 14.873 1.22457 14.9784 1.03703 15.1659C0.849497 15.3535 0.744141 15.6078 0.744141 15.873C0.744141 16.1383 0.849497 16.3926 1.03703 16.5802C1.22457 16.7677 1.47892 16.873 1.74414 16.873H4.79039C5.02739 19.4329 6.15222 21.8293 7.97006 23.6471C9.7879 25.465 12.1843 26.5898 14.7441 26.8268V29.873C14.7441 30.1383 14.8495 30.3926 15.037 30.5802C15.2246 30.7677 15.4789 30.873 15.7441 30.873C16.0094 30.873 16.2637 30.7677 16.4512 30.5802C16.6388 30.3926 16.7441 30.1383 16.7441 29.873V26.8268C19.304 26.5898 21.7004 25.465 23.5182 23.6471C25.3361 21.8293 26.4609 19.4329 26.6979 16.873H29.7441C30.0094 16.873 30.2637 16.7677 30.4512 16.5802C30.6388 16.3926 30.7441 16.1383 30.7441 15.873C30.7441 15.6078 30.6388 15.3535 30.4512 15.1659C30.2637 14.9784 30.0094 14.873 29.7441 14.873ZM15.7441 24.873C13.9641 24.873 12.2241 24.3452 10.744 23.3563C9.26397 22.3673 8.11041 20.9617 7.42922 19.3172C6.74804 17.6727 6.56981 15.8631 6.91707 14.1172C7.26434 12.3714 8.12151 10.7678 9.38018 9.50909C10.6389 8.25041 12.2425 7.39325 13.9883 7.04598C15.7342 6.69871 17.5438 6.87694 19.1883 7.55813C20.8328 8.23932 22.2384 9.39287 23.2274 10.8729C24.2163 12.353 24.7441 14.093 24.7441 15.873C24.7415 18.2592 23.7924 20.5468 22.1052 22.2341C20.4179 23.9213 18.1303 24.8704 15.7441 24.873ZM20.7441 15.873C20.7441 16.862 20.4509 17.8287 19.9015 18.6509C19.3521 19.4731 18.5712 20.114 17.6576 20.4924C16.7439 20.8709 15.7386 20.9699 14.7687 20.777C13.7988 20.584 12.9079 20.1078 12.2086 19.4086C11.5093 18.7093 11.0331 17.8184 10.8402 16.8485C10.6473 15.8786 10.7463 14.8733 11.1247 13.9596C11.5032 13.046 12.144 12.2651 12.9663 11.7157C13.7885 11.1663 14.7552 10.873 15.7441 10.873C17.0702 10.873 18.342 11.3998 19.2797 12.3375C20.2174 13.2752 20.7441 14.547 20.7441 15.873Z"
                    fill={color}
                  />
                </svg>
                {name}
              </span>

              <span className="font-urbanist text-sm font-medium text-[#5B5B5B]">
                {value} Users
              </span>
            </div>
          ))}
        </div>
      </CustomCard>
    </div>
  );
};

export default Demographics;
