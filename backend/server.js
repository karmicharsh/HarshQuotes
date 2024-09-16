import express from 'express';
import cors from 'cors';
import quotes from './quotes.json' assert { type: 'json' };

const app = express();
app.use(cors());

// Fetch a random quote
app.get('/random-quote', (req, res) => {
  const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomQuoteIndex];
  res.json({
    quote: randomQuote.QUOTE,
    author: randomQuote.AUTHOR,
    genre: randomQuote.GENRE
  });
});

// Search quotes by author's name or genre
app.get('/search-quotes', (req, res) => {
  const { author, genre } = req.query;
  console.log(`Searching quotes with author: ${author}, genre: ${genre}`);

  // Filter by author and/or genre
  const filteredQuotes = quotes.filter(quote =>
    (author ? quote.AUTHOR.toLowerCase() === author.toLowerCase() : true) &&
    (genre ? quote.GENRE.toLowerCase() === genre.toLowerCase() : true)
  );

  // Handle no quotes found
  if (filteredQuotes.length === 0) {
    console.log('No quotes found');
    return res.status(404).json({ error: 'No quotes found' });
  }

  // Prepare the filtered results
  const results = filteredQuotes.map(quote => ({
    quote: quote.QUOTE,
    author: quote.AUTHOR,
    genre: quote.GENRE
  }));

  res.json(results);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
