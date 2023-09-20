import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
]

export const AutoCompleteComponent = ({
    disableCloseOnSelect,
    id,
    handleAutoSelect,
    value,
    inputValue,
    autoSelectList,
    minWidth,
    renderInput
}) => {
    return (
        <Autocomplete
            disableCloseOnSelect={disableCloseOnSelect}
            id={id}
            value={value}
            onChange={handleAutoSelect}
            inputValue={inputValue}
            onInputChange={handleAutoSelect}
            options={autoSelectList}
            sx={{ width: 350 }}
            renderInput={(params) => <TextField {...params} label="" className='autocomplete-text-box' placeholder='Search' />}
        />
    );
}