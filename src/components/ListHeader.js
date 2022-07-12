
import React,from "react";

import Card from "./UI/Card";

import classes from "./ListHeader.module.css";

const ListHeader = props => {

    return (

        <Card className={classes.card}>

            <span>
                <button type="button" onClick={() => props.handleSort('TITLE')}>Title</button>
            </span>
            <span>
                <button type="button" onClick={() => props.handleSort('AUTHOR')}>Author</button>
            </span>
            <span>
                <button type="button" onClick={() => props.handleSort('COMMENT')}>Comments</button>
            </span>
            <span style={{ width: '20%' }}>
                <button type="button" onClick={() => props.handleSort('POINT')}>Points</button>
            </span>
            <span style={{ width: '10%' }}>Action </span>

        </Card>
    );


};

export default ListHeader;