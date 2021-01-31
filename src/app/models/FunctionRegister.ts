import { Audit } from "./Audit";

export class FunctionRegister extends Audit {
    public id: number;
	public menu_id: number;
	public function_name : string;
	public function_action_name: string;
	public function_icon: string;
	public enable_flag: string;
	public end_date: Date;
}