import NewMeetupForm from "./../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

const NewMeetupPage = () => {
  const router = useRouter();
  const onAddMeetupHandler = async (meetupInfo) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meetupInfo),
    });
    console.log(response);

    router.replace("/");
  };
  return (
    <Fragment>
      <Head>
        <title>New Meetup</title>
        <meta name="description" content="This page use create new meetup" />
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;
