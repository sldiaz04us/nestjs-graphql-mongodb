import { Field, ID, InputType } from "@nestjs/graphql";

import { IsUUID } from "class-validator";

@InputType()
export class AssignStudentToLessonInput {
    @Field(() => ID)
    @IsUUID()
    lessonId: string;

    @Field(() => [ID])
    @IsUUID('4', { each: true })
    studentIds: string[];
}