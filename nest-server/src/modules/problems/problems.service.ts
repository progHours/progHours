import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Problem } from './problem.entity';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>,
  ) {}
  async getProblem(link): Promise<Problem> {
    const foundProblem = await this.problemRepository.findOne({ link });
    return foundProblem;
  }
  createProblem(problemData): Promise<Problem> {
    const { pid, link, name, difficulty } = problemData;
    const newProblem = this.problemRepository.create({
      pid,
      link,
      name,
      difficulty,
    });
    return this.problemRepository.save(newProblem);
  }
}