// here we destructure useState and useEffect from React to give us state/lifecycle functionality!
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Row, Col } from "reactstrap";
import { Wrapper } from "./styles";
import API from "./utils/API";
import SearchForm from "./components/SearchForm";
import DayCard from "./components/DayCard";
import DayDetails from "./components/DayDetails";
// import weatherData from "./data/sample.json"; // only used initially until we wired up with the API

const App = () => {
    // the following variable (data) instantiates four values in state using Hooks... note the 
    // const name is an array destructured into two variables that we can name according to their 
    // purpose -- the first array member is ALWAYS the value stored in state, and the second 
    // array member is ALWAYS the function created to set/alter the state value; after the equal sign, 
    // 'useState()' indicates that we're using React's useState functionality... the value inside the 
    // function call parens indicates the initial value of the state in question!

    // in this example here, we're storing an object of values in state, which is useful if the
    // included values are often or always updated together; one caution storing objects in state:
    // the useState() Hook does not merge in your provided key value pairs into the existing
    // state object like it did in this.setState()... instead, it overwrites everything in that
    // location; it is common to use the spread operator to spread in the previous state values
    // (in this case, 'data') and then to add your updated key/val pairs afterwards
    const [data, setData] = useState({
        searchTerm: "",
        selectedDay: null,
        location: "",
        days: []
    });
    // destructuring the values in our 'data' state into individual variables
    const { searchTerm, selectedDay, location, days } = data;

    // here 'useEffect' coupled with [] as a second arg behaves like componentDidMount did in a 
    // class-based component; it will only run once right after the initial render
    useEffect(() => {
        getWeather("Denver, CO");
    }, []);

    // here we use 'useEffect' again (it's fairly common to have multiple useEffect blocks
    // when you want each separate instance to be triggered at different times in the lifecycle)...
    // in this case, we are setting the document's title on initial render AND anytime the state
    // value of 'location' changes... the array following the anonymous function (the dependency
    // or 'deps' array) specifies which values should trigger the effect upon change
    useEffect(() => {
        document.title = `${location ? "Weather Info for " + location : "Find weather by location"}`;
    }, [location]);

    // since these functions are built inside a function-based (dumb) component, we typically create
    // them as const function expressions, like we have here
    const getWeather = location => {
        if (!location) {
            return alert("Enter a location to get weather data!");
        }

        API.getWeather(location)
            .then(res => {
                if (!res) return;
                setData({
                    searchTerm: "",
                    selectedDay: null,
                    location: `${res.data.city_name}, ${res.data.state_code}`,
                    days: res.data.data
                });
            })
            .catch(err => console.log(err));
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        getWeather(searchTerm);
    }

    // since we're in a function and not a class, there's no need to wrap in a 'render()' lifecycle method!
    return (
        <Wrapper>
            <Row>
                <Col md={7}>
                    <h1>{location
                        ? "Weather Info for " + location + ":"
                        : "Search by Location:"}
                    </h1>
                </Col>
                <Col md={5}>
                    <SearchForm
                        searchTerm={searchTerm}
                        handleInputChange={handleInputChange}
                        handleFormSubmit={handleFormSubmit}
                    />
                </Col>
            </Row>
            <Row>
                {days.length ? (
                    <>
                        {days.map(day => (
                            <DayCard
                                key={day.ts}
                                day={moment(day.valid_date, "YYYY-MM-DD").format("dddd")}
                                temp={day.temp}
                                high={day.high_temp}
                                low={day.low_temp}
                                icon={day.weather.icon}
                                description={day.weather.description}
                                precip={day.pop}
                                isSelected={day === selectedDay}
                                selectDay={() => setData({ ...data, selectedDay: day })}
                            />
                        ))}
                    </>
                ) : (
                    <div className="d-flex loading-spinner">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
            </Row>
            <Row>
                <Col>
                    {selectedDay ? (
                        <DayDetails
                            day={moment(selectedDay.valid_date, "YYYY-MM-DD").format("dddd, MMMM Do, YYYY")}
                            temp={selectedDay.temp}
                            high={selectedDay.high_temp}
                            appHigh={selectedDay.app_max_temp}
                            low={selectedDay.low_temp}
                            appLow={selectedDay.app_min_temp}
                            icon={selectedDay.weather.icon}
                            description={selectedDay.weather.description}
                            precip={selectedDay.pop}
                            humidity={selectedDay.rh}
                            windSpeed={selectedDay.wind_spd}
                            windDir={selectedDay.wind_cdir_full}
                        />
                    ) : (
                    <h3>{days.length ? "Click on a day above to view details!" : null}</h3>
                    )}
                </Col>
            </Row>
        </Wrapper>
    );
}

export default App;
