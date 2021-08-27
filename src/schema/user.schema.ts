import {object, string} from "yup";

export const createUserSchema  = object({
    body : object({
        name : string().required("Name is required."),
        lastname : string().required("Lastname is required."),
        password : string().required("Email is required.")
        .min(6, "Password is too short - Should be 6 char minimum."),
        email : string().email("Email must be valied").required("Email is required")
    })
});