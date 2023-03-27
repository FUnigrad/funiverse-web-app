import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

function SearchInput({ placeholder = 'Search workspace' }: TextFieldProps) {
  return (
    <TextField
      sx={{
        width: '100%',
        '.MuiInputBase-root': { borderRadius: '24px', height: '36px' },
        minHeight: 'unset',
      }}
      size="small"
      variant="outlined"
      placeholder={placeholder}
      // onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        // endAdornment: (
        //   <InputAdornment
        //     position="end"
        //     style={{ display: showClearIcon }}
        //     onClick={handleClick}
        //   >
        //     <ClearIcon />
        //   </InputAdornment>
        // )
      }}
    />
  );
}

export default SearchInput;
