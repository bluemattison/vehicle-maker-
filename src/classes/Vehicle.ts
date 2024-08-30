// import Driveable interface
import Driveable from '../interfaces/Driveable.js';

// Vehicle class that implements Driveable interface
class Vehicle implements Driveable {
  // Declare properties of the Vehicle class
  vin: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  color: string;
  started: boolean;
  currentSpeed: number;

  // Constructor for the Vehicle class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number
  ) {
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.started = false;
    this.currentSpeed = 0;
  }

  // Method to print vehicle details
  printDetails(): void {
    console.log(`Vehicle Details:
    VIN: ${this.vin}
    Make: ${this.make}
    Model: ${this.model}
    Year: ${this.year}
    Color: ${this.color}
    Weight: ${this.weight} lbs
    Top Speed: ${this.topSpeed} mph
    Started: ${this.started}
    Current Speed: ${this.currentSpeed} mph`);
  }

  // Method to start the vehicle
  start(): void {
    this.started = true;
    console.log(`${this.make} ${this.model} started`);
  }

  // Method to accelerate the vehicle
  accelerate(change: number): void {
    // Check if the vehicle is started
    if (this.started) {
      this.currentSpeed += change;
      console.log(`${this.make} ${this.model} accelerated to ${this.currentSpeed} mph`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  // Method to decelerate the vehicle
  decelerate(change: number): void {
    // Check if the vehicle is started
    if (this.started) {
      this.currentSpeed -= change;
      console.log(`${this.make} ${this.model} decelerated to ${this.currentSpeed} mph`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  // Method to stop the vehicle
  stop(): void {
    this.currentSpeed = 0;
    this.started = false;
    console.log(`${this.make} ${this.model} stopped`);
  }

  // Method to turn the vehicle
  turn(direction: string): void {
    // Check if the vehicle is started
    if (this.started) {
      console.log(`${this.make} ${this.model} turned ${direction}`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  // Method to reverse the vehicle
  reverse(): void {
    // Check if the vehicle is started
    if (this.started) {
      console.log(`${this.make} ${this.model} reversed`);
    } else {
      console.log('Start the vehicle first');
    }
  }
}

// Export the Vehicle class
export default Vehicle;
