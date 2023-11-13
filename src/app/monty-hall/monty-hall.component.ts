import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-monty-hall',
  templateUrl: './monty-hall.component.html',
  styleUrls: ['./monty-hall.component.css']
})


export class MontyHallComponent  {

  doors: { prize: string, revealed: boolean }[] = [ // Array of objects representing the doors and their prizes (🚗 or 🐐)
    { prize: '🐐', revealed: false },
    { prize: '🐐', revealed: false },
    { prize: '🐐', revealed: false }
  ];
  state: 'PICK' | 'REVEAL' = 'PICK'; // State of the game (PICK or REVEAL) - used to determine which step of the game the user is on (picking a door or revealing a door)
  pickedDoor: any;
  revealedDoor: any;
  switchButtonVisible = false; // Whether or not the switch button is visible (true or false)
  stayButtonVisible = false; // Whether or not the switch and stay buttons are visible (true or false)
  playAgainVisible = false; // Whether or not the play again button is visible (true or false)
  outcome = '';

  totalSwitchPlays = 0; // Number of times the player switched doors
  totalStayPlays = 0; // Number of times the player stayed with their original door

  totalSwitchWins = 0; // Number of times the player won after switching doors
  totalStayWins = 0; // Number of times the player won after switching doors

  switchRate: number = 0; // Percentage of times the player won after switching doors (totalSwitchWins / totalSwitchPlays * 100)
  stayRate: number = 0; // Percentage of times the player won after staying with their original door (totalStayWins / totalStayPlays * 100)

  simulations: number = 1000; // Number of simulations
  changeDoor: boolean = true; // Option to change the door

  constructor(private http: HttpClient) {}  // Inject the HttpClient service into the constructor of the component class

  pickDoor(index: number) { // Method that runs when the user clicks on a door
    if (this.state === 'PICK') { // If the state is PICK (the user is picking a door) then run the code below to reveal a door
      this.state = 'REVEAL';
      this.doors[index].prize = '🚗';
      this.pickedDoor = this.doors[index];
      this.reveal();
    }
  }
 
  reveal() { // Method that runs when the user clicks on a door to reveal it (after they have picked a door)
    const options = this.doors.filter((door, index) => !door.revealed && index !== this.pickedDoor);
    this.revealedDoor = options[Math.floor(Math.random() * options.length)];

    this.revealedDoor.revealed = true;
    this.switchButtonVisible = true;
    this.stayButtonVisible = true;

  }

  playerSwitch() { // Method that runs when the user clicks the switch button (after they have picked a door and revealed a door)
    this.totalSwitchPlays++; // Increment the totalSwitchPlays variable by 1
    const newPick = this.doors.find((door) => !door.revealed && door !== this.pickedDoor);
    this.pickedDoor = newPick;
    this.checkWin(true);
  }

  playerStay() { // Method that runs when the user clicks the stay button (after they have picked a door and revealed a door)
    this.totalStayPlays++;
    this.checkWin(false);
  }

  checkWin(playerSwitch: boolean) { // Method that runs when the user clicks the stay button (after they have picked a door and revealed a door)
    this.switchButtonVisible = false;
    this.stayButtonVisible = false;

    for (const door of this.doors) { // Loop through the doors array and set the prize behind the picked door to '🚗' to display the car
      door.prize = door.prize === '🚗' ? '🚗' : '🐐';
    }

    if (this.pickedDoor.prize === '🚗') { //
      this.outcome = 'You win!';
      this.pickedDoor.prize = '🚗';
      if (playerSwitch) {
        this.totalSwitchWins++;
      } else {
        this.totalStayWins++;
      }
    } else {
      this.outcome = 'You lose!';
      this.pickedDoor.prize = '🐐';
    }

     this.switchRate = this.totalSwitchPlays === 0 ? 0 : (this.totalSwitchWins / this.totalSwitchPlays) * 100; // Calculate the switch rate (totalSwitchWins / totalSwitchPlays * 100)

     this.stayRate = this.totalStayPlays === 0 ? 0 : (this.totalStayWins / this.totalStayPlays) * 100;


    this.playAgainVisible = true; // Set the playAgainVisible variable to true to display the play again button (it is hidden by default)
  }

  startOver() {
    this.doors.forEach((door) => { // Loop through the doors array and reset the prize and revealed properties of each door
      door.prize = '🐐';
      door.revealed = false;
    });
    this.doors[Math.floor(Math.random() * this.doors.length)].prize = '🚗'; // Set the prize behind a random door to '🚗' to display the car

    this.outcome = '';
    this.state = 'PICK';
    this.playAgainVisible = false;
  }

  runSimulations() {
    this.totalSwitchWins = 0;
    this.totalStayWins = 0;

    for (let i = 0; i < this.simulations; i++) { // Loop through the number of simulations specified by the user (this.simulations) and run the code below for each simulation
      const doors = ['🐐', '🐐', '🐐'];
      const carIndex = Math.floor(Math.random() * 3); // Generate a random number between 0 and 2 to represent the index of the door that has the car behind it
      doors[carIndex] = '🚗';

      let initialChoice = Math.floor(Math.random() * 3);  // Generate a random number between 0 and 2 to represent the index of the door that the player initially chooses
      let revealed = -1;

      do { // Generate a random number between 0 and 2 to represent the index of the door that is revealed to the player
        revealed = Math.floor(Math.random() * 3);
      } while (revealed === initialChoice || doors[revealed] === '🚗');

      if (this.changeDoor) { // If the player chooses to change doors, set the initialChoice variable to the index of the door that the player did not initially choose and was not revealed
        initialChoice = 3 - initialChoice - revealed;
      }

      if (doors[initialChoice] === '🚗') {
        // If the player wins, set the outcome to 'You win!'
        this.outcome = 'You win!';
        // Set the prize behind the picked door to '🚗' to display the car
        this.doors[initialChoice].prize = '🚗';
        this.totalSwitchWins++;
      } else {
        this.outcome = 'You lose!';
        this.doors[initialChoice].prize = '🐐';
        this.totalStayWins++;
      }
    }

    this.switchRate = (this.totalSwitchWins / this.simulations) * 100;
    this.stayRate = (this.totalStayWins / this.simulations) * 100;
  }


  // runSimulations() {
  //   this.http.post('/api/simulate', { simulations: this.simulations, changeDoor: this.changeDoor })
  //     .subscribe((results) => {
  //
  //       // console.log(results);
  //       this.switchRate = (results.switchWins / results.totalSimulations) * 100;
  //       this.stayRate = (results.stayWins / results.totalSimulations) * 100;
  //     });
  // }
}





