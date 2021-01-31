import { Audit } from "./Audit";

export class MenuRegister extends Audit {
    public id: number;
	public main_menu_name: string;
	public main_menu_action_name : string;
	public main_menu_icon: string;
	public enable_flag: string;
	public end_date: Date;
}