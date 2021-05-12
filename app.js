const express = require("express");
const morgan = require ('morgan');
const bookBank = require ('./bookBank')

const app = express();

app.use(morgan('dev'));

app.use(express.static ('./other'));

app.get("/", (req, res) => {

  const books = bookBank.list();

  const html = `<!DOCTYPE html>
  <html>
    <head>
    <title> Zoe's book selection </title>
    <link rel='stylesheet' href= './style.css'></link>
    </head> 
      <body>
        <ul>
          ${books.map(book => `<a href= "/book/${book.id}">${book.title}</a>`).join(' ')}
        </ul>
      </body>
  </html>`;

  res.send(html);
}
);

app.get ('/book/:id', (req, res)=>{
  const id = req.params.id;
  const book = bookBank.find(id);

  res.send(`<!DOCTYPE html>
  <html>
    <head>
    <title> Individual Book </title>
    <link rel ='stylesheet' href = './style.css'></link>
    </head> 
      <body>
        <ul>
        <li>${book.title}'s genre is ${book.genre}</li>
        <li>Its author is ${book.name}</li>
        <li>Zoe's personal rating for "${book.title}" is ${book.zoeRating}/5</li>
        </ul>
      </body>

  </html>`);
})

const PORT = 4556;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});