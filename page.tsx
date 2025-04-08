import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const assignedNumbers = new Map();

export default function SorteoApp() {
  const [name, setName] = useState("");
  const [assigned, setAssigned] = useState(null);
  const [error, setError] = useState("");

  const handleAssign = () => {
    if (!name.trim()) {
      setError("Por favor, ingresa un nombre.");
      return;
    }

    if (assignedNumbers.has(name)) {
      setAssigned(assignedNumbers.get(name));
      setError("");
      return;
    }

    if (assignedNumbers.size >= 10) {
      setError("Ya se han asignado todos los números.");
      return;
    }

    const availableNumbers = Array.from({ length: 10 }, (_, i) => i + 1).filter(
      (num) => !Array.from(assignedNumbers.values()).includes(num)
    );

    const randomNum = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
    assignedNumbers.set(name, randomNum);
    setAssigned(randomNum);
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="max-w-md w-full">
        <CardContent className="flex flex-col space-y-4 p-6">
          <h1 className="text-2xl font-bold text-center">Sorteo de Números (1-10)</h1>
          <Input
            placeholder="Ingresa tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleAssign}>Obtener número</Button>
          {assigned && (
            <p className="text-xl text-center font-medium">
              Tu número asignado es: <span className="font-bold">{assigned}</span>
            </p>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}