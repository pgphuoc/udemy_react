import classes from "./Card.module.css";

function Card(props) {
  const styleClass =
    props.type === "item" ? `${classes.card} ${classes.card25}` : classes.card;
  return <div className={styleClass}>{props.children}</div>;
}

export default Card;
