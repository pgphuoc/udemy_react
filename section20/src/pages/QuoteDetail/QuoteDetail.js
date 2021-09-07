import Comments from '@/components/comments/Comments';
import HighlightedQuote from '@/components/quotes/HighlightedQuote';
import NoQuotesFound from '@/components/quotes/NoQuotesFound';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import useHttp from '@/hooks/use-http';
import { getSingleQuote } from '@/utils/api';
import { Fragment, useEffect } from 'react';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';

const QuoteDetail = () => {
  const params = useParams();
  const { quoteId } = params;
  const match = useRouteMatch();
  // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  const {
    sendRequest,
    status,
    data: quote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === 'completed' && !quote.text) {
    return <NoQuotesFound />;
  }

  return (
    <Fragment>
      <h1>Quote Detail Page</h1>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
