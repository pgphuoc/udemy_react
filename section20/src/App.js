import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/layout/Layout';

import Quotes from './pages/Quotes/Quotes';
import QuoteDetail from './pages/QuoteDetail/QuoteDetail';
import NewQuote from './pages/NewQuote/NewQuote';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Layout>
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
    </Layout>
  );
}

export default App;
