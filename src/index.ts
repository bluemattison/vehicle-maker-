// Import classes
import Truck from "./classes/Truck";
import Car from "./classes/Car";
import Motorbike from "./classes/Motorbike";
import Wheel from "./classes/Wheel";
import Cli from "./classes/Cli";

// Create an array of vehicles
const vehicles = [];

// Instantiate a Truck object
const truck1 = new Truck(
  Cli.generateVin(),
  "red",
  "Ford",
  "F-150",
  2021,
  5000,
  120,
  [], // The wheels array is empty, so default wheels will be used
  10000
);

// Instantiate a Car object
const car1 = new Car(
  Cli.generateVin(),
  "blue",
  "Toyota",
  "Camry",
  2021,
  3000,
  130,
  []
);

// Instantiate a Motorbike object with specific wheels
const motorbike1Wheels = [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")];
const motorbike1 = new Motorbike(
  Cli.generateVin(),
  "black",
  "Harley Davidson",
  "Sportster",
  2021,
  500,
  125,
  motorbike1Wheels
);

// Push vehicles to the array
vehicles.push(truck1);
vehicles.push(car1);
vehicles.push(motorbike1);

// Create a new instance of the Cli class
const cli = new Cli(vehicles);

// Start the CLI
cli.startCli();
