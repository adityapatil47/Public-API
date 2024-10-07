import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = 3000;
const URL = 'https://v2.jokeapi.dev/joke';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index.ejs', { joke: 'wait joking...' });
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
    const response = await axios.get(`${URL}/${category}?lang=en&format=txt`);
    const joke = response.data;
    // console.log(joke);

    res.render('index.ejs', { joke: joke });
  } catch (error) {
    res.render('index.ejs', { joke: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
