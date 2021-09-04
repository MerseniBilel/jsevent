import { object, string } from "yup";

export const createUserSchema = object({
  body: object({
    name: string().required("Name is required."),
    lastname: string().required("Lastname is required."),
    password: string()
      .required("Email is required.")
      .min(6, "Password is too short - Should be 6 char minimum."),
    email: string().email("Email must be valied").required("Email is required"),
  }),
});

export const CreateEventSchema = object({
  body: object({
    name: string().required("name of the event is required"),
    description: string().required("event description is required"),
    eventimg : string().required("event image url is required"),
    eventLeader : object({
        leaderName : string().required("Leader name is required"),
        leaderLastname : string().required("Leader lastname is required"),
        leaderimg : string().required("Leader profile pic is required"),
    }),
  }),
});
