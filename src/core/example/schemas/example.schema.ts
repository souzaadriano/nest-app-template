import { IsString } from 'class-validator';

export class ExampleSchema {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
