import React from "react";
import { DetailsWrapper } from "../styles";

const DayDetails = ({ day, temp, icon, description, high, appHigh, low, appLow, precip, humidity, windSpeed, windDir }) => {
    return (
        <DetailsWrapper>
            <h2>Day Details for {day}:</h2>
            <h3>{temp.toFixed(1)}°</h3>
            <img src={`${process.env.PUBLIC_URL}/icons/${icon}.png`} alt={description} />
            <p><em>{description}</em></p>
            <p><strong>High:</strong> {high.toFixed(1)}° | <strong>Feels Like:</strong> {appHigh.toFixed(1)}°</p>
            <p><strong>Low:</strong> {low.toFixed(1)}° | <strong>Feels Like:</strong> {appLow.toFixed(1)}°</p>
            <p><strong>Likelihood of Precipitation:</strong> {precip}% | <strong>Relative Humidity:</strong> {humidity}%</p>
            <p><strong>Wind Speed:</strong> {(windSpeed *  2.237).toFixed(2)}mph | <strong>Wind Direction:</strong> {windDir[0].toUpperCase() + windDir.substring(1)}</p>
        </DetailsWrapper>
    )
}

export default DayDetails;