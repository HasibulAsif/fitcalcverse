import React from 'react';
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface GuidelineRow {
  category: string;
  value: string;
  source: string;
}

interface GuidelinesTableProps {
  title: string;
  guidelines: GuidelineRow[];
}

const GuidelinesTable = ({ title, guidelines }: GuidelinesTableProps) => {
  return (
    <Card className="mt-8 p-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Value/Range</TableHead>
            <TableHead>Source</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guidelines.map((guideline, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{guideline.category}</TableCell>
              <TableCell>{guideline.value}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{guideline.source}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default GuidelinesTable;