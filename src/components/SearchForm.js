import React from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { FormWrapper } from "../styles";

const SearchForm = ({ searchTerm, handleInputChange, handleFormSubmit }) => {
    return (
        <FormWrapper inline onSubmit={handleFormSubmit}>
            <FormGroup>
                <Label for="searchTerm" hidden>Search by Location:</Label>
                <Input 
                    type="text" 
                    name="searchTerm" 
                    id="searchTerm" 
                    placeholder="Mount Rushmore OR 10014 OR Denver, CO" 
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <Button onClick={handleFormSubmit}>Search</Button>
        </FormWrapper>
    );
}

export default SearchForm;