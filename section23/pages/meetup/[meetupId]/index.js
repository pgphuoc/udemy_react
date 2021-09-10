import MeetupDetail from "../../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { MONGO_URI } from "./../../../constants";
import { Fragment } from "react";
import Head from "next/head";

const MeetupDetailPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

// With getStaticProp on dynamic page, need declare params list
export async function getStaticPaths() {
  const client = await MongoClient.connect(MONGO_URI);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    fallback: false, // true: create at runtime, if path not exists
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  // fetch data from API
  const client = await MongoClient.connect(MONGO_URI);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectMeetup._id.toString(),
        title: selectMeetup.title,
        address: selectMeetup.address,
        image: selectMeetup.image,
        description: selectMeetup.description,
      },
      revalidate: 10, // rebuild for each 10ms (refresh from server side)
    },
  };
}

export default MeetupDetailPage;
