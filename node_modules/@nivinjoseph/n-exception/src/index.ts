import "@nivinjoseph/n-ext";
import { Exception } from "./exception";
import { ApplicationException } from "./application-exception";
import { ArgumentException } from "./argument-exception";
import { ArgumentNullException } from "./argument-null-exception";
import { InvalidArgumentException } from "./invalid-argument-exception";
import { InvalidOperationException } from "./invalid-operation-exception";
import { NotImplementedException } from "./not-implemented-exception";
import { ObjectDisposedException } from "./object-disposed-exception";


Error.prototype.toString = function (): string
{
    const obj = Object(this);
    if (obj !== this)
        throw new TypeError();

    let log = this.stack ?? "No stack trace";
    if ((this as Exception).innerException)
        log = log + "\n" + "Inner Exception --> " + (<Exception>this).innerException!.toString();

    return log;
};


export
{
    Exception,
    ApplicationException,
    ArgumentException,
    ArgumentNullException,
    InvalidArgumentException,
    InvalidOperationException,
    NotImplementedException,
    ObjectDisposedException
};