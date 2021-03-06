import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './create-lesson.input';
import { AssignStudentToLessonInput } from './assign-students-to-lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
    ) { }

    getLesson(id: string): Promise<Lesson> {
        return this.lessonRepository.findOne({ id });
    }

    getLessons(): Promise<Lesson[]> {
        return this.lessonRepository.find();
    }

    createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonInput;
        const lesson = this.lessonRepository.create({
            id: uuidv4(),
            name,
            startDate,
            endDate,
            students
        });

        return this.lessonRepository.save(lesson);
    }

    async assignStudentsToLesson(assignStudentsToLessonInput: AssignStudentToLessonInput): Promise<Lesson> {
        const { lessonId, studentIds } = assignStudentsToLessonInput;
        const lesson = await this.lessonRepository.findOne({ id: lessonId });
        lesson.students = [...lesson.students, ...studentIds];
        return this.lessonRepository.save(lesson);
    }
}
