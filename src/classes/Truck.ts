import Vehicle from './Vehicle';
import Motorbike from './Motorbike';
import Car from './Car';
import Wheel from './Wheel';
import AbleToTow from '../interfaces/AbleToTow';

class Truck extends Vehicle implements AbleToTow {
  wheels: Wheel[];
  towingCapacity: number;

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number
  ) {
    super(vin, color, make, model, year, weight, topSpeed);
    this.wheels = wheels.length === 4 ? wheels : [
      new Wheel(20, 'Default'), 
      new Wheel(20, 'Default'),
      new Wheel(20, 'Default'), 
      new Wheel(20, 'Default')
    ];
    this.towingCapacity = towingCapacity;
  }

  override printDetails(): void {
    super.printDetails();
    console.log(`Towing Capacity: ${this.towingCapacity} lbs`);
    console.log(`Wheels: ${this.wheels.length}`);
    this.wheels.forEach((wheel, index) => {
      console.log(`  Wheel ${index + 1}: ${wheel.getBrand}, ${wheel.getDiameter} inches`);
    });
  }

  tow(vehicle: Truck | Motorbike | Car): void {
    if (vehicle.weight <= this.towingCapacity) {
      console.log(`Truck ${this.make} ${this.model} is towing ${vehicle.make} ${vehicle.model}.`);
    } else {
      console.log(`The ${vehicle.make} ${vehicle.model} is too heavy to be towed by this truck.`);
    }
  }
}

export default Truck;

