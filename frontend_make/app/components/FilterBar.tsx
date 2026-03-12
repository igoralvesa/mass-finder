import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search } from "lucide-react";

interface FilterBarProps {
  neighborhoods: string[];
  daysOfWeek: string[];
}

export function FilterBar({ neighborhoods, daysOfWeek }: FilterBarProps) {
  // TODO: Implementar filtros funcionais com API
  // const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  // const [selectedDay, setSelectedDay] = useState('');
  // 
  // const handleSearch = () => {
  //   // Chamar API com filtros
  //   fetch(`/api/parishes/search?neighborhood=${selectedNeighborhood}&day=${selectedDay}`)
  //     .then(res => res.json())
  //     .then(data => onFilterResults(data));
  // };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label htmlFor="neighborhood" className="text-sm font-medium">
              Bairro
            </label>
            <Select>
              <SelectTrigger id="neighborhood">
                <SelectValue placeholder="Selecione um bairro" />
              </SelectTrigger>
              <SelectContent>
                {neighborhoods.map((neighborhood) => (
                  <SelectItem key={neighborhood} value={neighborhood}>
                    {neighborhood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-2">
            <label htmlFor="day" className="text-sm font-medium">
              Dia da Semana
            </label>
            <Select>
              <SelectTrigger id="day">
                <SelectValue placeholder="Selecione um dia" />
              </SelectTrigger>
              <SelectContent>
                {daysOfWeek.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full sm:w-auto">
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}