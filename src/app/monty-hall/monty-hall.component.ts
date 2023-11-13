import { Component } from '@angular/core';
import { MontyHallService } from '../monty-hall.service';

@Component({
  selector: 'app-monty-hall',
  templateUrl: './monty-hall.component.html',
  styleUrls: ['./monty-hall.component.css']
})
export class MontyHallComponent {

  doors: { prize: string, revealed: boolean }[] = [
    { prize: '🐐', revealed: false },
    { prize: '🐐', revealed: false },
    { prize: '🐐', revealed: false }
  ];
  state: 'PICK' | 'REVEAL' = 'PICK';
  pickedDoor: number | null = null;
  switchButtonVisible = false;
  stayButtonVisible = false;
  playAgainVisible = false;
  outcome = '';

  totalSwitchPlays = 0;
  totalStayPlays = 0;
  totalSwitchWins = 0;
  totalStayWins = 0;

  switchRate: number = 0;
  stayRate: number = 0;

  manullyswitchRate: number = 0;
  manullystayRate: number = 0;

  simulations: number = 0;
  changeDoor: boolean = true;

  email:string ='';

  constructor(private montyHallService: MontyHallService) {
  }

  ngOnInit() {
    this.startOver();
  }

  

  startOver() { // Reset the game to its initial state and start over
    console.log('Starting over...');
    this.doors.forEach(door => door.revealed = false);

    // Randomly assign the car to one of the doors
    const carIndex = Math.floor(Math.random() * this.doors.length); // Generate a random number between 0 and 3 to represent the index of the door that has the car behind it
    this.doors.forEach((door, index) => door.prize = index === carIndex ? '🚗' : '🐐');

    // Reset the game state
    this.state = 'PICK';
    this.pickedDoor = null;
    this.playAgainVisible = false;
    this.outcome = '';
  }

  pickDoor(index: number) {
    if (this.state === 'PICK') {
      // this.state = 'REVEAL';
      // this.doors[index].prize = '🚗';
      // this.pickedDoor = this.doors[index];
      console.log('Picking door:', index);
      this.pickedDoor = index;
      this.state = 'REVEAL';
      this.reveal();
    }
  }

  reveal() {
    const options = this.doors.filter((door, index) => index !== this.pickedDoor && door.prize === '🐐');
    //this.revealedDoor = options[Math.floor(Math.random() * options.length)];
   // this.revealedDoor.revealed = true;
    const revealedDoorIndex = this.doors.indexOf(options[Math.floor(Math.random() * options.length)]);
    this.doors[revealedDoorIndex].revealed = true;

    this.switchButtonVisible = true;
    this.stayButtonVisible = true;
  }

  playerSwitch() {
    console.log('Player switching doors');
    this.totalSwitchPlays++;

    // const newPick = this.doors.find((door) => !door.revealed && door !== this.pickedDoor);
    // this.pickedDoor = newPick;

    const newPick = this.doors.findIndex((door, index) =>
      index !== this.pickedDoor && !door.revealed);
    this.pickedDoor = newPick;

    this.checkWin(true);
  }

  playerStay() {
    console.log('Player staying with the current door');
    this.totalStayPlays++;
    this.checkWin(false);
  }

  checkWin(playerSwitch: boolean) {
    console.log('Checking win...');
    this.switchButtonVisible = false;
    this.stayButtonVisible = false;


    if (this.pickedDoor === null) {
      console.error('No door has been picked.');
      return;
    }

    // for (const door of this.doors) { // Loop through the doors array and set the prize behind the picked door to '🚗' to display the car
    //   door.prize = door.prize === '🚗' ? '🚗' : '🐐';
    // }

    const win = this.doors[this.pickedDoor].prize === '🚗';
    if (win) {
      console.log('You win!');
      this.outcome = 'You win!';
      if (playerSwitch) {
        this.totalSwitchWins++;
      } else {
        this.totalStayWins++;
      }
    } else {
      console.log('You lose!');
      this.outcome = 'You lose!';
    }

    this.manullyswitchRate = this.totalSwitchPlays === 0 ? 0 : (this.totalSwitchWins / this.totalSwitchPlays) * 100; // Calculate the switch rate (totalSwitchWins / totalSwitchPlays * 100)

    this.manullystayRate = this.totalStayPlays === 0 ? 0 : (this.totalStayWins / this.totalStayPlays) * 100;


    // Reveal the prize behind the picked door
    this.doors[this.pickedDoor].revealed = true;

    this.playAgainVisible = true;
  }

  // runSimulations() {
  //   this.totalSwitchWins = 0;
  //   this.totalStayWins = 0;

  //   for (let i = 0; i < this.simulations; i++) { // Loop through the number of simulations specified by the user (this.simulations) and run the code below for each simulation
  //     const doors = ['🐐', '🐐', '🐐'];
  //     const carIndex = Math.floor(Math.random() * 3); // Generate a random number between 0 and 2 to represent the index of the door that has the car behind it
  //     doors[carIndex] = '🚗';

  //     let initialChoice = Math.floor(Math.random() * 3);  // Generate a random number between 0 and 2 to represent the index of the door that the player initially chooses
  //     let revealed = -1;

  //     do { // Generate a random number between 0 and 2 to represent the index of the door that is revealed to the player
  //       revealed = Math.floor(Math.random() * 3);
  //     } while (revealed === initialChoice || doors[revealed] === '🚗');

  //     if (this.changeDoor) { // If the player chooses to change doors, set the initialChoice variable to the index of the door that the player did not initially choose and was not revealed
  //       initialChoice = 3 - initialChoice - revealed;
  //     }

  //     if (doors[initialChoice] === '🚗') {
  //       // If the player wins, set the outcome to 'You win!'
  //       this.outcome = 'You win!';
  //       // Set the prize behind the picked door to '🚗' to display the car
  //       this.doors[initialChoice].prize = '🚗';
  //       this.totalSwitchWins++;
  //     } else {
  //       this.outcome = 'You lose!';
  //       this.doors[initialChoice].prize = '🐐';
  //       this.totalStayWins++;
  //     }
  //   }

  //   this.switchRate = (this.totalSwitchWins / this.simulations) * 100;
  //   this.stayRate = (this.totalStayWins / this.simulations) * 100;
  // }

  runSimulations() {
    console.log('Running simulations...');
    this.montyHallService.runMontyHallSimulations(this.simulations, this.changeDoor)
      .subscribe((result) => {
        console.log('Simulation result:', result);
        this.switchRate = result.switchWinRate;
        this.stayRate = result.stayWinRate;
      });
  }
}
