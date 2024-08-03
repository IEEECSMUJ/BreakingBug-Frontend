import { InputBase, Box, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSearchedProducts } from '../../../redux/userHandle';

const Search = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = () => {
        dispatch(getSearchedProducts("searchProduct", searchTerm));

  //-------->FIXED 42TH BUG <----------//

        if (location.pathname !== "/ProductSearch") {
            navigate("/ProductSearch");
        }
    };

    return (
        <SearchContainer>
            <InputSearchBase
                placeholder="Search for products, brands and more"
                value={searchTerm}
                // fixed 24th bug 
                //replace etargetvalue to e.target.value
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    // fixed 25th bug 
                //replace eKey  to e.Key
                    if (e.key === 'Enter')  ///FIXED 43RD BUG
                     {
                        handleSearch();
                    }
                }}
            />

            {/* //---->fixed 44th bug -------> */}
            
            <SearchIconWrapper onClick={handleSearch}>

                <SearchIcon sx={{ color: "#4d1c9c" }} />
            </SearchIconWrapper>
        </SearchContainer>
    )
}

const SearchContainer = styled(Box)`
  border-radius: 2px;
  margin-left: 10px;
  width: 38%;
  background-color: #fff;
  display: flex;
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: blue;
`;

const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
`;

export default Search;