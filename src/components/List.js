import { sortBy } from "lodash";
import React, { useState } from "react";

import Item from "./Item";
import ListHeader from "./ListHeader";



const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENT: list => sortBy(list, 'num_comments'),
    POINT: list => sortBy(list, 'points'),
};

const List = (props) => {

    const [sort, setSort] = useState({ sortKey: 'NONE', isReverse: false });

    const handleSort = sortKey => {
        const isReverse = sort.sortKey === sortKey && !sort.isReverse;
        setSort({ sortKey: sortKey, isReverse: isReverse });
    };

    const sortFunction = SORTS[sort.sortKey];
    const sortedList = sort.isReverse ?
        sortFunction(props.list).reverse() : sortFunction(props.list);

    return (

        <div>
            <ListHeader list={props} handleSort={handleSort} />
            {sortedList.map(item => <Item key={item.objectID} item={item} onRemove={props.onRemoveItem} />)}


        </div>
    );
};
export default List;