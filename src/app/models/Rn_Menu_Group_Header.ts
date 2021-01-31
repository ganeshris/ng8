import { Audit } from "./Audit";

import { Rn_Menu_Group_Line } from './Rn_Menu_Group_Line';

export class Rn_Menu_Group_Header extends Audit {
    public id: number;
    public menu_name: string;
    public description: string;
    public active: boolean;
    public start_date: Date;
    public end_date: Date;
    public menu_group_lines: Rn_Menu_Group_Line[];
    
}