import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

import './searchbarStyles.css'

function SearchBar({products}) {


    const[value, setValue] = useState("");
    const[keyword, setKeyword] = useState("");

    const navigate = useNavigate()

    const handleChange = e => {
        console.log(`Typed => ${e.target.value}`)
        setValue(e.target.value);
        setKeyword(e.target.value);
    }







  return (
    <div>
        <TextField
                style={{top:"25px", width:"40vw"}}
                sx={{
                "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": {
                 borderColor: "white",
                 color:"white"
                         }
                        },
                "& .MuiOutlinedInput-root": {
                "& > fieldset": {
                 borderColor: "white",
                 color:"white"
                         }
                        },
                "& .MuiOutlinedInput-root:focus": {
                "& > fieldset": {
                 borderColor: "white",
                 color:"white"
                         }
                        }
                    }}
                    label="Search"
                    inputProps={{ style: { color: "white" } }}
                    variant="outlined"
                    value={value}
                    onChange={handleChange}
                    onKeyPress={(ev) => {
                        if(ev.key === 'Enter'){
                            setKeyword(value);

                            navigate('/search=' + value , {state: {keyword: keyword}});
                        }else if(ev.keyCode === 27 || ev.keyCode === 13){
                            setKeyword("");
                        }
                    }
                    }
                    />
    </div>
  )
}

export default SearchBar