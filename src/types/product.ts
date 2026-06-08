export type Product = {
  id: string;
  name: string;
  category: 'Dinamo Motor 3 Phase' | 'Dinamo Motor 1 Phase' | 'Gear Box';
  brand: 'Motology' | 'Alliance';
  image: string;
  phase?: '1 Phase' | '3 Phase';
  rpm?: string;
  capacityKw?: string;
  capacityHp?: string;
  mountingType?: string;
  gearboxSize?: string;
  gearboxRatio?: string;
  gearboxType?: string;
  gearboxOutput?: string;
  description: string;
};
