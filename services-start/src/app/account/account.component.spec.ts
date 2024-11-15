import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { LoggingService } from '../loggin.service';
import { AccountService } from '../account.service';
import { By } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let accountServiceSpy: jasmine.SpyObj<AccountService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AccountService', ['updateAccount'], {
      statusUpdated: new EventEmitter<string>()
    });

    await TestBed.configureTestingModule({
      declarations: [AccountComponent],
      providers: [
        { provide: AccountService, useValue: spy },
        { provide: LoggingService, useClass: LoggingService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    accountServiceSpy = TestBed.inject(AccountService) as jasmine.SpyObj<AccountService>;

    component.account = { name: 'Test Account', status: 'inactive' };
    component.id = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the account name and status', () => {
    const nameEl = fixture.debugElement.query(By.css('h5')).nativeElement;
    const statusEl = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(nameEl.textContent).toContain('Test Account');
    expect(statusEl.textContent).toContain('inactive');
  });

  it('should call accountService.updateAccount with correct parameters when "Set to" buttons are clicked', () => {
    const statusButtons = fixture.debugElement.queryAll(By.css('button'));

    statusButtons[0].triggerEventHandler('click', null);  // 'Set to active'
    expect(accountServiceSpy.updateAccount).toHaveBeenCalledWith(1, 'active');

    statusButtons[1].triggerEventHandler('click', null);  // 'Set to inactive'
    expect(accountServiceSpy.updateAccount).toHaveBeenCalledWith(1, 'inactive');

    statusButtons[2].triggerEventHandler('click', null);  // 'Set to unknown'
    expect(accountServiceSpy.updateAccount).toHaveBeenCalledWith(1, 'unknown');
  });

  it('should emit statusUpdated event with correct status when "Set to" buttons are clicked', () => {
    spyOn(accountServiceSpy.statusUpdated, 'emit');

    component.onSetTo('active');
    expect(accountServiceSpy.statusUpdated.emit).toHaveBeenCalledWith('active');

    component.onSetTo('inactive');
    expect(accountServiceSpy.statusUpdated.emit).toHaveBeenCalledWith('inactive');

    component.onSetTo('unknown');
    expect(accountServiceSpy.statusUpdated.emit).toHaveBeenCalledWith('unknown');
  });
});
