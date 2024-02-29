import { Controller, Get, Post, Body, Param,
   Delete, VERSION_NEUTRAL, Put } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './schemas/cat.schema';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/roles/decorators/roles.decorator';

@Controller({
  path: 'api/cats',
  version: VERSION_NEUTRAL,
})
export class CatsController {

  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles('Admin')
  async create(@Body() createCatDto: CreateCatDto) {
    await this.catsService.create(createCatDto);
  }

  @Get()
  @Public()
  async findAll(): Promise<Cat[]> {
    return await this.catsService.findAll();
  }

  @Get(':id')
  @Public() 
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  @Roles('Admin')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): Promise<Cat> {
    return await this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  @Roles('Admin')
  async delete(@Param('id') id: string) {
    return await this.catsService.delete(id);
  }
}
