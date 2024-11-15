import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AccountService} from "./account.service";
import {LoggingService} from "./loggin.service";
import { By } from '@angular/platform-browser';
import { NewAccountComponent } from "./new-account/new-account.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AccountComponent} from "./account/account.component";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
     TestBed.configureTestingModule({
      declarations: [
        AppComponent,NewAccountComponent,AccountComponent
      ],
       providers: [AccountService, LoggingService],
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.accounts = [{ name: 'Account 1', status: 'Active' }, { name: 'Account 2', status:'unknown'}]; // Sample data
    fixture.detectChanges();
  });

  it('should render the new-account component', () => {
    const newAccount = fixture.debugElement.query(By.directive(NewAccountComponent));
    expect(newAccount).toBeTruthy();
  });

  it('should pass the correct account and id to each app-account component', () => {
    const accountComponents = fixture.debugElement.queryAll(By.directive(AccountService));

    accountComponents.forEach((accountComp, index) => {
      expect(accountComp.componentInstance.account).toBe(component.accounts[index]);
      expect(accountComp.componentInstance.id).toBe(index);
    });
  });


});
