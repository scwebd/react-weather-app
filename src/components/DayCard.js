import React from "react";
import { Col, Card, CardHeader, CardBody } from "reactstrap";
import { DayWrapper } from "../styles";

const DayCard = ({ isSelected, selectDay, day, temp, icon, description, high, low, precip }) => {
    return (
        <Col>
            <DayWrapper isSelected={isSelected} onClick={selectDay}>
                <Card>
                    <CardHeader>{day}</CardHeader>
                    <CardBody>
                        <h3>{temp.toFixed(1)}°</h3>
                        <img src={`${process.env.PUBLIC_URL}/icons/${icon}.png`} alt={description} />
                        <p><strong>High:</strong> {high.toFixed(1)}°</p>
                        <p><strong>Low:</strong> {low.toFixed(1)}°</p>
                        <p><strong>Precip:</strong> {precip}%</p>
                    </CardBody>
                </Card>
            </DayWrapper>
        </Col>
    )
}

export default DayCard;