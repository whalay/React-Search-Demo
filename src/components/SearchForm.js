

import InputWithLabel from "./InputWithLabel";
import classes from './SearchForm.module.css';
import Button from "./Button";
import Card from './UI/Card';

const SearchForm = props => {



    return <Card className={classes.searchForm}>
        <form onSubmit={props.onSearchSubmit}>
            <InputWithLabel
                id="search"
                type="text"
                isFocused
                value={props.searchText}
                onInputChange={props.onSearchInput} >

                <strong>Search </strong>

            </InputWithLabel>
            <div className={classes.button}>
                <Button
                    type="submit"
                    disabled={!props.searchText}
                >
                    Submit
                </Button>
            </div>
        </form>
    </Card>
};

export default SearchForm;