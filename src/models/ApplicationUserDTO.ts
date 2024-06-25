import { ApplicationUserRoleDTO } from "./ApplicationUserRoleDTO";
import { AuditDTO } from "./AuditDTO";

export interface ApplicationUserDTO extends AuditDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  inactive: boolean;
  unhashedPassword: string;
  token: string;
  tokenExpiry: Date;
  userRole: ApplicationUserRoleDTO;
}
