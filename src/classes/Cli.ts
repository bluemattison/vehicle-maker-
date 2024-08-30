import inquirer from "inquirer";
import Truck from "./Truck";
import Car from "./Car";
import Motorbike from "./Motorbike";
import Wheel from "./Wheel";

// Define the Cli class
class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on",
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type",
          choices: ["Car", "Truck", "Motorbike"],
        },
      ])
      .then((answers) => {
        switch (answers.vehicleType) {
          case "Car":
            this.createCar();
            break;
          case "Truck":
            this.createTruck();
            break;
          case "Motorbike":
            this.createMotorbike();
            break;
        }
      });
  }

  createCar(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year, 10),
          parseInt(answers.weight, 10),
          parseInt(answers.topSpeed, 10),
          [] // No wheels initialization needed for Car
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  createTruck(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        { type: "input", name: "towingCapacity", message: "Enter Towing Capacity" },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year, 10),
          parseInt(answers.weight, 10),
          parseInt(answers.topSpeed, 10),
          [
            new Wheel(20, "Default"),
            new Wheel(20, "Default"),
            new Wheel(20, "Default"),
            new Wheel(20, "Default"),
          ],
          parseInt(answers.towingCapacity, 10)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  createMotorbike(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        { type: "input", name: "frontWheelDiameter", message: "Enter Front Wheel Diameter" },
        { type: "input", name: "frontWheelBrand", message: "Enter Front Wheel Brand" },
        { type: "input", name: "rearWheelDiameter", message: "Enter Rear Wheel Diameter" },
        { type: "input", name: "rearWheelBrand", message: "Enter Rear Wheel Brand" },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year, 10),
          parseInt(answers.weight, 10),
          parseInt(answers.topSpeed, 10),
          [
            new Wheel(parseInt(answers.frontWheelDiameter, 10), answers.frontWheelBrand),
            new Wheel(parseInt(answers.rearWheelDiameter, 10), answers.rearWheelBrand),
          ]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTow",
          message: "Select a vehicle to tow",
          choices: this.vehicles
            .filter((vehicle) => vehicle.vin !== truck.vin)
            .map((vehicle) => ({
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            })),
        },
      ])
      .then((answers) => {
        const vehicleToTow = this.vehicles.find(
          (vehicle) => vehicle.vin === answers.vehicleToTow
        );
        if (vehicleToTow) {
          truck.tow(vehicleToTow);
          this.performActions();
        } else {
          console.log("You can't tow the truck itself.");
          this.performActions();
        }
      });
  }

  performActions(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action",
          choices: [
            "Print details",
            "Start vehicle",
            "Accelerate 5 MPH",
            "Decelerate 5 MPH",
            "Stop vehicle",
            "Turn right",
            "Turn left",
            "Reverse",
            "Tow vehicle",
            "Perform wheelie",
            "Select or create another vehicle",
            "Exit",
          ],
        },
      ])
      .then((answers) => {
        const selectedVehicle = this.vehicles.find(
          (vehicle) => vehicle.vin === this.selectedVehicleVin
        );

        if (selectedVehicle) {
          switch (answers.action) {
            case "Print details":
              selectedVehicle.printDetails();
              break;
            case "Start vehicle":
              selectedVehicle.start();
              break;
            case "Accelerate 5 MPH":
              selectedVehicle.accelerate(5);
              break;
            case "Decelerate 5 MPH":
              selectedVehicle.decelerate(5);
              break;
            case "Stop vehicle":
              selectedVehicle.stop();
              break;
            case "Turn right":
              selectedVehicle.turn("right");
              break;
            case "Turn left":
              selectedVehicle.turn("left");
              break;
            case "Reverse":
              selectedVehicle.reverse();
              break;
            case "Tow vehicle":
              if (selectedVehicle instanceof Truck) {
                this.findVehicleToTow(selectedVehicle);
                return;
              } else {
                console.log("Only trucks can tow vehicles.");
              }
              break;
            case "Perform wheelie":
              if (selectedVehicle instanceof Motorbike) {
                selectedVehicle.wheelie();
              } else {
                console.log("Only motorbikes can perform a wheelie.");
              }
              break;
            case "Select or create another vehicle":
              this.startCli();
              return;
            case "Exit":
              this.exit = true;
              break;
          }
        }

        if (!this.exit) {
          this.performActions();
        }
      });
  }

  startCli(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "CreateOrSelect",
          message: "Would you like to create a new vehicle or perform an action on an existing vehicle?",
          choices: ["Create a new vehicle", "Select an existing vehicle"],
        },
      ])
      .then((answers) => {
        if (answers.CreateOrSelect === "Create a new vehicle") {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

export default Cli;
