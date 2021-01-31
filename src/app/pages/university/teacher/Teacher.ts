import { Extension } from "../Extension";
import { Student } from "../student/Student";

export class Teacher extends Extension {
    public id: number;
    public name: string;
    public email: string;
    public phoneNumber: number;
    public salary: number;
    public accountId: string;
    public createdAt: Date;
    public createdBy: string;
    public updatedAt: Date;
    public updatedBy: string;
    public students: Student[];
}