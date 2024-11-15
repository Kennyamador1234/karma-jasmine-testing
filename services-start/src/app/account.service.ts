import {LoggingService} from "./loggin.service";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class AccountService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];
  statusUpdated = new EventEmitter<string>();

  constructor(private logging: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({ name, status });
    this.logging.logStatusChange(status);
  }

  updateAccount(id: number, status: string) {
    this.accounts[id].status = status;
    this.logging.logStatusChange(status);
  }
}
