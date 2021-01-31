import { Audit } from "app/models/Audit";
export class Rn_Forms_Component_Setup extends Audit {
    public component_id: number;
    public label: string;
    public type: string;
    public mapping: string;
    public mandatory: string;
    public readonly: string;
    public drop_values: string;
    public sp: string;

}