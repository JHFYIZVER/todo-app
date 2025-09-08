import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Patch,
  Param,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';
import { Authorization } from 'src/auth/decorators/auth.decorator';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get('')
  public async getAll(listId: string) {
    return this.todoService.getAll(listId);
  }
  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Post('')
  public async create(listId: string, @Body() dto: TodoDto) {
    return this.todoService.create(listId, dto);
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: TodoDto) {
    return this.todoService.update(id, dto);
  }
}
