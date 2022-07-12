

import classes from './Item.module.css';
import Card from './UI/Card';

const Item = ({ item, onRemove }) => {

    const handleOnRemove = () => {
        onRemove(item);
    };

    return (

        <Card className={classes.item}>
            <span>
                <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
                <button
                className={classes.buttonSmall}
                    type="button"
                    onClick={handleOnRemove}>Remove</button>
            </span>

        </Card>
    );
};

export default Item;