import { AxiosError } from "axios";

export type LoginDTO = {
  _id: string;
  name: string;
  email: string;
  token: string;
};

export type SignupDTO = LoginDTO;

export type Goal = {
  _id: string;
  user: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type GoalsDTO = Goal[];

export type CreateGoalDTO = Goal;

export type UpdateGoalDTO = Goal;

export type DeleteGoalDTO = Pick<Goal, "_id">;

export type CustomAxiosError = AxiosError<{
  message?: string;
}>;
