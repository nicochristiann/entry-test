"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function TableSkeleton({
  rows = 16,
  columns = 4,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <Card className="w-full h-[65dvh]">
      <CardContent className="px-6 space-y-4 flex flex-col justify-between overflow-hidden">
        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: columns }).map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <Skeleton className="h-4 w-10" />
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Skeleton className="h-4 w-10" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
