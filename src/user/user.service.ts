import { v4 } from "uuid";
import fs from "fs";
import { IUser } from "../types";
import path from "path";
import bcrypt from "bcrypt";
let dbURL = path.join(__dirname, "../../database/users.json");
class userService {
  create(user: Omit<IUser, "id">) {
    let newUser: IUser = {
      id: v4(),
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    };
    let users: IUser[] = JSON.parse(fs.readFileSync(dbURL).toString());

    users.push(newUser);
    fs.writeFileSync(dbURL, JSON.stringify(users));
    return newUser;
  }
  login({ username, password }: { username: string; password: string }) {
    let users: IUser[] = JSON.parse(fs.readFileSync(dbURL).toString());
    let user = users.find((item) => item.username == username);
    if (!user) {
      return;
    }
    if (bcrypt.compareSync(password, user.password)) {
      return { id: user.id, username };
    } else {
      return false;
    }
  }
}

export default new userService();