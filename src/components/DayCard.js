import React from "react";
import { Col, Card, CardHeader, CardBody } from "reactstrap";
import { DayWrapper } from "../styles";

const DayCard = props => {
    return (
        <Col>
            <DayWrapper isSelected={props.isSelected} onClick={props.selectDay}>
                <Card>
                    <CardHeader>{props.day}</CardHeader>
                    <CardBody>
                        <h3>{props.temp.toFixed(1)}°</h3>
                        <img src={`${process.env.PUBLIC_URL}/icons/${props.icon}.png`} alt={props.description} />
                        <p><strong>High:</strong> {props.high.toFixed(1)}°</p>
                        <p><strong>Low:</strong> {props.low.toFixed(1)}°</p>
                        <p><strong>Precip:</strong> {props.precip}%</p>
                    </CardBody>
                </Card>
            </DayWrapper>
        </Col>
    )
}

export default DayCard;