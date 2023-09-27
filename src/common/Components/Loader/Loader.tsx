import { FC, useMemo } from "react";
import {
  LOCALSTORAGE_THEME_KEY,
  DARK_THEME_KEY,
} from "../../../util/constants";

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
    "Sharks are 50 millions years older than trees.",
    "Your circulatory system system of blood vessels - arteries, veins, and capillaries - is over 60,000 miles long. That's long enough to go around the world more than twice!",
    "Venus rotates in the opposite direction to most planets.",
    "The smell of freshly-cut grass is actually a plant distress call.",
    "Some metals are so reactive that they explode on contact with water.",
    "A single lightning bolt can be five times hotter than the sun's surface.",
    "A teaspoonful of neutron star would weigh 6 billion tons.",
    "Astronauts' height can change in space.",
    "A flea can jump over 200 times its own height.",
    "The shortest scientific paper ever published contained only two sentences.",
    "Reindeer eyes change color between summer and winter.",
    "Hippopotamus milk is pink.",
    "The word 'nerd' was first coined by Dr. Seuss in 'If I Ran the Zoo' in 1950.",
    "Some turtles can breathe through their butts.",
    "The inventor of the frisbee was turned into a frisbee.",
    "The name for the shape of Pringles is called a 'Hyperbolic Paraboloid'.",
    "There are more possible iterations of a game of chess than there are atoms in the known universe.",
    "The average person walks the equivalent of three times around the world in a lifetime.",
    "A shark can detect a fish's heartbeat before it attacks.",
    "Astronauts can grow up to two inches taller in space.",
    "A day on Venus is longer than a year on Venus.",
    "The smell of chocolate increases theta brain waves, which triggers relaxation.",
    "Banging your head against a wall burns 150 calories an hour.",
    "The total weight of all the ants on Earth is greater than the total weight of all the humans on the planet.",
    "A cockroach can live for about a week without its head.",
    "The inventor of the pop-up ad later apologized for creating it.",
    "A blue whale's heart is the size of a small car.",
    "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
    "A jiffy is a unit of time for 1/100th of a second.",
    "The unicorn is the national animal of Scotland.",
    "You are 1% shorter in the evening than in the morning.",
    "It would take a sloth one month to travel one mile.",
    "10% of the world's population is left-handed.",
    "A broken clock is right two times every day.",
    "According to Amazon, the most highlighted books on Kindle are the Bible, the Steve Jobs biography, and The Hunger Games.",
    "Bob Marley's last words to his son before he died were 'Money can't buy life'.",
    "A mole can dig a tunnel that is 300 feet long in only one night.",
    "A hippo's wide-open mouth is big enough to fit a 4-foot-tall child in.",
    "Drake had a Bar Mitzvah",
  ];

  const randomFact = useMemo(
    () => facts[Math.floor(Math.random() * facts.length)],
    []
  );

  return (
    <div className="fixed left-0 top-0 z-30 h-screen w-screen">
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
        <div
          role="status"
          className={`loader ${
            localStorage.getItem(LOCALSTORAGE_THEME_KEY) === DARK_THEME_KEY
              ? "dark"
              : ""
          }`}
        ></div>
      </div>
      <div className="text-bold absolute bottom-16 left-1/2 flex -translate-x-1/2 transform flex-col text-center">
        <h2 className="font-bold">Did you know...</h2>
        <p className={"text-base"}>{randomFact}</p>
      </div>
    </div>
  );
};

export default Loader;
