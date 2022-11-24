import { useRouter } from "next/router";

// our-domain/news/something-important

function DetailPage() {
  const router = useRouter();

  const newsId = router.query.newsId;

  // send a request to backend API
  // to fetch the news item with newsId

  return <h1>The Detail Page</h1>;
}

export default DetailPage;
