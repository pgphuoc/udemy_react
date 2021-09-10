import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useRouter } from "next/router";

function MeetupItem(props) {
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push(`/meetup/${props.id}`);
  };

  return (
    <Card type="item">
      <img src={props.image} alt={props.title} className={classes.itemImage} />

      <div className={classes.itemContent}>
        <h3 className={classes.itemTitle}>{props.title}</h3>
        <p className={classes.itemAddress}>{props.address}</p>
      </div>
      <div className={classes.itemButton}>
        <button onClick={showDetailsHandler}>Show Details</button>
      </div>
    </Card>
  );
}

export default MeetupItem;
