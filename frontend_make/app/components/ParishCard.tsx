import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Clock, Church } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Mass {
  id: string;
  day: string;
  time: string;
}

interface ParishCardProps {
  name: string;
  neighborhood: string;
  address: string;
  masses: Mass[];
  imageUrl?: string;
}

export function ParishCard({ name, neighborhood, address, masses, imageUrl }: ParishCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-primary/20 overflow-hidden">
      {/* Área da Imagem */}
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden bg-accent/20">
          <ImageWithFallback
            src={imageUrl}
            alt={`Foto da ${name}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Church className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {neighborhood}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {address}
        </p>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium">Horários de Missa:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {masses.map((mass) => (
              <Badge key={mass.id} variant="secondary" className="bg-accent/50 hover:bg-accent">
                {mass.day} - {mass.time}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}