import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './schemas/cat.schema';

@Injectable()
export class CatsService {

  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    return this.catModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const updatedCat = await this.catModel
      .findOneAndUpdate({ _id: id }, updateCatDto, { new: true })
      .exec();
    return updatedCat;
  }

  async delete(id: string) {
    const deletedCat = await this.catModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deletedCat;
  }
}
