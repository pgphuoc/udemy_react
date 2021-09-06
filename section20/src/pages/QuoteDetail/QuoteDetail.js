import Comments from '@/components/comments/Comments';
import HighlightedQuote from '@/components/quotes/HighlightedQuote';
import NoQuotesFound from '@/components/quotes/NoQuotesFound';
import { DUMMY_QUOTES } from '@/constants';
import { Fragment } from 'react';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  if (!quote) {
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
