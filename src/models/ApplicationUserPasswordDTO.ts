import { AuditDTO } from "./AuditDTO";

export interface ApplicationUserPasswordDTO extends AuditDTO {
  id: string;
  passwordHash: string;
  inactive: boolean;
}
