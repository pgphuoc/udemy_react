import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
// import QuoteDetail from './pages/QuoteDetail/QuoteDetail';

const NewQuote = React.lazy(() => import('./pages/NewQuote/NewQuote'));
const Quotes = React.lazy(() => import('./pages/Quotes/Quotes'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail/QuoteDetail'));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <Quotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
