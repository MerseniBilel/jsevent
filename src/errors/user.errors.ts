// error if user alrady exist
export  class UserExist extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserExist";

    //set the instanceof value to the class name
    Object.setPrototypeOf(this, UserExist.prototype);
  }

  showerror(): string {
    return this.name + " : " + this.message;
  }
}

// error while calling mongoose.save methode
export class CantCreateUser extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CantCreateUser";

    //set the instanceof value to the class name
    Object.setPrototypeOf(this, CantCreateUser.prototype);
  }

  showerror(): string {
    return this.name + " : " + this.message;
  }
}

// error while calling find methide from mangoose
export class CantSearchUser extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CantSearchUser";

    //set the instanceof value to the class name
    Object.setPrototypeOf(this, CantSearchUser.prototype);
  }

  showerror(): string {
    return this.name + " : " + this.message;
  }
}

// unknow error
export class UnkownError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnkownError";

    // set the instanceof value to the class name
    Object.setPrototypeOf(this, UnkownError.prototype);
  }
  showerror(): string {
    return this.name + " : " + this.message;
  }
}

// incorrect password
export  class IncorrectPass extends Error {
  constructor(message: string) {
    super(message);
    this.name = "IncorrectPass";

    //set the instanceof value to the class name
    Object.setPrototypeOf(this, IncorrectPass.prototype);
  }

  showerror(): string {
    return this.name + " : " + this.message;
  }
}


// user not found
export class UserNotFound extends Error{
  constructor(message: string){
    super(message);
    this.name = "User Not Found";
  
    // set the instance of value to the class name
    Object.setPrototypeOf(this, UserNotFound.prototype);
  }

  showerror(): string{
    return this.name + " : " + this.message
  }
}
