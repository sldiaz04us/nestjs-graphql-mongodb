import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';

@Resolver(() => LessonType)
export class LessonResolver {
    constructor(private lessonService: LessonService) { }

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
}