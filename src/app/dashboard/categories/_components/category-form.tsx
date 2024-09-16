import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EmojiPicker from "emoji-picker-react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addCategorySchema } from "@/schema/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

type CategoryFormProps = {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  category?: { _id: Id<"categories">; name: string; icon: string };
  mode: "edit" | "add";
};

export const CategoryForm: FC<CategoryFormProps> = ({
  setDialogOpen,
  category,
  mode,
}) => {
  const [emojiIcon, setEmojiIcon] = useState<string>("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);

  const form = useForm<z.infer<typeof addCategorySchema>>({
    resolver: zodResolver(addCategorySchema),
  });

  useEffect(() => {
    if (mode === "edit" && category) {
      if (form.getValues("icon") !== category.icon) {
        form.setValue("icon", category.icon);
      }
      if (form.getValues("name") !== category.name) {
        form.setValue("name", category.name);
      }
    }
  }, [category, mode, form]);

  const { mutate: createCategory, isPending: isCategoryCreating } = useMutation(
    {
      mutationFn: useConvexMutation(api.categories.createCategory),
    },
  );

  const { mutate: updateCategory, isPending: isCategoryUpdatting } =
    useMutation({
      mutationFn: useConvexMutation(api.categories.updateCategory),
    });

  async function onSubmit(values: z.infer<typeof addCategorySchema>) {
    try {
      if (mode === "edit") {
        updateCategory({
          id: category?._id!,
          name: values.name,
          icon: values.icon,
        });
      } else {
        createCategory({
          name: values.name,
          icon: values.icon,
        });
      }
      setDialogOpen(false);
      form.reset();
    } catch (error) {
      console.log("Failed to create category", error);
    }
  }
  return (
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
            {mode === "edit" ? "Update Category" : "Add Category"}
          </Button>
          <Button onClick={() => setDialogOpen(false)} variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
