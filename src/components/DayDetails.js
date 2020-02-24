import React from "react";
import { DetailsWrapper } from "../styles";

const DayDetails = props => {
    return (
        <DetailsWrapper>
            <h2>Day Details for {props.day}:</h2>
            <h3>{props.temp.toFixed(1)}°</h3>
            <img src={`${process.env.PUBLIC_URL}/icons/${props.icon}.png`} alt={props.description} />
            <p><em>{props.description}</em></p>
            <p><strong>High:</strong> {props.high.toFixed(1)}° | <strong>Feels Like:</strong> {props.appHigh.toFixed(1)}°</p>
            <p><strong>Low:</strong> {props.low.toFixed(1)}° | <strong>Feels Like:</strong> {props.appLow.toFixed(1)}°</p>
            <p><strong>Likelihood of Precipitation:</strong> {props.precip}% | <strong>Relative Humidity:</strong> {props.humidity}%</p>
            <p><strong>Wind Speed:</strong> {(props.windSpeed *  2.237).toFixed(2)}mph | <strong>Wind Direction:</strong> {props.windDir[0].toUpperCase() + props.windDir.substring(1)}</p>
        </DetailsWrapper>
    )
}

export default DayDetails;