const sortFn = require("./sortFn");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin, // ввод из стандартного потока
  output: process.stdout, // вывод в стандартный поток
});
// cat dog mouse 2 23 15 5 frog soup 8

const greeting = "Hello! Enter 10 words or digits deviding them in spaces and press ENTER:\n";
const listOfVariants =
  "What operation to do with words and numbers? Please, enter the option letter(a-f) and press ENTER!!!\n a. Sort words alphabetically\n b. Show numbers from lesser to greater\n c. Show numbers from bigger to smaller\n d. Display words in ascending order by number of letters in the word\n e. Show only unique words\n f. Display only unique values from the set of words and numbers entered by the user";

const invokeAction = ( action, answer ) => {
  switch (action) {
    case "a":
      console.log("Sort words alphabetically");
      console.log(sortFn.sortAlphabetically(answer));
      break;
    case "b":
      console.log("Show numbers from lesser to greater");
      console.log(sortFn.sortInAscendingOrder(answer));
      break;
    case "c":
      console.log("Show numbers from bigger to smaller");
      console.log(sortFn.sortInDescendingOrder(answer));
      break;
    case "d":
      console.log(
        "Display words in ascending order by number of letters in the word"
      );
      console.log(sortFn.sortByNumberOfLetters(answer));
      break;
    case "e":
      console.log("Show only unique words");
      console.log(sortFn.filterUniqueWords(answer));
      break;
    case "f":
      console.log(
        "Display only unique values from the set of words and numbers entered by the user"
      );
      console.log(sortFn.filterUniqueValues(answer));
      break;

    default:
      console.log("Your answer invalid, please try again");
  }
};

const main = () => {
  rl.question(greeting, (answer) => {
    if (answer === "exit") {
      rl.close();
      return;
    }
    console.log(`Your answer: ${answer}. \n${listOfVariants}`);
    console.log("To exit the program, you need to enter 'exit'");
    
    rl.on("line", (cmd) => {
      console.log(`You just typed: ${cmd}`);
      
      if (cmd === "exit") {
          rl.close();
          return;
      }
      invokeAction(cmd, answer.split(" "));
      rl.removeAllListeners()
      main();
    });
  });
}

main();