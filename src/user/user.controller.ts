import { Request, Response } from "express";
import userService from "./user.service";
class userController {
  register(req: Request, res: Response) {
    let {fullname, username, password } = req.body;
    let newUser = userService.create({fullname, username, password });
    res.send({ id: newUser.id, username: newUser.username });
  }
  login(req: Request, res: Response) {
    let { username, password } = req.body;
    let user: { id: string; username: string } | undefined | boolean =
      userService.login({ username, password });
    if (typeof user == "undefined") {
      return res.status(404).send({
        message: "User Not found",
      });
    }
    if (!user) {
      return res.status(401).send({
        message: "Password is incorrect",
      });
    }
    res.send(user);
  }
}

export default new userController();