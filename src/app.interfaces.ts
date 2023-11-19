import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class CreatePersonDto {
  @ApiProperty() name: string;
  @ApiProperty() englishName: string;
  @ApiProperty() age: number;
}

export interface News {
  title: string;
  link: string;
  time?: string;
  img?: string;
}

export interface Hostage extends Document {
  id: UUID;
  name: string;
  englishName: string;
  age: string;
  address: string;
  tag: string;
  img: string;
  urlName: string;
  link?: string;
  news: {
    hebrew: News[];
    english: News[];
  };
}
