import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

import { Student } from './student.entity';
import { CreateStudentInput } from './create-student.input';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>
    ) { }

    getStudent(id: string): Promise<Student> {
        return this.studentRepository.findOne({ id });
    }

    getStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
        const { firstname, lastname } = createStudentInput;
        const student = this.studentRepository.create({
            id: uuidv4(),
            firstname,
            lastname
        });

        return this.studentRepository.save(student);
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]> {
        return await this.studentRepository.find({
            where: {
                id: {
                    $in: studentIds
                }
            }
        });
    }
}
