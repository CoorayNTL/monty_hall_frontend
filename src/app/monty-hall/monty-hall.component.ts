import { Component } from '@angular/core';

@Component({
  selector: 'app-monty-hall',
  templateUrl: './monty-hall.component.html',
  styleUrls: ['./monty-hall.component.css']
})
export class MontyHallComponent {
  doors: any[] = [];
  totalDoors: number = 3;
  state: string = 'PICK';
  pickedDoor: any;
  autoMode: boolean = false;
  timeoutId: any;
  switchWinRate: string = '0%';
  stayWinRate: string = '0%';
  stats = {
    totalSwitchPlays: 0,
    totalStayPlays: 0,
    totalSwitchWins: 0,
    totalStayWins: 0
  };

  constructor() {
    this.makeDoors();
    this.reset();
  }

  getDelayValue(): number {
    return 500;
  }

  clearStats(): void {
    this.stats = {
      totalSwitchPlays: 0,
      totalStayPlays: 0,
      totalSwitchWins: 0,
      totalStayWins: 0
    };
    this.updateStats();
  }

  // Reset the game
  reset(): void {
    this.doors.forEach((door) => {
      door.prize = '🐐';
      door.revealed = false;
    });

    const winner = this.random(this.doors);
    winner.prize = '🚂';

    this.state = 'PICK';
    this.updateStats();
  }


  updateStats(): void {
    this.switchWinRate =
      ((100 * this.stats.totalSwitchWins) / this.stats.totalSwitchPlays || 0).toFixed(2) + '%';

    this.stayWinRate =
      ((100 * this.stats.totalStayWins) / this.stats.totalStayPlays || 0).toFixed(2) + '%';
  }


  checkWin(hasSwitched: boolean): void {
    this.doors.forEach((door) => {
      door.revealed = true;
    });

    if (this.pickedDoor.prize === '🚂') {
      this.pickedDoor.won = true;
      if (hasSwitched) {
        this.stats.totalSwitchWins++;
      } else {
        this.stats.totalStayWins++;
      }
    }

    if (this.autoMode) {
      this.timeoutId = setTimeout(() => {
        this.reset();
      }, this.getDelayValue());
    } else {
      // Update the UI to show the "Play Again" button, etc.

    }

    this.updateStats();
  }

  // Player chooses a door
  chooseDoor(hasSwitched = false): void {
    if (hasSwitched) {
      this.stats.totalSwitchPlays++;
      const newPick = this.doors.find((door) => !door.revealed && !door.picked);
      newPick.picked = true;
      this.pickedDoor.picked = false;
      this.pickedDoor = newPick;
    } else {
      this.stats.totalStayPlays++;
    }

    if (this.autoMode) {
      this.timeoutId = setTimeout(() => {
        this.checkWin(hasSwitched);
      }, this.getDelayValue());
    } else {
      // Update the UI for switching or staying
    }
  }

  // Reveal a door
  revealDoor(): void {
    const options = this.doors.filter((door, i) => i !== this.pickedDoor.index && door.prize !== '🚂');

    if (options.length === this.doors.length - 1) {
      options.splice(Math.floor(Math.random() * options.length), 1);
    }

    for (const revealedDoor of options) {
      revealedDoor.revealed = true;
    }

    const lastDoor = this.doors.find((door) => !door.revealed && !door.picked);

    if (this.autoMode) {
      if (Math.random() < 0.5) {
        this.timeoutId = setTimeout(() => this.chooseDoor(true), this.getDelayValue());
      } else {
        this.timeoutId = setTimeout(() => this.chooseDoor(false), this.getDelayValue());
      }
    }
  }

  // Player picks a door
  pickDoor(door: any): void {
    if (this.state !== 'PICK') return;
    this.state = 'REVEAL';
    this.pickedDoor = door;
    this.pickedDoor.picked = true;
    if (this.autoMode) {
      setTimeout(() => {
        this.revealDoor();
      }, this.getDelayValue());
    } else {
      // Update the UI for picking a door
    }
  }

  // Create the initial doors
  makeDoors(): void {
    this.doors = [];

    for (let i = 0; i < this.totalDoors; i++) {
      const door: any = {
        prize: '🐐',
        revealed: false,
        index: i,
        picked: false,
        won: false
      };

      if (this.totalDoors > 10) {
        // Apply the 'small' class to the door element
        door.small = true;
      }

      this.doors.push(door);
    }
  }

  // Helper function to select a random item from an array
  random(arr: any[]): any {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Toggle auto mode
  toggleAutoMode(): void {
    this.autoMode = !this.autoMode;
    if (this.autoMode) {
      this.reset();
      this.pickDoor(this.random(this.doors));
    } else {
      clearTimeout(this.timeoutId);
      this.reset();
    }
  }
}
