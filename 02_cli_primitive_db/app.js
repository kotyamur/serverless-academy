const inquirer = require("inquirer");
const fs = require("fs").promises;
const path = require("path");

const usersPath = path.join(__dirname, "users.txt");

const getAllUsers = async () => {
    const data = (await fs.readFile(usersPath, "utf8")) || "[]";
    return JSON.parse(data);
};

const addUser = async ({ user, gender, age }) => {
    const users = await getAllUsers();
    console.log(users);
  const newUser = {
    user,
    gender,
    age,
  };
  console.log(newUser);
    
    // await fs.appendFile(usersPath, JSON.stringify(newUser, null, 2));
    users.push(newUser);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
//   return newUser;
};

const newUserData = {}

const setUserInfo = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "gender",
        message: "Choose the user's gender: ",
        choices: ["male", "female"],
      },
      {
        type: "number",
        name: "age",
        message: "Enter the user's age: ",
        default: "",
        validate(res) {
          if (!Number(res)) {
            return "Please, enter a number!";
          }
          return true;
        },
      },
    ])
    .then(async (answers) => {
        newUserData.gender = answers.gender;
        newUserData.age = answers.age;
        await addUser(newUserData);
      main();
    });
};

const getUsersFromDB = () => {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "toSearchDB",
        message: "Would you like to search values in DB? ",
        default: false,
      },
    ])
    .then(async (answers) => {
        if (answers.toSearchDB) {
            const users = await getAllUsers();
            if (!users) {
                console.log("There is no users in DB"); 
                return;
            }
            console.log(users);
            searchUserInDB(users);
      } else {
        return;
      }
    });
};

const searchUserInDB = async (users) => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "searchName",
        message: "Enter user's name you wanna find in DB: ",
      },
    ])
    .then(async (answer) => {
      const filteredUser = users.filter(
        (user) => user.user.toLowerCase() === answer.searchName.toLowerCase()
      );
      if (filteredUser.length > 0) {
        console.log(`We found user with name ${answer.searchName} in DB `);
        console.log(filteredUser);
      } else {
        console.log(`No user in DB with name ${answer.searchName}`);
      }
    });
};


const main = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "user",
        message: "Enter the user's name. To cancel press ENTER: ",
      },
    ])
    .then((answers) => {
        if (answers.user === "" || !answers.user) {
          getUsersFromDB();
        } else {
            newUserData.user = answers.user;
          setUserInfo();
        }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

main();