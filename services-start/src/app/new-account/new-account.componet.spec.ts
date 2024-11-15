import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewAccountComponent } from './new-account.component';
import { AccountService } from '../account.service';
import { LoggingService } from '../loggin.service';
import { By } from '@angular/platform-browser';

describe('NewAccountComponent (Integration)', () => {
  let component: NewAccountComponent;
  let fixture: ComponentFixture<NewAccountComponent>;
  let accountService: AccountService;
  let loggingService: LoggingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewAccountComponent],
      providers: [AccountService, LoggingService]  // Use real services here
    }).compileComponents();

    fixture = TestBed.createComponent(NewAccountComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
    loggingService = TestBed.inject(LoggingService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new account and log the status change', () => {
    const accountNameInput = fixture.debugElement.query(By.css('input')).nativeElement;
    const statusSelect = fixture.debugElement.query(By.css('select')).nativeElement;
    const addButton = fixture.debugElement.query(By.css('button')).nativeElement;

    // Set input values
    accountNameInput.value = 'New Account';
    accountNameInput.dispatchEvent(new Event('input'));

    statusSelect.value = 'inactive';
    statusSelect.dispatchEvent(new Event('change'));

    // Spy on logStatusChange to verify it is called when adding an account
    spyOn(loggingService, 'logStatusChange').and.callThrough();

    // Click the "Add Account" button
    addButton.click();
    fixture.detectChanges();

    // Check if the account was added to AccountService
    expect(accountService.accounts.length).toBe(4);  // Initial 3 accounts + 1 new account
    expect(accountService.accounts[3]).toEqual({ name: 'New Account', status: 'inactive' });

    // Verify that logStatusChange was called with the correct status
    expect(loggingService.logStatusChange).toHaveBeenCalledWith('inactive');
  });



  it('should fail this test by expecting incorrect account length', () => {
    // Arrange: We start with 3 accounts in the service
    expect(accountService.accounts.length).toBe(3); // This should pass

    // Act: Add a new account
    component.onCreateAccount('Failing Test Account', 'inactive');
    fixture.detectChanges();

    // Assert: Intentionally make the test fail by expecting an incorrect account length
    expect(accountService.accounts.length).toBe(2); // This is incorrect and will cause the test to fail
  });
});
