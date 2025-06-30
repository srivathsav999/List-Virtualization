import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { TableVirtuoso } from "react-virtuoso";
  import React from "react";
  
  export default function ShadCN({ users }) {
    const VirtuosoComponents = {
      Scroller: React.forwardRef((props, ref) => (
        <div
          {...props}
          ref={ref}
          className="overflow-auto"
        />
      )),
      Table: (props) => (
        <Table {...props} className="w-full table-fixed" />
      ),
      TableBody: React.forwardRef((props, ref) => (
        <TableBody {...props} ref={ref} />
      )),
      TableRow: ({ item: _item, ...props }) => (
        <TableRow {...props} className="hover:bg-muted/50 transition-colors" />
      ),
    };
  
    const rowContent = (index, user) => (
      <>
        <TableCell className="w-[30%] py-3 px-4">
          <div className="font-medium text-foreground">
            {user.firstname} {user.lastname}
          </div>
        </TableCell>
        <TableCell className="w-[40%] py-3 px-4">
          <div className="text-muted-foreground">
            {user.email}
          </div>
        </TableCell>
        <TableCell className="w-[30%] py-3 px-4">
          <div className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            {user.website}
          </div>
        </TableCell>
      </>
    );
  
    return (
        <>
        <div><h1>ShadCN Datatable</h1></div>
      <div className="w-full space-y-0 pb-8">
        <div className="rounded-t-lg border border-b-0 bg-muted/30 sticky top-0 z-10 shadow-sm">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[30%] py-4 px-4 font-semibold text-foreground">
                  Name
                </TableHead>
                <TableHead className="w-[40%] py-4 px-4 font-semibold text-foreground">
                  Email
                </TableHead>
                <TableHead className="w-[30%] py-4 px-4 font-semibold text-foreground">
                  Website
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
        
        <div className="rounded-b-lg border border-t-0 shadow-sm">
          <TableVirtuoso
            data={users}
            components={VirtuosoComponents}
            itemContent={rowContent}
            style={{ height: 500 }}
          />
        </div>
      </div>
      </>
    );
  }
  