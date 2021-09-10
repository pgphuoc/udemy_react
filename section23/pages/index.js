import { MongoClient } from "mongodb";
import MeetupList from "./../components/meetups/MeetupList";
import { MONGO_URI, HTTP_STATUS_CREATED_SUCCESS } from "./../constants";

import Head from "next/head";
import { Fragment } from "react";

// const DUMMY_MEETUP = [
//   {
//     id: "m1",
//     title: "A first meetup",
//     image:
//       "https://images.unsplash.com/photo-1630824104569-e81111f93eea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1191&q=80",
//     address: "98 Hai Ho",
//     description: "This's first meetup",
//   },
//   {
//     id: "m2",
//     title: "A second meetup",
//     image:
//       "https://images.unsplash.com/photo-1630824104569-e81111f93eea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1191&q=80",
//     address: "02 Quang Trung",
//     description: "This's second meetup",
//   },
// ];

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="This demo NextJS homepage" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// Execute after deloy (runtime at server side)
// From context param, can access to request/response data
// export async function getServerSideProps(context) {
//   // const req = context.req;
//   // const res = context.res;

//   // fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_MEETUP,
//     },
//   };
// }

// Talk to NextJS, here static contents, let execute it before render Components
//// The method execute on build process (not runtime from client or server)
export async function getStaticProps() {
  // fetch data from API
  const client = await MongoClient.connect(MONGO_URI);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
      })),
      revalidate: 10, // rebuild for each 10ms (refresh from server side)
    },
  };
}

export default HomePage;
