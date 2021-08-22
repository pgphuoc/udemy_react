import classes from "./Card.module.css";

export default function Card(props) {
  const { className, children } = props;
  return <div className={`${classes.card} ${className}`}>{children}</div>;
}
