import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TodoDto {
  @IsString({ message: 'Заголовок должен быть строкой.' })
  @IsNotEmpty({ message: 'Заголовок обязателен для заполнения.' })
  title: string;

  @IsString({ message: 'Описание должен быть строкой.' })
  @IsOptional()
  description: string;

  @IsBoolean()
  completed: boolean;
}
