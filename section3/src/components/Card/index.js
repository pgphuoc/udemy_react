import "./Card.css";

export default function Card(props) {
  const { className, children } = props;
  const classes = "card " + className;

  return <div className={classes}>{children}</div>;
}
