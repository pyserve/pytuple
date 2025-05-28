"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Lead } from "@/app/(main)/leads/columns";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateRecord } from "@/hooks/create-records";
import { useFetchRecords } from "@/hooks/fetch-records";
import { cn } from "@/lib/utils";
import { callSchema, CallSchema } from "@/schemas/CallFormSchema";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CallForm() {
  const [open, setOpen] = useState(false);
  const createRecord = useCreateRecord();
  const { data: leads } = useFetchRecords({
    module: "leads",
    page: 1,
    page_size: 200,
  });
  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    setFilteredLeads(leads?.results);
  }, [leads?.results]);

  const form = useForm<CallSchema>({
    resolver: zodResolver(callSchema),
    defaultValues: {
      status: "scheduled",
    },
  });

  const onSubmit = async (data: CallSchema) => {
    try {
      const res = await createRecord.mutateAsync({
        module: "calls",
        data: data,
      });
      console.log("🚀 ~ onSubmit ~ res:", res);
      toast.success("Record created!");
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 p-4 overflow-auto"
      >
        <FormField
          control={form.control}
          name="lead_id"
          render={({ field }) => {
            const selectedLead = leads?.results?.find(
              (lead: Lead) => String(lead.id) === field.value
            );
            const label = selectedLead
              ? `${selectedLead.first_name} ${selectedLead.last_name}`
              : "Select lead";

            return (
              <FormItem>
                <FormLabel>Lead Name</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {label}
                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command shouldFilter={false}>
                        <CommandInput
                          placeholder="Search lead..."
                          onValueChange={(value) => {
                            setFilteredLeads(
                              leads?.results?.filter((lead: Lead) => {
                                return (
                                  lead.first_name
                                    ?.toLowerCase()
                                    ?.includes(value.toLowerCase()) ||
                                  lead.last_name
                                    ?.toLowerCase()
                                    ?.includes(value.toLowerCase())
                                );
                              })
                            );
                          }}
                        />
                        <CommandList>
                          <CommandEmpty>No lead found.</CommandEmpty>
                          <CommandGroup>
                            {filteredLeads?.map((lead: Lead) => {
                              const displayName = `${lead.first_name} ${lead.last_name}`;
                              return (
                                <CommandItem
                                  key={lead.id}
                                  value={String(lead.id)}
                                  onSelect={() => {
                                    form.setValue("lead", String(lead.id));
                                    setOpen(false);
                                  }}
                                >
                                  {displayName}
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      field.value === String(lead.id)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="call_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Call Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full max-w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Call Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="incoming">Incoming</SelectItem>
                  <SelectItem value="outgoing">Outgoing</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full max-w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="missed">Missed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="no_answer">No Answer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scheduled_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scheduled Time</FormLabel>
              <FormControl>
                <input
                  className="border p-2 rounded-2xl text-sm"
                  type="datetime-local"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Add any notes here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
