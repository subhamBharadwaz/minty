"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addCategorySchema } from "@/schema/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

export const NewCategory = () => {
  const [emojiIcon, setEmojiIcon] = useState<string>("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof addCategorySchema>>({
    resolver: zodResolver(addCategorySchema),
  });

  const createCategory = useMutation(api.categories.createCategory);

  async function onSubmit(values: z.infer<typeof addCategorySchema>) {
    try {
      await createCategory({
        name: values.name,
        icon: values.icon,
      });
      setDialogOpen(false);
      form.reset();
    } catch (error) {
      console.log("Failed to create category", error);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="size-4 mr-2" />
          Add new category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid w-full items-center gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Food, Trip"
                      {...field}
                      className="max-w-[270px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-x-2.5">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                    >
                      {field.value || emojiIcon}
                    </Button>
                    {openEmojiPicker && (
                      <div className="absolute bottom-5 z-20">
                        <EmojiPicker
                          onEmojiClick={(e) => {
                            setEmojiIcon(e.emoji);
                            field.onChange(e.emoji);
                            setOpenEmojiPicker(false);
                          }}
                        />
                      </div>
                    )}
                    <FormLabel>Select an emoji</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-x-2 items-center ml-auto mr-0">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {" "}
                {form.formState.isSubmitting && (
                  <Loader2 className="animate-spin mr-2" />
                )}{" "}
                Add category
              </Button>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
