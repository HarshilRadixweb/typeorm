import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Admin } from "../entity/Admin";
import { Teacher } from "../entity/Teacher";

export class UserController {
  private userRepository = getRepository(User).createQueryBuilder();
  private adminRepository = getRepository(Admin).createQueryBuilder("admin");
  private teacherRepository =
    getRepository(Teacher).createQueryBuilder("teacher");

  async all(request: Request, response: Response, next: NextFunction) {
    let query = this.userRepository.select("user").from(User, "user");
    const inputs = await query.getRawMany();
    return inputs;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const emails = request.body.email;
    let res = [];
    const repo =
      request.body.role == "admin"
        ? this.adminRepository
        : this.teacherRepository;
    for (const element of emails) {
      var key = emails.indexOf(element);
      let subval = {};
      let val = {};
      if (key == 0) {
        subval = {
          first_name: request.body.first_name,
          last_name: request.body.last_name,
          email: element,
        };
        val = {
          user_name: request.body.user_name,
          password: request.body.password,
          role: request.body.role,
          email: element,
        };
      } else {
        subval = {
          email: element,
        };
        val = {
          role: request.body.role,
          email: element,
        };
      }
      await repo.insert().into(`${request.body.role}`).values(subval).execute();
      let data = await this.userRepository
        .insert()
        .into("user")
        .values(val)
        .returning("email")
        .execute();
      res.push(data.raw[0].email);
    }
    return res;
  }
  async getUserPagination(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    let limit = request.query.limit ? parseInt(request.query.limit) : 5;
    let start = request.query.start ? parseInt(request.query.start) : 0;
    let query = this.userRepository
      .select("user")
      .from(User, "user")
      .skip(start)
      .take(limit);
    const inputs = await query.getRawMany();
    return inputs;
  }
}
