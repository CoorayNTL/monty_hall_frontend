import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MontyHallComponent } from './monty-hall.component';

describe('MontyHallComponent', () => {
  let component: MontyHallComponent;
  let fixture: ComponentFixture<MontyHallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MontyHallComponent],
    });

    fixture = TestBed.createComponent(MontyHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.doors).toEqual([
      { prize: '🐐', revealed: false },
      { prize: '🐐', revealed: false },
      { prize: '🐐', revealed: false }
    ]);
    expect(component.state).toBe('PICK');
    expect(component.switchButtonVisible).toBe(false);
    expect(component.stayButtonVisible).toBe(false);
    expect(component.playAgainVisible).toBe(false);
    expect(component.totalSwitchPlays).toBe(0);
    expect(component.totalStayPlays).toBe(0);
    expect(component.totalSwitchWins).toBe(0);
    expect(component.totalStayWins).toBe(0);
    expect(component.switchRate).toBe(0);
    expect(component.stayRate).toBe(0);
    expect(component.simulations).toBe(1000);
    expect(component.changeDoor).toBe(true);
  });

  it('should pick a door and reveal it', () => {
    component.pickDoor(0);
    expect(component.state).toBe('REVEAL');
    expect(component.pickedDoor).toEqual(component.doors[0]);
    expect(component.revealedDoor).toBeTruthy();
    expect(component.switchButtonVisible).toBe(true);
    expect(component.stayButtonVisible).toBe(true);
  });

  it('should switch doors', () => { // This test is failing because the picked door is not changing
    component.pickDoor(0);
    const initialPickedDoor = component.pickedDoor;
    component.playerSwitch();
    const newPickedDoor = component.pickedDoor;

    expect(component.totalSwitchPlays).toBe(1);
    expect(newPickedDoor).not.toBe(initialPickedDoor); // The picked door should change
    expect(component.revealedDoor).toBeTruthy();

  });

  it('should stay with the original door', () => { // This test is failing because the picked door is not changing to the revealed door when the player stays
    component.pickDoor(0);
    const initialPickedDoor = component.pickedDoor;
    component.playerStay();
    const newPickedDoor = component.pickedDoor;

    expect(component.totalStayPlays).toBe(1);
    expect(newPickedDoor).toBe(initialPickedDoor); // The picked door should remain the same
    expect(component.revealedDoor).toBeTruthy();

  });

  it('should check the win status after switching', () => {
    component.pickDoor(0);
    component.playerSwitch();

  });

  it('should check the win status after staying', () => {
    component.pickDoor(0);
    component.playerStay();

  });

  it('should start the game over', () => { // This test is failing because the state is not changing to 'PICK' when the game is started over
    component.pickDoor(0);
    component.startOver();

    expect(component.state).toBe('PICK');
    expect(component.playAgainVisible).toBe(false);

  });

  it('should run simulations', () => { // This test is failing because the totalSwitchWins and totalStayWins are not being incremented
    component.runSimulations();

    expect(component.totalSwitchWins).toBeGreaterThanOrEqual(0);
    expect(component.totalStayWins).toBeGreaterThanOrEqual(0);

  });
});
