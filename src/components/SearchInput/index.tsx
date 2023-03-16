import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

function SearchInput() {
  return (
    <TextField
      sx={{
        width: '100%',
        '.MuiInputBase-root': { borderRadius: '24px', height: '36px' },
        minHeight: 'unset',
      }}
      size="small"
      variant="outlined"
      placeholder="Search workspace"
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
