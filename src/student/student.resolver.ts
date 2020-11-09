import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { StudentType } from "./student.type";
import { StudentService } from './student.service';
import { CreateStudentInput } from "./create-student.input";

@Resolver(() => StudentType)
export class StudentResolver {
    constructor(private studentService: StudentService) { }

    @Query(() => StudentType)
    student(@Args('id') id: string) {
        return this.studentService.getStudent(id);
    }

    @Query(() => [StudentType])
    students() {
        return this.studentService.getStudents();
    }

    @Mutation(() => StudentType)
    createStudent(
        @Args('createStudentInput') createStudentInput: CreateStudentInput
    ) {
        return this.studentService.createStudent(createStudentInput);
    }
}