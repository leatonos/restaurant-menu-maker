"use client"
import { MenuCategory } from "@/app/types/types";
import Image from "next/image";


export default function SearchIcon(props:{color:string}) {
    

  return (
    <svg
    version="1.1"
    id="Magnifier"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 283.4 303.2"
    xmlSpace="preserve"
    width="24"
    height="24"
  >
    <g id="XMLID_55_">
      <circle
        id="XMLID_1_"
        style={{
          fill: "none",
          stroke: props.color,
          strokeWidth: 30,
          strokeMiterlimit: 10,
        }}
        cx="116.7"
        cy="120.6"
        r="95.3"
      />
      <line
        id="XMLID_2_"
        style={{
          fill: "none",
          stroke:  props.color,
          strokeWidth: 30,
          strokeLinecap: "round",
          strokeMiterlimit: 10,
        }}
        x1="179"
        y1="194.9"
        x2="262"
        y2="277.9"
      />
    </g>
  </svg>
  
  );
}
