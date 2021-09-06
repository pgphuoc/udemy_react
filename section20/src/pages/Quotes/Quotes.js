import QuoteList from '@/components/quotes/QuoteList';
import { DUMMY_QUOTES } from '@/constants';

const Quotes = () => {
  return <QuoteList quotes={DUMMY_QUOTES} />;
};

export default Quotes;
