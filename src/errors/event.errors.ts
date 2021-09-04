export class CantCreateEvent extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CantCreateEvent";
    Object.setPrototypeOf(this, CantCreateEvent.prototype);
  }

  showError(): string {
    return this.name + " " + this.message;
  }
}

export class CantSearchEvent extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CantSearchEvent";
    Object.setPrototypeOf(this, CantSearchEvent.prototype);
  }

  showError(): string {
    return this.name + " " + this.message;
  }
}

export class UnknownError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnknownError";
    Object.setPrototypeOf(this, UnknownError.prototype);
  }

  showError(): string {
    return this.name + " " + this.message;
  }
}
