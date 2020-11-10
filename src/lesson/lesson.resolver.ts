import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver
} from "@nestjs/graphql";

import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './create-lesson.input';
import { AssignStudentToLessonInput } from './assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver(() => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
    ) { }

    @Query(() => LessonType)
    lesson(
        @Args('id') id: string
    ) {
        return this.lessonService.getLesson(id);
    }

    @Query(() => [LessonType])
    lessons() {
        return this.lessonService.getLessons();
    }

    @Mutation(() => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput
    ) {
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(() => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLessonInput') assignStudentsToLesson: AssignStudentToLessonInput
    ) {
        return this.lessonService.assignStudentsToLesson(assignStudentsToLesson);
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return this.studentService.getManyStudents(lesson.students);
    }
}