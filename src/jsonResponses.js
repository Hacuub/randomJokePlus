const jokes = [
  {
    q: 'What do you call a very small valentine?',
    a: 'A valen-tiny!',
  },
  {
    q: 'What did the dog say when he rubbed his tail on the sandpaper?',
    a: 'Ruff, Ruff!',
  },
  {
    q: "Why don't sharks like to eat clowns?",
    a: 'Because they taste funny!',
  },
  {
    q: 'What did the boy cat say to the girl cat?',
    a: "You're Purr-fect!",
  },
  {
    q: "What is a frog's favorite outdoor sport?",
    a: 'Fly Fishing!',
  },
  {
    q: 'I hate jokes about German sausages.',
    a: 'Theyre the wurst.',
  },
  {
    q: 'Did you hear about the cheese factory that exploded in France?',
    a: 'There was nothing left but de Brie.',
  },
  {
    q: 'Our wedding was so beautiful',
    a: 'Even the cake was in tiers.',
  },
  {
    q: 'Is this pool safe for diving?',
    a: 'It deep ends.',
  },
  {
    q: 'Dad, can you put my shoes on?',
    a: 'I dont think theyll fit me.',
  },
];

//  found online at:
//  https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 6 - this will return a random number no bigger than `max`, as a string
// we will also doing our query parameter validation here
const getRandomJokesJSON = (max = 1) => {
  let max2 = Number(max);
  max2 = !max2 ? 1 : max2;
  max2 = max2 < 1 ? 1 : max2;
  max2 = max2 > jokes.length ? jokes.length : max2;
  shuffleArray(jokes);
  const newJokes = [];
  for (let i = 0; i < max2; i++) {
    newJokes[i] = jokes[i];
  }
  return JSON.stringify(newJokes);
};

const getRandomJokesXML = (max = 1) => {
  let max2 = Number(max);
  max2 = !max2 ? 1 : max2;
  max2 = max2 < 1 ? 1 : max2;
  max2 = max2 > jokes.length ? jokes.length : max2;
  shuffleArray(jokes);
  const newJokes = [];
  for (let i = 0; i < max2; i++) {
    newJokes[i] = jokes[i];
  }
  const xmlJokes = [];
  for (let i = 0; i < max2; i++) {
    xmlJokes[i] = `<joke><q>${newJokes[i].q}</q><a>${newJokes[i].a}</a></joke>`;
  }
  return `<jokes>${xmlJokes}</jokes`;
};

const getRandomJokeResponse = (request, response, params, type) => {
  if (type.includes("text/xml")) {
    response.writeHead(200, { 'Content-Type': 'text/xml' });
    if(request.method !== "HEAD"){
      response.write(getRandomJokesXML(params));
    }
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    if(request.method !== "HEAD"){
      response.write(getRandomJokesJSON(params));
    }
  }
  response.end();
};

module.exports = {
  getRandomJokeResponse,
};
