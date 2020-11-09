import { Field, InputType } from "@nestjs/graphql";

import { MinLength } from "class-validator";

@InputType()
export class CreateStudentInput {
    @Field()
    @MinLength(1)
    firstname: string;

    @Field()
    @MinLength(1)
    lastname: string;
}