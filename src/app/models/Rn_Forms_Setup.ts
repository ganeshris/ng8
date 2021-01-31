import { Rn_Forms_Component_Setup } from "./Rn_Forms_Component_Setup";
import { Audit } from "app/models/Audit";
export class Rn_Forms_Setup extends Audit {
  public form_id: number;
  public form_name: string;
  public form_desc: string;
  public related_to: string;
  public page_event: string;
  public button_caption: string;
  public components: Rn_Forms_Component_Setup[];
}
