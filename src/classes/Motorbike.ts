import Vehicle from './Vehicle';
import Wheel from './Wheel';

class Motorbike extends Vehicle {
  wheels: Wheel[];

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
    super(vin, color, make, model, year, weight, topSpeed);
    this.wheels = wheels.length === 2 ? wheels : [
      new Wheel(17, 'Default'), 
      new Wheel(17, 'Default')
    ];
  }

  override printDetails(): void {
    super.printDetails();
    console.log(`Wheels: ${this.wheels.length}`);
    this.wheels.forEach((wheel, index) => {
      console.log(`  Wheel ${index + 1}: ${wheel.getBrand}, ${wheel.getDiameter} inches`);
    });
  }

  wheelie(): void {
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }
}

export default Motorbike;
