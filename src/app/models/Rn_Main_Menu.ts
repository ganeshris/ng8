import { Audit } from "./Audit";
import { Rn_Sub_Menu } from './Rn_Sub_Menu';

export class Rn_Main_Menu extends Audit {
	public id: number;
	public menu_name: string;
	public menu_action_link : string;
	public menu_icon: string;
	public menu_type: string;
	public sub_menus: Rn_Sub_Menu[];
}