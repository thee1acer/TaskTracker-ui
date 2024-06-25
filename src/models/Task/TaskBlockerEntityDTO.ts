import { AuditDTO } from "../AuditDTO";

export interface TaskBlockerEntityDTO extends AuditDTO {
  id: number;
  originalTaskId: number;
  blockerReason: string;
  inActive: boolean;
}
