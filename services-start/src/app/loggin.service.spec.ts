//describe

//it - individual test

//expect - used to define the expected outcomes
import { LoggingService } from "./loggin.service";

describe("logging.service", () => {
  beforeEach(() =>{
    spyOn(console,'log');
  })

  //check account status
  it("should console log the status of the server", ()=>{
    const loggingService = new LoggingService();
    loggingService.logStatusChange("active");

    expect(console.log).toHaveBeenCalledWith('A server status changed, new status: active');
    })
})
