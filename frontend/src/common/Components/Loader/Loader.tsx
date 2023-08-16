import {FC, useMemo} from 'react';

const Loader: FC = () => {
  const facts = [
    "Honey never spoils.",
    "A leap year isn't always 366 days.",
    "Bananas are berries, but strawberries aren't.",
    "Humans have the same number of neck vertebrae as giraffes.",
    "A chef's hat has 100 folds.",
    "The Eiffel Tower can be 15 cm taller during the summer.",
    "Some cats are allergic to humans.",
    "The unicorn is the national animal of Scotland.",
    "An octopus has three hearts.",
    "A jiffy is an actual unit of time.",
    "A group of flamingos is called a 'flamboyance'.",
    "Polar bear fur is transparent, not white.",
    "Hot water freezes faster than cold water.",
    "The Great Wall of China is not visible from the Moon with the naked eye.",
    "It's impossible to hum while holding your nose.",
    "A crocodile cannot stick its tongue out.",
    "The dot over the letter 'i' is called a tittle.",
    "A flock of crows is known as a murder.",
    "The shortest war in history lasted 38 minutes.",
    "A snail can sleep for three years.",
    "Almonds are members of the peach family.",
    "An ostrich's eye is bigger than its brain.",
    "The longest word without a vowel is 'rhythms'.",
    "A rhinoceros' horn is made of hair.",
    "A cat has 32 muscles in each ear.",
  ];

  const randomFact = useMemo(() => facts[Math.floor(Math.random() * facts.length)], []);

  return (
      <div className="fixed left-0 top-0 z-30 h-screen w-screen bg-gray-50">
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
          <div role="status">
            <svg className="mr-2 border-2 border-gray-200 rounded-full h-10 w-10 animate-spin" viewBox="0 0 24 24">
              <circle
                  className="rainbow-stroke"
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                  fill={'white'}
              ></circle>
              <path
                  className="opacity-75"
                  fill="white"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <span className="text-center font-bold">Loading</span>
        </div>
        <div className="flex flex-col absolute bottom-16 text-bold left-1/2 transform -translate-x-1/2 text-center">
          <h2 className={'font-bold'}>Did you know...</h2>
          <p>{randomFact}</p>
        </div>
      </div>
  );
};

export default Loader;

