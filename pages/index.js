import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image: "https://i.ebayimg.com/images/g/NaMAAOSwTvlitz~s/s-l1600.jpg",
    address: "Old Trafford, Sir Matt Busby Way, Manchester, M16 0RA",
    description: "A legendery meetup of number 7s",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image: "https://i.ebayimg.com/images/g/NaMAAOSwTvlitz~s/s-l1600.jpg",
    address: "Old Trafford, Sir Matt Busby Way, Manchester, M16 0RA",
    description: "A second legendery meetup of number 7s",
  },
];

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://shak_1:KoxQWaa87@atlascluster.tk341ee.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
