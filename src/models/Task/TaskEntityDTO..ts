import { TaskBlockerEntityDTO } from "./TaskBlockerEntityDTO";
import { AuditDTO } from "../AuditDTO";

export interface TaskEntityDTO extends AuditDTO {
  id: number;
  assignedTo: number;
  shortDescription: string;
  detailedDescription: string;
  state: string;
  taskType: string;
  taskPriority: number;
  taskStoryPoints: number;
  taskStoryEffort: number;
  taskBlockers: TaskBlockerEntityDTO[];
}
