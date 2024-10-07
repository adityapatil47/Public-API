import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = 3000;
const URL = 'https://v2.jokeapi.dev/joke';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index.ejs', { jokesArray: ['wait joking...'] });
});

app.post('/getJoke', async (req, res) => {
  try {
    var category = req.body.category;
    if (category === 'misc') {
      const checked_misc = req.body.misc;
      if (checked_misc && checked_misc.length > 0 && checked_misc.length < 5) {
        category = '';
        checked_misc.forEach((subCat) => {
          category += subCat + '+';
        });
        category = category.slice(0, -1);
      }
    }

    const langAndFormat = '?lang=en&format=txt';
    const jokeType = req.body.jokeType;
    var jokeTypeQuery = '';

    if (jokeType === 'single') {
      jokeTypeQuery += `&type=${jokeType}`;
    } else if (jokeType === 'twopart') {
      jokeTypeQuery += `&type=${jokeType}`;
    }

    const jokeAmount = req.body.jokeAmount;

    if (jokeAmount > 1) {
      jokeTypeQuery += `&amount=${jokeAmount}`;
    }

    var requestedURL = `${URL}/${category}${langAndFormat}${jokeTypeQuery}`;
    // console.log(requestedURL);

    const response = await axios.get(requestedURL);

    var joke = response.data;

    let jokesArray = joke.split(
      '----------------------------------------------'
    );

    // Trim leading and trailing whitespace from each element
    jokesArray = jokesArray.map((joke) => joke.trim());

    // console.log(jokesArray);
    res.render('index.ejs', { jokesArray: jokesArray });
  } catch (error) {
    res.render('index.ejs', { jokesArray: [error.message] });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
