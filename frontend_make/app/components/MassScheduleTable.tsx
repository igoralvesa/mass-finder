import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Edit, Trash2 } from "lucide-react";

interface Mass {
  id: string;
  day: string;
  time: string;
}

interface MassScheduleTableProps {
  masses: Mass[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function MassScheduleTable({ masses, onEdit, onDelete }: MassScheduleTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dia da Semana</TableHead>
            <TableHead>Horário</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {masses.map((mass) => (
            <TableRow key={mass.id}>
              <TableCell className="font-medium">{mass.day}</TableCell>
              <TableCell>{mass.time}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit?.(mass.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete?.(mass.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
