import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async getAll(todoListId: string) {
    const todos = await this.prismaService.todo.findMany({
      where: {
        listId: todoListId,
      },
    });
    return todos;
  }

  public async create(todoListId: string, dto: TodoDto) {
    const todo = await this.prismaService.todo.create({
      data: {
        title: dto.title,
        description: dto.description,
        completed: dto.completed,
        listId: todoListId,
      },
    });
    return todo;
  }

  public async update(todoId: string, dto: TodoDto) {
    const todo = await this.prismaService.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!todo) {
      throw new NotFoundException(
        'Задача не найдена, проверьте правильность данных',
      );
    }
    const updatedTodo = await this.prismaService.todo.update({
      where: {
        id: todo.id,
      },
      data: {
        title: dto.title,
        description: dto.description,
        completed: dto.completed,
      },
    });

    return updatedTodo;
  }
}
